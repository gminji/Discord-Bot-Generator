import type { FeatureModule } from '../types';
import { kickTemplate } from '../../templates/moderation/kick.template';
import { banTemplate } from '../../templates/moderation/ban.template';
import { muteTemplate } from '../../templates/moderation/mute.template';
import { warnTemplate } from '../../templates/moderation/warn.template';
import { unbanTemplate } from '../../templates/moderation/unban.template';
import { purgeTemplate } from '../../templates/moderation/purge.template';

export const moderationModule: FeatureModule = {
  id: 'moderation',
  category: 'moderation',
  label: 'Moderation',
  description: 'Kick, ban, mute, warn, unban, and purge members',
  emoji: '🛡️',
  commandFiles: [
    { filename: 'kick.js', subfolder: 'moderation', render: kickTemplate },
    { filename: 'ban.js', subfolder: 'moderation', render: banTemplate },
    { filename: 'mute.js', subfolder: 'moderation', render: muteTemplate },
    { filename: 'warn.js', subfolder: 'moderation', render: warnTemplate },
    { filename: 'unban.js', subfolder: 'moderation', render: unbanTemplate },
    { filename: 'purge.js', subfolder: 'moderation', render: purgeTemplate },
  ],
  eventContributions: [],
  requiredIntents: ['Guilds', 'GuildMembers', 'GuildMessages', 'MessageContent'],
  requiredPartials: [],
  packageDeps: { 'discord.js': '^14.14.1' },
  subFeatures: [
    { id: 'moderation.kick', label: 'Kick', description: 'Kick members from the server' },
    { id: 'moderation.ban', label: 'Ban', description: 'Ban members permanently' },
    { id: 'moderation.mute', label: 'Mute/Timeout', description: 'Timeout members temporarily' },
    { id: 'moderation.warn', label: 'Warn', description: 'Warn members with DM notification' },
    { id: 'moderation.unban', label: 'Unban', description: 'Unban users by ID' },
    { id: 'moderation.purge', label: 'Purge', description: 'Bulk delete messages (1-100)' },
  ],
};
