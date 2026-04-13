import type { FeatureModule } from '../types';
import { pollTemplate } from '../../templates/poll/poll.template';

export const pollModule: FeatureModule = {
  id: 'poll',
  category: 'poll',
  label: 'Poll',
  description: 'Create emoji voting polls',
  emoji: '📊',
  commandFiles: [
    { filename: 'poll.js', subfolder: 'poll', render: pollTemplate },
  ],
  eventContributions: [],
  requiredIntents: ['Guilds', 'GuildMessages', 'MessageContent', 'GuildMessageReactions'],
  requiredPartials: [],
  packageDeps: { 'discord.js': '^14.14.1' },
  subFeatures: [
    { id: 'poll.create', label: 'Create Poll', description: 'Create polls with up to 5 options' },
  ],
};
