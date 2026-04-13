import type { RenderContext } from '../../generator/types';

export function diceTemplate(ctx: RenderContext): string {
  if (ctx.commandStyle === 'slash') {
    return `const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dice')
    .setDescription('Roll a dice')
    .addIntegerOption(opt => opt.setName('sides').setDescription('Number of sides (default 6)').setRequired(false).setMinValue(2).setMaxValue(1000))
    .addIntegerOption(opt => opt.setName('count').setDescription('Number of dice (default 1)').setRequired(false).setMinValue(1).setMaxValue(20)),

  async execute(interaction) {
    const sides = interaction.options.getInteger('sides') ?? 6;
    const count = interaction.options.getInteger('count') ?? 1;
    const rolls = Array.from({ length: count }, () => Math.floor(Math.random() * sides) + 1);
    const total = rolls.reduce((a, b) => a + b, 0);

    const embed = new EmbedBuilder()
      .setColor(0xFEE75C)
      .setTitle(\`🎲 Rolling \${count}d\${sides}\`)
      .addFields(
        { name: 'Rolls', value: rolls.join(', '), inline: true },
        { name: 'Total', value: \`\${total}\`, inline: true }
      )
      .setTimestamp();
    interaction.reply({ embeds: [embed] });
  },
};
`;
  }

  return `const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'dice',
  description: 'Roll a dice (e.g. !dice 6 or !dice 2d20)',
  execute(message, args) {
    let sides = 6, count = 1;

    if (args[0]) {
      if (args[0].includes('d')) {
        const parts = args[0].split('d');
        count = parseInt(parts[0]) || 1;
        sides = parseInt(parts[1]) || 6;
      } else {
        sides = parseInt(args[0]) || 6;
      }
    }

    count = Math.min(Math.max(count, 1), 20);
    sides = Math.min(Math.max(sides, 2), 1000);

    const rolls = Array.from({ length: count }, () => Math.floor(Math.random() * sides) + 1);
    const total = rolls.reduce((a, b) => a + b, 0);

    const embed = new EmbedBuilder()
      .setColor(0xFEE75C)
      .setTitle(\`🎲 Rolling \${count}d\${sides}\`)
      .addFields(
        { name: 'Rolls', value: rolls.join(', '), inline: true },
        { name: 'Total', value: \`\${total}\`, inline: true }
      )
      .setTimestamp();
    message.reply({ embeds: [embed] });
  },
};
`;
}
