import type { RenderContext } from '../../generator/types';

export function serverinfoTemplate(ctx: RenderContext): string {
  if (ctx.commandStyle === 'slash') {
    return `const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('Display information about the server'),

  async execute(interaction) {
    const guild = interaction.guild;
    const owner = await guild.fetchOwner();
    const embed = new EmbedBuilder()
      .setColor(0x5865F2)
      .setTitle(guild.name)
      .setThumbnail(guild.iconURL())
      .addFields(
        { name: '👑 Owner', value: owner.user.tag, inline: true },
        { name: '👥 Members', value: \`\${guild.memberCount}\`, inline: true },
        { name: '📅 Created', value: \`<t:\${Math.floor(guild.createdTimestamp / 1000)}:D>\`, inline: true },
        { name: '💬 Channels', value: \`\${guild.channels.cache.size}\`, inline: true },
        { name: '🎭 Roles', value: \`\${guild.roles.cache.size}\`, inline: true },
        { name: '😀 Emojis', value: \`\${guild.emojis.cache.size}\`, inline: true }
      )
      .setFooter({ text: \`ID: \${guild.id}\` })
      .setTimestamp();
    interaction.reply({ embeds: [embed] });
  },
};
`;
  }

  return `const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'serverinfo',
  description: 'Display information about the server',
  async execute(message) {
    const guild = message.guild;
    const owner = await guild.fetchOwner();
    const embed = new EmbedBuilder()
      .setColor(0x5865F2)
      .setTitle(guild.name)
      .setThumbnail(guild.iconURL())
      .addFields(
        { name: '👑 Owner', value: owner.user.tag, inline: true },
        { name: '👥 Members', value: \`\${guild.memberCount}\`, inline: true },
        { name: '📅 Created', value: \`<t:\${Math.floor(guild.createdTimestamp / 1000)}:D>\`, inline: true },
        { name: '💬 Channels', value: \`\${guild.channels.cache.size}\`, inline: true },
        { name: '🎭 Roles', value: \`\${guild.roles.cache.size}\`, inline: true },
        { name: '😀 Emojis', value: \`\${guild.emojis.cache.size}\`, inline: true }
      )
      .setFooter({ text: \`ID: \${guild.id}\` })
      .setTimestamp();
    message.reply({ embeds: [embed] });
  },
};
`;
}
