import type { RenderContext } from '../../generator/types';

export function guildMemberRemoveTemplate(ctx: RenderContext): string {
  const channelId = ctx.welcomeConfig.leaveChannelId || 'CHANNEL_ID';
  const message = ctx.welcomeConfig.leaveMessage || '{user} has left the server.';

  return `module.exports = {
  name: 'guildMemberRemove',
  execute(member) {
    const channel = member.guild.channels.cache.get('${channelId}');
    if (!channel) return;

    const message = '${message}'
      .replace('{user}', member.user ? member.user.tag : 'Someone')
      .replace('{server}', member.guild.name)
      .replace('{memberCount}', member.guild.memberCount);

    channel.send(message);
  },
};
`;
}
