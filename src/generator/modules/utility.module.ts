import type { FeatureModule } from '../types';
import { pingTemplate } from '../../templates/utility/ping.template';
import { serverinfoTemplate } from '../../templates/utility/serverinfo.template';
import { userinfoTemplate } from '../../templates/utility/userinfo.template';
import { avatarTemplate } from '../../templates/utility/avatar.template';
import { helpTemplate } from '../../templates/utility/help.template';
import { rolelistTemplate } from '../../templates/utility/rolelist.template';

export const utilityModule: FeatureModule = {
  id: 'utility',
  category: 'utility',
  label: 'Utility',
  description: 'Ping, server info, user info, avatar, help, and role list',
  emoji: '🔧',
  commandFiles: [
    { filename: 'ping.js', subfolder: 'utility', render: pingTemplate },
    { filename: 'serverinfo.js', subfolder: 'utility', render: serverinfoTemplate },
    { filename: 'userinfo.js', subfolder: 'utility', render: userinfoTemplate },
    { filename: 'avatar.js', subfolder: 'utility', render: avatarTemplate },
    { filename: 'help.js', subfolder: 'utility', render: helpTemplate },
    { filename: 'rolelist.js', subfolder: 'utility', render: rolelistTemplate },
  ],
  eventContributions: [],
  requiredIntents: ['Guilds', 'GuildMembers', 'GuildMessages', 'MessageContent'],
  requiredPartials: [],
  packageDeps: { 'discord.js': '^14.14.1' },
  subFeatures: [
    { id: 'utility.ping', label: 'Ping', description: 'Check bot and API latency' },
    { id: 'utility.serverinfo', label: 'Server Info', description: 'Display server statistics' },
    { id: 'utility.userinfo', label: 'User Info', description: 'Display user profile information' },
    { id: 'utility.avatar', label: 'Avatar', description: "Show user's avatar" },
    { id: 'utility.help', label: 'Help', description: 'List all available commands' },
    { id: 'utility.rolelist', label: 'Role List', description: 'List all server roles' },
  ],
};
