import type { RenderContext } from '../../generator/types';

export function pingTemplate(ctx: RenderContext): string {
  if (ctx.commandStyle === 'slash') {
    return `const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Check the bot latency'),

  async execute(interaction) {
    const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
    const embed = new EmbedBuilder()
      .setColor(0x5865F2)
      .setTitle('🏓 Pong!')
      .addFields(
        { name: 'Bot Latency', value: \`\${sent.createdTimestamp - interaction.createdTimestamp}ms\`, inline: true },
        { name: 'API Latency', value: \`\${Math.round(interaction.client.ws.ping)}ms\`, inline: true }
      )
      .setTimestamp();
    interaction.editReply({ content: null, embeds: [embed] });
  },
};
`;
  }

  return `const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'ping',
  description: 'Check the bot latency',
  async execute(message) {
    const sent = await message.reply('Pinging...');
    const embed = new EmbedBuilder()
      .setColor(0x5865F2)
      .setTitle('🏓 Pong!')
      .addFields(
        { name: 'Bot Latency', value: \`\${sent.createdTimestamp - message.createdTimestamp}ms\`, inline: true },
        { name: 'API Latency', value: \`\${Math.round(message.client.ws.ping)}ms\`, inline: true }
      )
      .setTimestamp();
    sent.edit({ content: null, embeds: [embed] });
  },
};
`;
}
