import type { RenderContext } from '../../generator/types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function renderDeployCommands(_ctx: RenderContext): string {
  return `require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

const commands = [];

function collectCommands(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectCommands(fullPath);
    } else if (entry.name.endsWith('.js')) {
      const command = require(fullPath);
      if (command.data) {
        commands.push(command.data.toJSON());
      }
    }
  }
}

const commandsPath = path.join(__dirname, 'commands');
if (fs.existsSync(commandsPath)) {
  collectCommands(commandsPath);
}

const rest = new REST().setToken(process.env.TOKEN);

(async () => {
  try {
    console.log(\`Registering \${commands.length} slash commands...\`);

    const guildId = process.env.GUILD_ID;
    if (guildId) {
      // Guild commands (instant update, recommended for testing)
      await rest.put(
        Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId),
        { body: commands }
      );
      console.log(\`✅ Registered \${commands.length} guild commands for guild \${guildId}\`);
    } else {
      // Global commands (up to 1 hour to propagate)
      await rest.put(
        Routes.applicationCommands(process.env.CLIENT_ID),
        { body: commands }
      );
      console.log(\`✅ Registered \${commands.length} global commands\`);
    }
  } catch (error) {
    console.error('Error registering commands:', error);
  }
})();
`;
}
