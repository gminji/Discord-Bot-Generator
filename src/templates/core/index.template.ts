import type { RenderContext } from '../../generator/types';

export function renderIndexJs(ctx: RenderContext): string {
  const intents = ctx.selectedFeatures ? buildIntentsList(ctx) : ['GatewayIntentBits.Guilds'];
  const partials = buildPartialsList(ctx);

  const intentsStr = intents.map(i => `    GatewayIntentBits.${i.replace('GatewayIntentBits.', '')}`).join(',\n');
  const partialsStr = partials.length > 0
    ? `  partials: [\n${partials.map(p => `    Partials.${p.replace('Partials.', '')}`).join(',\n')}\n  ],\n`
    : '';

  return `require('dotenv').config();
const { Client, GatewayIntentBits, Collection, Partials } = require('discord.js');
const fs = require('fs');
const path = require('path');

const client = new Client({
  intents: [
${intentsStr}
  ],
${partialsStr}});

client.commands = new Collection();

// Load commands recursively
function loadCommands(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      loadCommands(fullPath);
    } else if (entry.name.endsWith('.js')) {
      const command = require(fullPath);
      if (command.data && command.execute) {
        client.commands.set(command.data.name, command);
      } else if (command.name && command.execute) {
        client.commands.set(command.name, command);
      }
    }
  }
}

const commandsPath = path.join(__dirname, 'commands');
if (fs.existsSync(commandsPath)) {
  loadCommands(commandsPath);
}

// Load events
const eventsPath = path.join(__dirname, 'events');
if (fs.existsSync(eventsPath)) {
  const eventFiles = fs.readdirSync(eventsPath).filter(f => f.endsWith('.js'));
  for (const file of eventFiles) {
    const event = require(path.join(eventsPath, file));
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args, client));
    } else {
      client.on(event.name, (...args) => event.execute(...args, client));
    }
  }
}

client.login(process.env.TOKEN);
`;
}

function buildIntentsList(ctx: RenderContext): string[] {
  const intents = new Set<string>(['Guilds']);

  if (ctx.selectedFeatures['moderation'] || ctx.selectedFeatures['utility'] || ctx.selectedFeatures['fun'] || ctx.selectedFeatures['economy']) {
    intents.add('GuildMessages');
    intents.add('MessageContent');
    intents.add('GuildMembers');
  }
  if (ctx.selectedFeatures['welcome']) {
    intents.add('GuildMembers');
  }
  if (ctx.selectedFeatures['automod'] || ctx.selectedFeatures['autoResponder'] || ctx.selectedFeatures['poll']) {
    intents.add('GuildMessages');
    intents.add('MessageContent');
  }
  if (ctx.selectedFeatures['reactionRoles']) {
    intents.add('GuildMessageReactions');
    intents.add('GuildMembers');
  }

  return Array.from(intents);
}

function buildPartialsList(ctx: RenderContext): string[] {
  const partials = new Set<string>();

  if (ctx.selectedFeatures['reactionRoles']) {
    partials.add('Message');
    partials.add('Channel');
    partials.add('Reaction');
  }

  return Array.from(partials);
}
