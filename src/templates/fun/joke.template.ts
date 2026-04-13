import type { RenderContext } from '../../generator/types';

export function jokeTemplate(ctx: RenderContext): string {
  const jokes = `[
  { setup: "Why don't scientists trust atoms?", punchline: "Because they make up everything!" },
  { setup: "Why did the scarecrow win an award?", punchline: "Because he was outstanding in his field!" },
  { setup: "Why don't eggs tell jokes?", punchline: "They'd crack each other up!" },
  { setup: "I'm reading a book about anti-gravity.", punchline: "It's impossible to put down!" },
  { setup: "Did you hear about the mathematician who's afraid of negative numbers?", punchline: "He'll stop at nothing to avoid them!" },
  { setup: "Why do programmers prefer dark mode?", punchline: "Because light attracts bugs!" },
  { setup: "How many programmers does it take to change a light bulb?", punchline: "None, that's a hardware problem!" },
  { setup: "Why did the developer go broke?", punchline: "Because he used up all his cache!" },
  { setup: "What do you call a bear with no teeth?", punchline: "A gummy bear!" },
  { setup: "Why can't you give Elsa a balloon?", punchline: "Because she'll let it go!" },
  { setup: "What did the ocean say to the beach?", punchline: "Nothing, it just waved!" },
  { setup: "Why did the bicycle fall over?", punchline: "Because it was two-tired!" }
]`;

  if (ctx.commandStyle === 'slash') {
    return `const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const jokes = ${jokes};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('joke')
    .setDescription('Get a random joke'),

  async execute(interaction) {
    const joke = jokes[Math.floor(Math.random() * jokes.length)];
    const embed = new EmbedBuilder()
      .setColor(0xFEE75C)
      .setTitle('😄 Random Joke')
      .addFields(
        { name: 'Setup', value: joke.setup },
        { name: 'Punchline', value: '||' + joke.punchline + '||' }
      )
      .setTimestamp();
    interaction.reply({ embeds: [embed] });
  },
};
`;
  }

  return `const { EmbedBuilder } = require('discord.js');

const jokes = ${jokes};

module.exports = {
  name: 'joke',
  description: 'Get a random joke',
  execute(message) {
    const joke = jokes[Math.floor(Math.random() * jokes.length)];
    const embed = new EmbedBuilder()
      .setColor(0xFEE75C)
      .setTitle('😄 Random Joke')
      .addFields(
        { name: 'Setup', value: joke.setup },
        { name: 'Punchline', value: '||' + joke.punchline + '||' }
      )
      .setTimestamp();
    message.reply({ embeds: [embed] });
  },
};
`;
}
