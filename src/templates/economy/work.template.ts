import type { RenderContext } from '../../generator/types';

export function workTemplate(ctx: RenderContext): string {
  const min = ctx.economyConfig.workMinReward;
  const max = ctx.economyConfig.workMaxReward;

  const jobs = `['software developer', 'chef', 'teacher', 'doctor', 'artist', 'musician', 'driver', 'engineer', 'writer', 'farmer']`;

  if (ctx.commandStyle === 'slash') {
    return `const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getUser, addBalance, setTimestamp, CURRENCY } = require('../../utils/economyHelper');

const WORK_MIN = ${min};
const WORK_MAX = ${max};
const COOLDOWN = 60 * 60 * 1000; // 1 hour
const JOBS = ${jobs};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('work')
    .setDescription('Work to earn money'),

  async execute(interaction) {
    const userData = getUser(interaction.user.id);
    const now = Date.now();
    const remaining = COOLDOWN - (now - userData.lastWork);

    if (remaining > 0) {
      const minutes = Math.floor(remaining / 60000);
      return interaction.reply({ content: \`⏰ You're tired! Come back in \${minutes}m.\`, ephemeral: true });
    }

    const earned = Math.floor(Math.random() * (WORK_MAX - WORK_MIN + 1)) + WORK_MIN;
    const job = JOBS[Math.floor(Math.random() * JOBS.length)];
    addBalance(interaction.user.id, earned);
    setTimestamp(interaction.user.id, 'lastWork');

    const newBalance = getUser(interaction.user.id).balance;
    const embed = new EmbedBuilder()
      .setColor(0x57F287)
      .setTitle('💼 Work Complete!')
      .setDescription(\`You worked as a **\${job}** and earned **\${earned} \${CURRENCY}**!\`)
      .addFields({ name: 'New Balance', value: \`\${newBalance} \${CURRENCY}\` })
      .setTimestamp();
    interaction.reply({ embeds: [embed] });
  },
};
`;
  }

  return `const { EmbedBuilder } = require('discord.js');
const { getUser, addBalance, setTimestamp, CURRENCY } = require('../../utils/economyHelper');

const WORK_MIN = ${min};
const WORK_MAX = ${max};
const COOLDOWN = 60 * 60 * 1000;
const JOBS = ${jobs};

module.exports = {
  name: 'work',
  description: 'Work to earn money (1 hour cooldown)',
  execute(message) {
    const userData = getUser(message.author.id);
    const now = Date.now();
    const remaining = COOLDOWN - (now - userData.lastWork);

    if (remaining > 0) {
      const minutes = Math.floor(remaining / 60000);
      return message.reply(\`⏰ You're tired! Come back in \${minutes}m.\`);
    }

    const earned = Math.floor(Math.random() * (WORK_MAX - WORK_MIN + 1)) + WORK_MIN;
    const job = JOBS[Math.floor(Math.random() * JOBS.length)];
    addBalance(message.author.id, earned);
    setTimestamp(message.author.id, 'lastWork');

    const newBalance = getUser(message.author.id).balance;
    const embed = new EmbedBuilder()
      .setColor(0x57F287)
      .setTitle('💼 Work Complete!')
      .setDescription(\`You worked as a **\${job}** and earned **\${earned} \${CURRENCY}**!\`)
      .addFields({ name: 'New Balance', value: \`\${newBalance} \${CURRENCY}\` })
      .setTimestamp();
    message.reply({ embeds: [embed] });
  },
};
`;
}
