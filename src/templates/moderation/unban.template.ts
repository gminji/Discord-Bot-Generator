import type { RenderContext } from '../../generator/types';

export function unbanTemplate(ctx: RenderContext): string {
  if (ctx.commandStyle === 'slash') {
    return `const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unban')
    .setDescription('Unban a user by ID')
    .addStringOption(opt => opt.setName('userid').setDescription('The user ID to unban').setRequired(true))
    .addStringOption(opt => opt.setName('reason').setDescription('Reason for unban').setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async execute(interaction) {
    const userId = interaction.options.getString('userid');
    const reason = interaction.options.getString('reason') ?? 'No reason provided';

    try {
      await interaction.guild.members.unban(userId, reason);
      const embed = new EmbedBuilder()
        .setColor(0x57F287)
        .setTitle('User Unbanned')
        .addFields(
          { name: 'User ID', value: userId, inline: true },
          { name: 'Reason', value: reason, inline: true }
        )
        .setTimestamp();
      interaction.reply({ embeds: [embed] });
    } catch (error) {
      interaction.reply({ content: 'Could not unban that user. Make sure the ID is correct.', ephemeral: true });
    }
  },
};
`;
  }

  return `const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: 'unban',
  description: 'Unban a user by ID',
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.BanMembers)) {
      return message.reply('You do not have permission to unban members.');
    }

    const userId = args[0];
    if (!userId) return message.reply('Please provide a user ID.');

    const reason = args.slice(1).join(' ') || 'No reason provided';

    try {
      await message.guild.members.unban(userId, reason);
      const embed = new EmbedBuilder()
        .setColor(0x57F287)
        .setTitle('User Unbanned')
        .addFields(
          { name: 'User ID', value: userId, inline: true },
          { name: 'Reason', value: reason, inline: true }
        )
        .setTimestamp();
      message.reply({ embeds: [embed] });
    } catch {
      message.reply('Could not unban that user. Make sure the ID is correct.');
    }
  },
};
`;
}
