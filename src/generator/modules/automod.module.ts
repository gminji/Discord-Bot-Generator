import type { FeatureModule } from '../types';
import { automodFragmentTemplate, spamDetectionFragment } from '../../templates/automod/automodFragment.template';

export const automodModule: FeatureModule = {
  id: 'automod',
  category: 'automod',
  label: 'AutoMod',
  description: 'Profanity filter, spam detection, and link blocking',
  emoji: '🤖',
  commandFiles: [],
  eventContributions: [
    {
      event: 'messageCreate',
      priority: 10,
      render: (ctx) => spamDetectionFragment(ctx),
    },
    {
      event: 'messageCreate',
      priority: 11,
      render: (ctx) => automodFragmentTemplate(ctx),
    },
  ],
  requiredIntents: ['Guilds', 'GuildMessages', 'MessageContent'],
  requiredPartials: [],
  packageDeps: { 'discord.js': '^14.14.1' },
  subFeatures: [
    { id: 'automod.profanity', label: 'Profanity Filter', description: 'Delete messages with banned words' },
    { id: 'automod.spam', label: 'Spam Detection', description: 'Detect and remove spam messages' },
    { id: 'automod.links', label: 'Link Blocker', description: 'Block links from regular users' },
  ],
};
