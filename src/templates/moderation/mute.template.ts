import type { RenderContext } from '../../generator/types';

export function muteTemplate(ctx: RenderContext): string {
  if (ctx.commandStyle === 'slash') {
    return `const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mute')
    .setDescription('Timeout (mute) a member')
    .addUserOption(opt => opt.setName('user').setDescription('The user to mute').setRequired(true))
    .addIntegerOption(opt => opt.setName('duration').setDescription('Duration in minutes').setMinValue(1).setMaxValue(40320).setRequired(true))
    .addStringOption(opt => opt.setName('reason').setDescription('Reason').setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {
    const target = interaction.options.getMember('user');
    const duration = interaction.options.getInteger('duration');
    const reason = interaction.options.getString('reason') ?? 'No reason provided';

    if (!target) return interaction.reply({ content: 'User not found.', ephemeral: true });
    if (!target.moderatable) return interaction.reply({ content: 'I cannot timeout this user.', ephemeral: true });

    await target.timeout(duration * 60 * 1000, reason);

    const embed = new EmbedBuilder()
      .setColor(0xFFA500)
      .setTitle('Member Timed Out')
      .addFields(
        { name: 'User', value: \`\${target.user.tag}\`, inline: true },
        { name: 'Duration', value: \`\${duration} minute(s)\`, inline: true },
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
  name: 'mute',
  description: 'Timeout a member',
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.ModerateMembers)) {
      return message.reply('You do not have permission to timeout members.');
    }

    const target = message.mentions.members.first();
    if (!target) return message.reply('Please mention a user to timeout.');
    if (!target.moderatable) return message.reply('I cannot timeout this user.');

    const duration = parseInt(args[1]) || 10;
    const reason = args.slice(2).join(' ') || 'No reason provided';

    await target.timeout(duration * 60 * 1000, reason);

    const embed = new EmbedBuilder()
      .setColor(0xFFA500)
      .setTitle('Member Timed Out')
      .addFields(
        { name: 'User', value: \`\${target.user.tag}\`, inline: true },
        { name: 'Duration', value: \`\${duration} minute(s)\`, inline: true },
        { name: 'Reason', value: reason, inline: true }
      )
      .setTimestamp();

    message.reply({ embeds: [embed] });
  },
};
`;
}
