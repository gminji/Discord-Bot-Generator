import type { RenderContext } from '../../generator/types';

export function kickTemplate(ctx: RenderContext): string {
  if (ctx.commandStyle === 'slash') {
    return `const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick a member from the server')
    .addUserOption(opt => opt.setName('user').setDescription('The user to kick').setRequired(true))
    .addStringOption(opt => opt.setName('reason').setDescription('Reason for kick').setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  async execute(interaction) {
    const target = interaction.options.getMember('user');
    const reason = interaction.options.getString('reason') ?? 'No reason provided';

    if (!target) return interaction.reply({ content: 'User not found.', ephemeral: true });
    if (!target.kickable) return interaction.reply({ content: 'I cannot kick this user.', ephemeral: true });

    await target.kick(reason);

    const embed = new EmbedBuilder()
      .setColor(0xFF6B6B)
      .setTitle('Member Kicked')
      .addFields(
        { name: 'User', value: \`\${target.user.tag}\`, inline: true },
        { name: 'Reason', value: reason, inline: true }
      )
      .setTimestamp();

    interaction.reply({ embeds: [embed] });
  },
};
`;
  }

  return `const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: 'kick',
  description: 'Kick a member from the server',
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.KickMembers)) {
      return message.reply('You do not have permission to kick members.');
    }

    const target = message.mentions.members.first();
    if (!target) return message.reply('Please mention a user to kick.');
    if (!target.kickable) return message.reply('I cannot kick this user.');

    const reason = args.slice(1).join(' ') || 'No reason provided';
    await target.kick(reason);

    const embed = new EmbedBuilder()
      .setColor(0xFF6B6B)
      .setTitle('Member Kicked')
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
