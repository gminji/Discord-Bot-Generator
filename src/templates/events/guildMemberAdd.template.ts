import type { RenderContext } from '../../generator/types';

export function guildMemberAddTemplate(ctx: RenderContext): string {
  const channelId = ctx.welcomeConfig.joinChannelId || 'CHANNEL_ID';
  const message = ctx.welcomeConfig.joinMessage || 'Welcome {user} to {server}!';

  return `module.exports = {
  name: 'guildMemberAdd',
  execute(member) {
    const channel = member.guild.channels.cache.get('${channelId}');
    if (!channel) return;

    const message = '${message}'
      .replace('{user}', \`<@\${member.id}>\`)
      .replace('{server}', member.guild.name)
      .replace('{memberCount}', member.guild.memberCount);

    channel.send(message);
  },
};
`;
}
