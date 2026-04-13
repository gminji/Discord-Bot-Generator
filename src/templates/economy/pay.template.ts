import type { RenderContext } from '../../generator/types';

export function payTemplate(ctx: RenderContext): string {
  if (ctx.commandStyle === 'slash') {
    return `const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getUser, addBalance, setBalance, CURRENCY } = require('../../utils/economyHelper');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pay')
    .setDescription('Pay another user')
    .addUserOption(opt => opt.setName('user').setDescription('User to pay').setRequired(true))
    .addIntegerOption(opt => opt.setName('amount').setDescription('Amount to pay').setRequired(true).setMinValue(1)),

  async execute(interaction) {
    const target = interaction.options.getUser('user');
    const amount = interaction.options.getInteger('amount');

    if (target.id === interaction.user.id) {
      return interaction.reply({ content: "You can't pay yourself!", ephemeral: true });
    }
    if (target.bot) {
      return interaction.reply({ content: "You can't pay bots!", ephemeral: true });
    }

    const senderData = getUser(interaction.user.id);
    if (senderData.balance < amount) {
      return interaction.reply({ content: \`You don't have enough \${CURRENCY}! Your balance: \${senderData.balance} \${CURRENCY}\`, ephemeral: true });
    }

    setBalance(interaction.user.id, senderData.balance - amount);
    addBalance(target.id, amount);

    const embed = new EmbedBuilder()
      .setColor(0x57F287)
      .setTitle('💸 Payment Sent!')
      .addFields(
        { name: 'From', value: interaction.user.tag, inline: true },
        { name: 'To', value: target.tag, inline: true },
        { name: 'Amount', value: \`\${amount} \${CURRENCY}\`, inline: true }
      )
      .setTimestamp();
    interaction.reply({ embeds: [embed] });
  },
};
`;
  }

  return `const { EmbedBuilder } = require('discord.js');
const { getUser, addBalance, setBalance, CURRENCY } = require('../../utils/economyHelper');

module.exports = {
  name: 'pay',
  description: 'Pay another user',
  execute(message, args) {
    const target = message.mentions.users.first();
    const amount = parseInt(args[1]);

    if (!target) return message.reply('Please mention a user to pay.');
    if (isNaN(amount) || amount < 1) return message.reply('Please provide a valid amount.');
    if (target.id === message.author.id) return message.reply("You can't pay yourself!");
    if (target.bot) return message.reply("You can't pay bots!");

    const senderData = getUser(message.author.id);
    if (senderData.balance < amount) {
      return message.reply(\`You don't have enough \${CURRENCY}! Your balance: \${senderData.balance} \${CURRENCY}\`);
    }

    setBalance(message.author.id, senderData.balance - amount);
    addBalance(target.id, amount);

    const embed = new EmbedBuilder()
      .setColor(0x57F287)
      .setTitle('💸 Payment Sent!')
      .addFields(
        { name: 'From', value: message.author.tag, inline: true },
        { name: 'To', value: target.tag, inline: true },
        { name: 'Amount', value: \`\${amount} \${CURRENCY}\`, inline: true }
      )
      .setTimestamp();
    message.reply({ embeds: [embed] });
  },
};
`;
}
