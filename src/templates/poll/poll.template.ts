import type { RenderContext } from '../../generator/types';

export function pollTemplate(ctx: RenderContext): string {
  if (ctx.commandStyle === 'slash') {
    return `const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const NUMBER_EMOJIS = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣'];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('poll')
    .setDescription('Create a poll')
    .addStringOption(opt => opt.setName('question').setDescription('The poll question').setRequired(true))
    .addStringOption(opt => opt.setName('option1').setDescription('Option 1').setRequired(true))
    .addStringOption(opt => opt.setName('option2').setDescription('Option 2').setRequired(true))
    .addStringOption(opt => opt.setName('option3').setDescription('Option 3').setRequired(false))
    .addStringOption(opt => opt.setName('option4').setDescription('Option 4').setRequired(false))
    .addStringOption(opt => opt.setName('option5').setDescription('Option 5').setRequired(false)),

  async execute(interaction) {
    const question = interaction.options.getString('question');
    const options = [1, 2, 3, 4, 5]
      .map(n => interaction.options.getString(\`option\${n}\`))
      .filter(Boolean);

    const description = options.map((opt, i) => \`\${NUMBER_EMOJIS[i]} \${opt}\`).join('\\n');

    const embed = new EmbedBuilder()
      .setColor(0x5865F2)
      .setTitle(\`📊 \${question}\`)
      .setDescription(description)
      .setFooter({ text: \`Poll by \${interaction.user.tag}\` })
      .setTimestamp();

    const pollMsg = await interaction.reply({ embeds: [embed], fetchReply: true });

    for (let i = 0; i < options.length; i++) {
      await pollMsg.react(NUMBER_EMOJIS[i]);
    }
  },
};
`;
  }

  return `const { EmbedBuilder } = require('discord.js');

const NUMBER_EMOJIS = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣'];

module.exports = {
  name: 'poll',
  description: 'Create a poll. Usage: !poll "Question" "Option1" "Option2" ...',
  async execute(message, args) {
    // Parse quoted arguments
    const matches = message.content.match(/"([^"]+)"/g);
    if (!matches || matches.length < 3) {
      return message.reply('Usage: \`!poll "Question" "Option 1" "Option 2" ...\`');
    }

    const parts = matches.map(m => m.replace(/"/g, ''));
    const question = parts[0];
    const options = parts.slice(1, 6);

    const description = options.map((opt, i) => \`\${NUMBER_EMOJIS[i]} \${opt}\`).join('\\n');

    const embed = new EmbedBuilder()
      .setColor(0x5865F2)
      .setTitle(\`📊 \${question}\`)
      .setDescription(description)
      .setFooter({ text: \`Poll by \${message.author.tag}\` })
      .setTimestamp();

    const pollMsg = await message.channel.send({ embeds: [embed] });

    for (let i = 0; i < options.length; i++) {
      await pollMsg.react(NUMBER_EMOJIS[i]);
    }
  },
};
`;
}
