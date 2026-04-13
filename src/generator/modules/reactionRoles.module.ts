import type { FeatureModule } from '../types';
import { messageReactionAddTemplate } from '../../templates/events/messageReactionAdd.template';
import { messageReactionRemoveTemplate } from '../../templates/events/messageReactionRemove.template';

export const reactionRolesModule: FeatureModule = {
  id: 'reactionRoles',
  category: 'reactionRoles',
  label: 'Reaction Roles',
  description: 'Assign roles when members react to messages',
  emoji: '🎭',
  commandFiles: [],
  eventContributions: [
    {
      event: 'messageReactionAdd',
      priority: 0,
      render: messageReactionAddTemplate,
    },
    {
      event: 'messageReactionRemove',
      priority: 0,
      render: messageReactionRemoveTemplate,
    },
  ],
  requiredIntents: ['Guilds', 'GuildMembers', 'GuildMessageReactions'],
  requiredPartials: ['Message', 'Channel', 'Reaction', 'User'],
  packageDeps: { 'discord.js': '^14.14.1' },
  subFeatures: [
    { id: 'reactionRoles.assign', label: 'Reaction Role Assignment', description: 'Configure reaction → role mappings' },
  ],
};
