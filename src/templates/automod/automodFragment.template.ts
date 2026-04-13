import type { RenderContext } from '../../generator/types';

export function automodFragmentTemplate(ctx: RenderContext): string {
  const { bannedWords, spamThreshold, spamWindow, blockLinks, logChannelId } = ctx.autoModConfig;

  const wordsArray = JSON.stringify(bannedWords.length > 0 ? bannedWords : ['badword1', 'badword2']);
  const logChannelCode = logChannelId
    ? `const logChannel = message.guild.channels.cache.get('${logChannelId}');`
    : `const logChannel = null;`;

  return `// AutoMod
const BANNED_WORDS = ${wordsArray};
const SPAM_THRESHOLD = ${spamThreshold};
const SPAM_WINDOW = ${spamWindow};
${blockLinks ? `const LINK_REGEX = /https?:\\/\\/[^\\s]+/gi;` : ''}

// Profanity filter
const lowerContent = message.content.toLowerCase();
if (BANNED_WORDS.some(word => lowerContent.includes(word))) {
  await message.delete().catch(() => {});
  ${logChannelCode}
  if (logChannel) logChannel.send(\`🚫 Deleted message from \${message.author.tag} containing banned word.\`);
  return;
}

${blockLinks ? `// Link blocker
if (LINK_REGEX.test(message.content) && !message.member.permissions.has('ManageMessages')) {
  await message.delete().catch(() => {});
  ${logChannelCode.replace('const logChannel', 'const logChannelLink')}
  if (logChannelLink) logChannelLink.send(\`🔗 Deleted link from \${message.author.tag}.\`);
  return;
}` : ''}`;
}

export function spamDetectionFragment(ctx: RenderContext): string {
  const { spamThreshold, spamWindow, logChannelId } = ctx.autoModConfig;
  const logChannelCode = logChannelId
    ? `message.guild.channels.cache.get('${logChannelId}')`
    : `null`;

  return `// Spam detection
if (!client._spamMap) client._spamMap = new Map();
const spamKey = message.author.id;
const now = Date.now();
const userSpam = client._spamMap.get(spamKey) || [];
const recentMsgs = userSpam.filter(t => now - t < ${spamWindow});
recentMsgs.push(now);
client._spamMap.set(spamKey, recentMsgs);

if (recentMsgs.length >= ${spamThreshold}) {
  await message.delete().catch(() => {});
  const spamLogChannel = ${logChannelCode};
  if (spamLogChannel) spamLogChannel.send(\`⚠️ Spam detected from \${message.author.tag}.\`);
  client._spamMap.set(spamKey, []);
  return;
}`;
}
