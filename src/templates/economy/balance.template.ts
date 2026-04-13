import type { RenderContext } from '../../generator/types';

export function balanceTemplate(ctx: RenderContext): string {
  if (ctx.commandStyle === 'slash') {
    return `const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getUser, CURRENCY } = require('../../utils/economyHelper');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('balance')
    .setDescription('Check your balance')
    .addUserOption(opt => opt.setName('user').setDescription('User to check').setRequired(false)),

  async execute(interaction) {
    const target = interaction.options.getUser('user') ?? interaction.user;
    const userData = getUser(target.id);
    const embed = new EmbedBuilder()
      .setColor(0x57F287)
      .setTitle(\`\${target.username}'s Balance\`)
      .setDescription(\`**\${userData.balance} \${CURRENCY}**\`)
      .setThumbnail(target.displayAvatarURL())
      .setTimestamp();
    interaction.reply({ embeds: [embed] });
  },
};
`;
  }

  return `const { EmbedBuilder } = require('discord.js');
const { getUser, CURRENCY } = require('../../utils/economyHelper');

module.exports = {
  name: 'balance',
  description: 'Check your balance',
  execute(message, args) {
    const target = message.mentions.users.first() ?? message.author;
    const userData = getUser(target.id);
    const embed = new EmbedBuilder()
      .setColor(0x57F287)
      .setTitle(\`\${target.username}'s Balance\`)
      .setDescription(\`**\${userData.balance} \${CURRENCY}**\`)
      .setThumbnail(target.displayAvatarURL())
      .setTimestamp();
    message.reply({ embeds: [embed] });
  },
};
`;
}
