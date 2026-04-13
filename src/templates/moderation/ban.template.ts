import type { RenderContext } from '../../generator/types';

export function banTemplate(ctx: RenderContext): string {
  if (ctx.commandStyle === 'slash') {
    return `const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban a member from the server')
    .addUserOption(opt => opt.setName('user').setDescription('The user to ban').setRequired(true))
    .addStringOption(opt => opt.setName('reason').setDescription('Reason for ban').setRequired(false))
    .addIntegerOption(opt => opt.setName('days').setDescription('Days of messages to delete (0-7)').setMinValue(0).setMaxValue(7).setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async execute(interaction) {
    const target = interaction.options.getMember('user');
    const reason = interaction.options.getString('reason') ?? 'No reason provided';
    const days = interaction.options.getInteger('days') ?? 0;

    if (!target) return interaction.reply({ content: 'User not found.', ephemeral: true });
    if (!target.bannable) return interaction.reply({ content: 'I cannot ban this user.', ephemeral: true });

    await target.ban({ deleteMessageDays: days, reason });

    const embed = new EmbedBuilder()
      .setColor(0xFF0000)
      .setTitle('Member Banned')
      .addFields(
        { name: 'User', value: \`\${target.user.tag}\`, inline: true },
        { name: 'Reason', value: reason, inline: true },
        { name: 'Messages Deleted', value: \`\${days} day(s)\`, inline: true }
      )
      .setTimestamp();

    interaction.reply({ embeds: [embed] });
  },
};
`;
  }

  return `const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: 'ban',
  description: 'Ban a member from the server',
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.BanMembers)) {
      return message.reply('You do not have permission to ban members.');
    }

    const target = message.mentions.members.first();
    if (!target) return message.reply('Please mention a user to ban.');
    if (!target.bannable) return message.reply('I cannot ban this user.');

    const reason = args.slice(1).join(' ') || 'No reason provided';
    await target.ban({ deleteMessageDays: 0, reason });

    const embed = new EmbedBuilder()
      .setColor(0xFF0000)
      .setTitle('Member Banned')
      .addFields(
        { name: 'User', value: \`\${target.user.tag}\`, inline: true },
        { name: 'Reason', value: reason, inline: true }
      )
      .setTimestamp();

    message.reply({ embeds: [embed] });
  },
};
`;
}
