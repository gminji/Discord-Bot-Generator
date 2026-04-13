import type { FeatureModule } from '../types';
import { balanceTemplate } from '../../templates/economy/balance.template';
import { dailyTemplate } from '../../templates/economy/daily.template';
import { workTemplate } from '../../templates/economy/work.template';
import { payTemplate } from '../../templates/economy/pay.template';
import { leaderboardTemplate } from '../../templates/economy/leaderboard.template';

export const economyModule: FeatureModule = {
  id: 'economy',
  category: 'economy',
  label: 'Economy',
  description: 'Balance, daily rewards, work, payments, and leaderboard (JSON-based, no DB)',
  emoji: '💰',
  commandFiles: [
    { filename: 'balance.js', subfolder: 'economy', render: balanceTemplate },
    { filename: 'daily.js', subfolder: 'economy', render: dailyTemplate },
    { filename: 'work.js', subfolder: 'economy', render: workTemplate },
    { filename: 'pay.js', subfolder: 'economy', render: payTemplate },
    { filename: 'leaderboard.js', subfolder: 'economy', render: leaderboardTemplate },
  ],
  eventContributions: [],
  requiredIntents: ['Guilds', 'GuildMessages', 'MessageContent'],
  requiredPartials: [],
  packageDeps: { 'discord.js': '^14.14.1' },
  subFeatures: [
    { id: 'economy.balance', label: 'Balance', description: 'Check your currency balance' },
    { id: 'economy.daily', label: 'Daily', description: 'Claim daily reward (24h cooldown)' },
    { id: 'economy.work', label: 'Work', description: 'Earn money by working (1h cooldown)' },
    { id: 'economy.pay', label: 'Pay', description: 'Send money to another user' },
    { id: 'economy.leaderboard', label: 'Leaderboard', description: 'Top 10 richest users' },
  ],
};
