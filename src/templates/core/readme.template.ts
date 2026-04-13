import type { RenderContext, FeatureModule } from '../../generator/types';

export function renderReadme(ctx: RenderContext, activeModules: FeatureModule[]): string {
  const featureList = activeModules.map(m => `- **${m.emoji} ${m.label}**: ${m.description}`).join('\n');

  const commandSection = ctx.commandStyle === 'slash'
    ? `### Slash Commands\nAfter starting, register commands once:\n\`\`\`bash\nnode deploy-commands.js\n\`\`\``
    : `### Prefix Commands\nUse prefix \`${ctx.prefix}\` before commands (e.g., \`${ctx.prefix}ping\`)`;

  return `# Discord Bot

Generated with **Discord Bot Generator**

## Quick Start

1. **Copy env file**
   \`\`\`bash
   cp .env.example .env
   \`\`\`

2. **Fill in \`.env\`**
   - \`TOKEN\` — Bot token from [Discord Developer Portal](https://discord.com/developers/applications)
   - \`CLIENT_ID\` — Your application/client ID
   - \`GUILD_ID\` — Server ID (optional, for faster slash command registration)

3. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

4. **Start the bot**
   \`\`\`bash
   npm start
   \`\`\`

${commandSection}

## Included Features

${featureList || '- No features selected'}

## Requirements

- Node.js 18 or higher
- Discord bot with appropriate intents enabled in Developer Portal:
  - **Message Content Intent** (if using prefix commands or automod)
  - **Server Members Intent** (if using welcome/moderation features)
  - **Presence Intent** (optional)

## Notes

${ctx.selectedFeatures['economy'] ? '- **Economy**: Data is stored in `data/economy.json`. This file must be writable. Data resets if the file is deleted.\n' : ''}\
${ctx.selectedFeatures['reactionRoles'] ? '- **Reaction Roles**: Make sure the bot role is above the roles it needs to assign in the server settings.\n' : ''}\
- Keep your \`.env\` file secret — never share it or commit it to GitHub.
`;
}
