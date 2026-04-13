import type { RenderContext } from '../../generator/types';

export function warnTemplate(ctx: RenderContext): string {
  if (ctx.commandStyle === 'slash') {
    return `const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Warn a member')
    .addUserOption(opt => opt.setName('user').setDescription('The user to warn').setRequired(true))
    .addStringOption(opt => opt.setName('reason').setDescription('Reason for warning').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {
    const target = interaction.options.getMember('user');
    const reason = interaction.options.getString('reason');

    if (!target) return interaction.reply({ content: 'User not found.', ephemeral: true });

    try {
      await target.user.send(\`⚠️ You have been warned in **\${interaction.guild.name}**\\nReason: \${reason}\`);
    } catch {}

    const embed = new EmbedBuilder()
      .setColor(0xFFA500)
      .setTitle('Member Warned')
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
  name: 'warn',
  description: 'Warn a member',
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.ModerateMembers)) {
      return message.reply('You do not have permission to warn members.');
    }

    const target = message.mentions.members.first();
    if (!target) return message.reply('Please mention a user to warn.');

    const reason = args.slice(1).join(' ') || 'No reason provided';

    try {
      await target.user.send(\`⚠️ You have been warned in **\${message.guild.name}**\\nReason: \${reason}\`);
    } catch {}

    const embed = new EmbedBuilder()
      .setColor(0xFFA500)
      .setTitle('Member Warned')
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
