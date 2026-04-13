import type { RenderContext } from '../../generator/types';

export function coinflipTemplate(ctx: RenderContext): string {
  if (ctx.commandStyle === 'slash') {
    return `const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('coinflip')
    .setDescription('Flip a coin'),

  async execute(interaction) {
    const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
    const embed = new EmbedBuilder()
      .setColor(result === 'Heads' ? 0xFEE75C : 0xEB459E)
      .setTitle('🪙 Coin Flip')
      .setDescription(\`The coin landed on **\${result}**!\`)
      .setTimestamp();
    interaction.reply({ embeds: [embed] });
  },
};
`;
  }

  return `const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'coinflip',
  description: 'Flip a coin',
  execute(message) {
    const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
    const embed = new EmbedBuilder()
      .setColor(result === 'Heads' ? 0xFEE75C : 0xEB459E)
      .setTitle('🪙 Coin Flip')
      .setDescription(\`The coin landed on **\${result}**!\`)
      .setTimestamp();
    message.reply({ embeds: [embed] });
  },
};
`;
}
