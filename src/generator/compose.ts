import type { SelectionState, RenderContext, FeatureModule, DiscordEvent } from './types';
import { ALL_MODULES } from './modules/index';
import { renderIndexJs } from '../templates/core/index.template';
import { renderPackageJson } from '../templates/core/packageJson.template';
import { renderEnvExample } from '../templates/core/envExample.template';
import { renderReadme } from '../templates/core/readme.template';
import { renderDeployCommands } from '../templates/core/deployCommands.template';
import { messageCreateTemplate } from '../templates/events/messageCreate.template';
import { interactionCreateTemplate } from '../templates/events/interactionCreate.template';
import { economyHelperTemplate } from '../templates/economy/economyHelper.template';
import { economyJsonTemplate } from '../templates/economy/economyJson.template';

export function getActiveModules(state: SelectionState): FeatureModule[] {
  return ALL_MODULES.filter(mod => {
    // Check if the category is enabled OR any sub-feature is enabled
    if (state.selectedFeatures[mod.id]) return true;
    if (mod.subFeatures) {
      return mod.subFeatures.some(sf => state.selectedFeatures[sf.id]);
    }
    return false;
  });
}

function getActiveCommandFiles(mod: FeatureModule, state: SelectionState) {
  return mod.commandFiles.filter(cf => {
    // Check if specific sub-feature is enabled, or the whole category is enabled
    const subFeatureId = `${mod.id}.${cf.filename.replace('.js', '')}`;
    if (state.selectedFeatures[subFeatureId] !== undefined) {
      return state.selectedFeatures[subFeatureId];
    }
    return state.selectedFeatures[mod.id] ?? true;
  });
}

export function buildFileMap(state: SelectionState): Map<string, string> {
  const fileMap = new Map<string, string>();
  const activeModules = getActiveModules(state);

  const ctx: RenderContext = {
    commandStyle: state.commandStyle,
    prefix: state.prefix || '!',
    guildId: state.guildId || '',
    welcomeConfig: state.welcomeConfig,
    autoModConfig: state.autoModConfig,
    economyConfig: state.economyConfig,
    reactionRolesConfig: state.reactionRolesConfig,
    autoResponderConfig: state.autoResponderConfig,
    selectedFeatures: state.selectedFeatures,
  };

  // Collect all required intents and partials
  const intents = new Set<string>(['Guilds']);
  const partials = new Set<string>();
  const packageDeps: Record<string, string> = {
    'discord.js': '^14.14.1',
    'dotenv': '^16.3.1',
  };

  for (const mod of activeModules) {
    mod.requiredIntents.forEach(i => intents.add(i));
    mod.requiredPartials.forEach(p => partials.add(p));
    for (const [pkg, ver] of Object.entries(mod.packageDeps)) {
      if (!packageDeps[pkg] || compareSemver(ver, packageDeps[pkg]) > 0) {
        packageDeps[pkg] = ver;
      }
    }
  }

  // Collect event contributions grouped by event
  const eventContributions = new Map<DiscordEvent, Array<{ priority: number; render: (ctx: RenderContext) => string }>>();

  for (const mod of activeModules) {
    for (const contrib of mod.eventContributions) {
      if (!eventContributions.has(contrib.event)) {
        eventContributions.set(contrib.event, []);
      }
      eventContributions.get(contrib.event)!.push({
        priority: contrib.priority,
        render: contrib.render,
      });
    }
  }

  // Sort contributions by priority
  for (const [event, contribs] of eventContributions.entries()) {
    eventContributions.set(event, contribs.sort((a, b) => a.priority - b.priority));
  }

  // Generate command files
  for (const mod of activeModules) {
    const activeFiles = getActiveCommandFiles(mod, state);
    for (const cmdFile of activeFiles) {
      const path = `commands/${cmdFile.subfolder}/${cmdFile.filename}`;
      fileMap.set(path, cmdFile.render(ctx));
    }
  }

  // Generate event files
  // messageCreate (if needed)
  const needsMessageCreate =
    state.commandStyle === 'prefix' ||
    eventContributions.has('messageCreate');

  if (needsMessageCreate) {
    const fragments = (eventContributions.get('messageCreate') || []).map(c => c.render(ctx));
    fileMap.set('events/messageCreate.js', messageCreateTemplate(ctx, fragments));
  }

  // interactionCreate (if slash mode)
  if (state.commandStyle === 'slash') {
    fileMap.set('events/interactionCreate.js', interactionCreateTemplate(ctx));
  }

  // guildMemberAdd / guildMemberRemove
  if (eventContributions.has('guildMemberAdd')) {
    const contribs = eventContributions.get('guildMemberAdd')!;
    fileMap.set('events/guildMemberAdd.js', contribs[0].render(ctx));
  }

  if (eventContributions.has('guildMemberRemove') && state.welcomeConfig.enableLeave) {
    const contribs = eventContributions.get('guildMemberRemove')!;
    fileMap.set('events/guildMemberRemove.js', contribs[0].render(ctx));
  }

  // messageReactionAdd / Remove
  if (eventContributions.has('messageReactionAdd')) {
    const contribs = eventContributions.get('messageReactionAdd')!;
    fileMap.set('events/messageReactionAdd.js', contribs[0].render(ctx));
  }

  if (eventContributions.has('messageReactionRemove')) {
    const contribs = eventContributions.get('messageReactionRemove')!;
    fileMap.set('events/messageReactionRemove.js', contribs[0].render(ctx));
  }

  // Ready event (always include)
  fileMap.set('events/ready.js', `module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    console.log(\`✅ Logged in as \${client.user.tag}\`);
    console.log(\`📊 Serving \${client.guilds.cache.size} guild(s)\`);
  },
};
`);

  // Economy files
  const isEconomyActive = activeModules.some(m => m.id === 'economy');
  if (isEconomyActive) {
    fileMap.set('utils/economyHelper.js', economyHelperTemplate(ctx));
    fileMap.set('data/economy.json', economyJsonTemplate());
  }

  // Core files
  fileMap.set('index.js', renderIndexJs({ ...ctx, selectedFeatures: { ...state.selectedFeatures, ...Object.fromEntries([...intents].map(i => [i, true])) } }));
  fileMap.set('package.json', renderPackageJson(packageDeps, activeModules));
  fileMap.set('.env.example', renderEnvExample(ctx));
  fileMap.set('README.md', renderReadme(ctx, activeModules));

  if (state.commandStyle === 'slash') {
    fileMap.set('deploy-commands.js', renderDeployCommands(ctx));
  }

  return fileMap;
}

function compareSemver(a: string, b: string): number {
  const parseVer = (v: string) => v.replace(/[\^~>=<]/g, '').split('.').map(Number);
  const av = parseVer(a);
  const bv = parseVer(b);
  for (let i = 0; i < 3; i++) {
    const diff = (av[i] || 0) - (bv[i] || 0);
    if (diff !== 0) return diff;
  }
  return 0;
}
