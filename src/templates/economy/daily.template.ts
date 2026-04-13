import type { RenderContext } from '../../generator/types';

export function dailyTemplate(ctx: RenderContext): string {
  const amount = ctx.economyConfig.dailyAmount;

  if (ctx.commandStyle === 'slash') {
    return `const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getUser, addBalance, setTimestamp, CURRENCY } = require('../../utils/economyHelper');

const DAILY_AMOUNT = ${amount};
const COOLDOWN = 24 * 60 * 60 * 1000;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('daily')
    .setDescription('Claim your daily reward'),

  async execute(interaction) {
    const userData = getUser(interaction.user.id);
    const now = Date.now();
    const remaining = COOLDOWN - (now - userData.lastDaily);

    if (remaining > 0) {
      const hours = Math.floor(remaining / 3600000);
      const minutes = Math.floor((remaining % 3600000) / 60000);
      return interaction.reply({ content: \`⏰ Daily already claimed! Come back in \${hours}h \${minutes}m.\`, ephemeral: true });
    }

    addBalance(interaction.user.id, DAILY_AMOUNT);
    setTimestamp(interaction.user.id, 'lastDaily');

    const newBalance = getUser(interaction.user.id).balance;
    const embed = new EmbedBuilder()
      .setColor(0x57F287)
      .setTitle('💰 Daily Reward Claimed!')
      .setDescription(\`You received **\${DAILY_AMOUNT} \${CURRENCY}**!\`)
      .addFields({ name: 'New Balance', value: \`\${newBalance} \${CURRENCY}\` })
      .setTimestamp();
    interaction.reply({ embeds: [embed] });
  },
};
`;
  }

  return `const { EmbedBuilder } = require('discord.js');
const { getUser, addBalance, setTimestamp, CURRENCY } = require('../../utils/economyHelper');

const DAILY_AMOUNT = ${amount};
const COOLDOWN = 24 * 60 * 60 * 1000;

module.exports = {
  name: 'daily',
  description: 'Claim your daily reward',
  execute(message) {
    const userData = getUser(message.author.id);
    const now = Date.now();
    const remaining = COOLDOWN - (now - userData.lastDaily);

    if (remaining > 0) {
      const hours = Math.floor(remaining / 3600000);
      const minutes = Math.floor((remaining % 3600000) / 60000);
      return message.reply(\`⏰ Daily already claimed! Come back in \${hours}h \${minutes}m.\`);
    }

    addBalance(message.author.id, DAILY_AMOUNT);
    setTimestamp(message.author.id, 'lastDaily');

    const newBalance = getUser(message.author.id).balance;
    const embed = new EmbedBuilder()
      .setColor(0x57F287)
      .setTitle('💰 Daily Reward Claimed!')
      .setDescription(\`You received **\${DAILY_AMOUNT} \${CURRENCY}**!\`)
      .addFields({ name: 'New Balance', value: \`\${newBalance} \${CURRENCY}\` })
      .setTimestamp();
    message.reply({ embeds: [embed] });
  },
};
`;
}
