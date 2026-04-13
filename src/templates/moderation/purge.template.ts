import type { RenderContext } from '../../generator/types';

export function purgeTemplate(ctx: RenderContext): string {
  if (ctx.commandStyle === 'slash') {
    return `const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('purge')
    .setDescription('Delete multiple messages from the channel')
    .addIntegerOption(opt =>
      opt.setName('amount').setDescription('Number of messages to delete (1-100)').setRequired(true).setMinValue(1).setMaxValue(100)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const amount = interaction.options.getInteger('amount');
    await interaction.deferReply({ ephemeral: true });

    try {
      const deleted = await interaction.channel.bulkDelete(amount, true);
      interaction.editReply({ content: \`✅ Deleted \${deleted.size} message(s).\` });
    } catch (error) {
      interaction.editReply({ content: 'Failed to delete messages. Messages older than 14 days cannot be bulk deleted.' });
    }
  },
};
`;
  }

  return `const { PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: 'purge',
  description: 'Delete multiple messages (1-100)',
  async execute(message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
      return message.reply('You do not have permission to manage messages.');
    }

    const amount = parseInt(args[0]);
    if (isNaN(amount) || amount < 1 || amount > 100) {
      return message.reply('Please provide a number between 1 and 100.');
    }

    await message.delete();

    try {
      const deleted = await message.channel.bulkDelete(amount, true);
      const reply = await message.channel.send(\`✅ Deleted \${deleted.size} message(s).\`);
      setTimeout(() => reply.delete().catch(() => {}), 3000);
    } catch {
      message.channel.send('Failed to delete messages. Messages older than 14 days cannot be bulk deleted.');
    }
  },
};
`;
}
