import type { FeatureModule } from '../types';
import { autoResponderFragmentTemplate } from '../../templates/autoResponder/autoResponderFragment.template';

export const autoResponderModule: FeatureModule = {
  id: 'autoResponder',
  category: 'autoResponder',
  label: 'Auto Responder',
  description: 'Auto-reply to specific keywords or phrases',
  emoji: '💬',
  commandFiles: [],
  eventContributions: [
    {
      event: 'messageCreate',
      priority: 20,
      render: autoResponderFragmentTemplate,
    },
  ],
  requiredIntents: ['Guilds', 'GuildMessages', 'MessageContent'],
  requiredPartials: [],
  packageDeps: { 'discord.js': '^14.14.1' },
  subFeatures: [
    { id: 'autoResponder.keywords', label: 'Keyword Responses', description: 'Respond to specific words/phrases' },
  ],
};
