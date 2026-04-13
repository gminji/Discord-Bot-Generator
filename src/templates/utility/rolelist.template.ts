import type { RenderContext } from '../../generator/types';

export function rolelistTemplate(ctx: RenderContext): string {
  if (ctx.commandStyle === 'slash') {
    return `const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rolelist')
    .setDescription('List all roles in the server'),

  async execute(interaction) {
    const roles = interaction.guild.roles.cache
      .filter(r => r.id !== interaction.guild.id)
      .sort((a, b) => b.position - a.position)
      .map(r => \`\${r.toString()} (\${r.members.size} members)\`);

    const chunks = [];
    let current = '';
    for (const role of roles) {
      if ((current + role + '\\n').length > 1000) {
        chunks.push(current);
        current = '';
      }
      current += role + '\\n';
    }
    if (current) chunks.push(current);

    const embed = new EmbedBuilder()
      .setColor(0x5865F2)
      .setTitle(\`🎭 Roles (\${roles.length})\`)
      .setDescription(chunks[0] || 'No roles found.')
      .setTimestamp();

    interaction.reply({ embeds: [embed] });
  },
};
`;
  }

  return `const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'rolelist',
  description: 'List all roles in the server',
  execute(message) {
    const roles = message.guild.roles.cache
      .filter(r => r.id !== message.guild.id)
      .sort((a, b) => b.position - a.position)
      .map(r => \`\${r.toString()} (\${r.members.size} members)\`);

    const embed = new EmbedBuilder()
      .setColor(0x5865F2)
      .setTitle(\`🎭 Roles (\${roles.length})\`)
      .setDescription(roles.slice(0, 20).join('\\n') || 'No roles found.')
      .setTimestamp();

    message.reply({ embeds: [embed] });
  },
};
`;
}
