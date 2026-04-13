import type { RenderContext } from '../../generator/types';

export function leaderboardTemplate(ctx: RenderContext): string {
  if (ctx.commandStyle === 'slash') {
    return `const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getAllUsers, CURRENCY } = require('../../utils/economyHelper');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('Show the top 10 richest users'),

  async execute(interaction) {
    const data = getAllUsers();
    const sorted = Object.entries(data)
      .sort(([, a], [, b]) => b.balance - a.balance)
      .slice(0, 10);

    const medals = ['🥇', '🥈', '🥉'];
    const lines = await Promise.all(sorted.map(async ([userId, userData], i) => {
      try {
        const user = await interaction.client.users.fetch(userId);
        const medal = medals[i] || \`\${i + 1}.\`;
        return \`\${medal} **\${user.username}** — \${userData.balance} \${CURRENCY}\`;
      } catch {
        return \`\${i + 1}. Unknown User — \${userData.balance} \${CURRENCY}\`;
      }
    }));

    const embed = new EmbedBuilder()
      .setColor(0xFEE75C)
      .setTitle('🏆 Economy Leaderboard')
      .setDescription(lines.join('\\n') || 'No data yet.')
      .setTimestamp();
    interaction.reply({ embeds: [embed] });
  },
};
`;
  }

  return `const { EmbedBuilder } = require('discord.js');
const { getAllUsers, CURRENCY } = require('../../utils/economyHelper');

module.exports = {
  name: 'leaderboard',
  description: 'Show the top 10 richest users',
  async execute(message) {
    const data = getAllUsers();
    const sorted = Object.entries(data)
      .sort(([, a], [, b]) => b.balance - a.balance)
      .slice(0, 10);

    const medals = ['🥇', '🥈', '🥉'];
    const lines = await Promise.all(sorted.map(async ([userId, userData], i) => {
      try {
        const user = await message.client.users.fetch(userId);
        const medal = medals[i] || \`\${i + 1}.\`;
        return \`\${medal} **\${user.username}** — \${userData.balance} \${CURRENCY}\`;
      } catch {
        return \`\${i + 1}. Unknown User — \${userData.balance} \${CURRENCY}\`;
      }
    }));

    const embed = new EmbedBuilder()
      .setColor(0xFEE75C)
      .setTitle('🏆 Economy Leaderboard')
      .setDescription(lines.join('\\n') || 'No data yet.')
      .setTimestamp();
    message.reply({ embeds: [embed] });
  },
};
`;
}
