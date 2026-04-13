import type { RenderContext } from '../../generator/types';

export function eightballTemplate(ctx: RenderContext): string {
  const responses = `[
  '✅ It is certain.', '✅ It is decidedly so.', '✅ Without a doubt.',
  '✅ Yes, definitely.', '✅ You may rely on it.', '✅ As I see it, yes.',
  '✅ Most likely.', '✅ Outlook good.', '✅ Yes.', '✅ Signs point to yes.',
  '🤔 Reply hazy, try again.', '🤔 Ask again later.', '🤔 Better not tell you now.',
  '🤔 Cannot predict now.', '🤔 Concentrate and ask again.',
  '❌ Don\'t count on it.', '❌ My reply is no.', '❌ My sources say no.',
  '❌ Outlook not so good.', '❌ Very doubtful.'
]`;

  if (ctx.commandStyle === 'slash') {
    return `const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const responses = ${responses};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('8ball')
    .setDescription('Ask the magic 8-ball a question')
    .addStringOption(opt => opt.setName('question').setDescription('Your question').setRequired(true)),

  async execute(interaction) {
    const question = interaction.options.getString('question');
    const answer = responses[Math.floor(Math.random() * responses.length)];
    const embed = new EmbedBuilder()
      .setColor(0x5865F2)
      .setTitle('🎱 Magic 8-Ball')
      .addFields(
        { name: 'Question', value: question },
        { name: 'Answer', value: answer }
      )
      .setTimestamp();
    interaction.reply({ embeds: [embed] });
  },
};
`;
  }

  return `const { EmbedBuilder } = require('discord.js');

const responses = ${responses};

module.exports = {
  name: '8ball',
  description: 'Ask the magic 8-ball a question',
  execute(message, args) {
    const question = args.join(' ');
    if (!question) return message.reply('Please ask a question!');
    const answer = responses[Math.floor(Math.random() * responses.length)];
    const embed = new EmbedBuilder()
      .setColor(0x5865F2)
      .setTitle('🎱 Magic 8-Ball')
      .addFields(
        { name: 'Question', value: question },
        { name: 'Answer', value: answer }
      )
      .setTimestamp();
    message.reply({ embeds: [embed] });
  },
};
`;
}
