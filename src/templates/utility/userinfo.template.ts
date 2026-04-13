import type { RenderContext } from '../../generator/types';

export function userinfoTemplate(ctx: RenderContext): string {
  if (ctx.commandStyle === 'slash') {
    return `const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('Display information about a user')
    .addUserOption(opt => opt.setName('user').setDescription('The user to look up').setRequired(false)),

  async execute(interaction) {
    const target = interaction.options.getMember('user') ?? interaction.member;
    const user = target.user;
    const roles = target.roles.cache
      .filter(r => r.id !== interaction.guild.id)
      .map(r => r.toString())
      .join(', ') || 'None';

    const embed = new EmbedBuilder()
      .setColor(target.displayHexColor || 0x5865F2)
      .setTitle(user.tag)
      .setThumbnail(user.displayAvatarURL())
      .addFields(
        { name: '🆔 ID', value: user.id, inline: true },
        { name: '📅 Account Created', value: \`<t:\${Math.floor(user.createdTimestamp / 1000)}:D>\`, inline: true },
        { name: '📥 Joined Server', value: \`<t:\${Math.floor(target.joinedTimestamp / 1000)}:D>\`, inline: true },
        { name: '🎭 Roles', value: roles.length > 1024 ? roles.substring(0, 1020) + '...' : roles }
      )
      .setTimestamp();
    interaction.reply({ embeds: [embed] });
  },
};
`;
  }

  return `const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'userinfo',
  description: 'Display information about a user',
  async execute(message, args) {
    const target = message.mentions.members.first() ?? message.member;
    const user = target.user;
    const roles = target.roles.cache
      .filter(r => r.id !== message.guild.id)
      .map(r => r.toString())
      .join(', ') || 'None';

    const embed = new EmbedBuilder()
      .setColor(target.displayHexColor || 0x5865F2)
      .setTitle(user.tag)
      .setThumbnail(user.displayAvatarURL())
      .addFields(
        { name: '🆔 ID', value: user.id, inline: true },
        { name: '📅 Account Created', value: \`<t:\${Math.floor(user.createdTimestamp / 1000)}:D>\`, inline: true },
        { name: '📥 Joined Server', value: \`<t:\${Math.floor(target.joinedTimestamp / 1000)}:D>\`, inline: true },
        { name: '🎭 Roles', value: roles.length > 1024 ? roles.substring(0, 1020) + '...' : roles }
      )
      .setTimestamp();
    message.reply({ embeds: [embed] });
  },
};
`;
}
