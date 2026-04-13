import type { RenderContext } from '../../generator/types';

export function messageReactionAddTemplate(ctx: RenderContext): string {
  const entries = ctx.reactionRolesConfig.map(e =>
    `  { messageId: '${e.messageId}', emoji: '${e.emoji}', roleId: '${e.roleId}' }`
  ).join(',\n');

  return `module.exports = {
  name: 'messageReactionAdd',
  async execute(reaction, user) {
    if (user.bot) return;

    // Fetch partials
    if (reaction.partial) {
      try { await reaction.fetch(); } catch (e) { console.error('Reaction fetch error:', e); return; }
    }
    if (reaction.message.partial) {
      try { await reaction.message.fetch(); } catch (e) { console.error('Message fetch error:', e); return; }
    }

    const reactionRoles = [
${entries}
    ];

    const emojiName = reaction.emoji.id
      ? \`<:\${reaction.emoji.name}:\${reaction.emoji.id}>\`
      : reaction.emoji.name;

    const entry = reactionRoles.find(
      r => r.messageId === reaction.message.id && r.emoji === emojiName
    );
    if (!entry) return;

    const guild = reaction.message.guild;
    if (!guild) return;

    const member = await guild.members.fetch(user.id).catch(() => null);
    if (!member) return;

    const role = guild.roles.cache.get(entry.roleId);
    if (!role) return;

    member.roles.add(role).catch(console.error);
  },
};
`;
}
