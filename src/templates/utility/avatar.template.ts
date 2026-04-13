import type { RenderContext } from '../../generator/types';

export function avatarTemplate(ctx: RenderContext): string {
  if (ctx.commandStyle === 'slash') {
    return `const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription("Get a user's avatar")
    .addUserOption(opt => opt.setName('user').setDescription('The user').setRequired(false)),

  async execute(interaction) {
    const user = interaction.options.getUser('user') ?? interaction.user;
    const embed = new EmbedBuilder()
      .setColor(0x5865F2)
      .setTitle(\`\${user.tag}'s Avatar\`)
      .setImage(user.displayAvatarURL({ size: 512 }))
      .addFields({ name: 'Download', value: \`[PNG](\${user.displayAvatarURL({ extension: 'png', size: 512 })}) | [JPG](\${user.displayAvatarURL({ extension: 'jpg', size: 512 })})\` });
    interaction.reply({ embeds: [embed] });
  },
};
`;
  }

  return `const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'avatar',
  description: "Get a user's avatar",
  async execute(message) {
    const user = message.mentions.users.first() ?? message.author;
    const embed = new EmbedBuilder()
      .setColor(0x5865F2)
      .setTitle(\`\${user.tag}'s Avatar\`)
      .setImage(user.displayAvatarURL({ size: 512 }))
      .addFields({ name: 'Download', value: \`[PNG](\${user.displayAvatarURL({ extension: 'png', size: 512 })}) | [JPG](\${user.displayAvatarURL({ extension: 'jpg', size: 512 })})\` });
    message.reply({ embeds: [embed] });
  },
};
`;
}
