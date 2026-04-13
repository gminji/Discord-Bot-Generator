import type { FeatureModule } from '../types';
import { guildMemberAddTemplate } from '../../templates/events/guildMemberAdd.template';
import { guildMemberRemoveTemplate } from '../../templates/events/guildMemberRemove.template';

export const welcomeModule: FeatureModule = {
  id: 'welcome',
  category: 'welcome',
  label: 'Welcome',
  description: 'Welcome new members and farewell messages',
  emoji: '👋',
  commandFiles: [],
  eventContributions: [
    {
      event: 'guildMemberAdd',
      priority: 0,
      render: guildMemberAddTemplate,
    },
    {
      event: 'guildMemberRemove',
      priority: 0,
      render: guildMemberRemoveTemplate,
    },
  ],
  requiredIntents: ['Guilds', 'GuildMembers'],
  requiredPartials: [],
  packageDeps: { 'discord.js': '^14.14.1' },
  subFeatures: [
    { id: 'welcome.join', label: 'Welcome Message', description: 'Send message when member joins' },
    { id: 'welcome.leave', label: 'Goodbye Message', description: 'Send message when member leaves' },
  ],
};
