import type { RenderContext } from '../../generator/types';

export function helpTemplate(ctx: RenderContext): string {
  if (ctx.commandStyle === 'slash') {
    return `const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('List all available commands'),

  async execute(interaction) {
    const commands = interaction.client.commands;
    const embed = new EmbedBuilder()
      .setColor(0x5865F2)
      .setTitle('📋 Command List')
      .setDescription('Here are all available commands:')
      .setTimestamp();

    const categories = {};
    commands.forEach(cmd => {
      const path = cmd.data?.name ? 'general' : 'general';
      if (!categories[path]) categories[path] = [];
      categories[path].push(\`\\\`/\${cmd.data.name}\\\` — \${cmd.data.description}\`);
    });

    for (const [cat, cmds] of Object.entries(categories)) {
      embed.addFields({ name: cat.charAt(0).toUpperCase() + cat.slice(1), value: cmds.join('\\n') });
    }

    interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
`;
  }

  return `const { EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'help',
  description: 'List all available commands',
  execute(message) {
    const commandsPath = path.join(__dirname, '..', '..', 'commands');
    const categories = {};

    function readCommands(dir, category) {
      if (!fs.existsSync(dir)) return;
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          readCommands(full, entry.name);
        } else if (entry.name.endsWith('.js')) {
          try {
            const cmd = require(full);
            if (cmd.name && cmd.description) {
              if (!categories[category]) categories[category] = [];
              categories[category].push(\`\\\`${ctx.prefix}{\${cmd.name}}\\\` — \${cmd.description}\`);
            }
          } catch {}
        }
      }
    }

    readCommands(commandsPath, 'general');

    const embed = new EmbedBuilder()
      .setColor(0x5865F2)
      .setTitle('📋 Command List')
      .setTimestamp();

    for (const [cat, cmds] of Object.entries(categories)) {
      embed.addFields({ name: cat.charAt(0).toUpperCase() + cat.slice(1), value: cmds.join('\\n') });
    }

    message.reply({ embeds: [embed] });
  },
};
`;
}
