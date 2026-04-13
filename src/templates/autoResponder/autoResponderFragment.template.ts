import type { RenderContext } from '../../generator/types';

export function autoResponderFragmentTemplate(ctx: RenderContext): string {
  if (ctx.autoResponderConfig.length === 0) {
    return `// Auto Responder (no entries configured)`;
  }

  const entries = ctx.autoResponderConfig.map((entry) => {
    const triggerLower = entry.trigger.toLowerCase().replace(/'/g, "\\'");
    const response = entry.response.replace(/'/g, "\\'").replace(/`/g, '\\`');

    let condition = '';
    switch (entry.matchType) {
      case 'exact':
        condition = `lowerMsg === '${triggerLower}'`;
        break;
      case 'startsWith':
        condition = `lowerMsg.startsWith('${triggerLower}')`;
        break;
      case 'contains':
      default:
        condition = `lowerMsg.includes('${triggerLower}')`;
        break;
    }

    return `  if (${condition}) {
    message.reply('${response}');
    return;
  }`;
  }).join('\n');

  return `// Auto Responder
const lowerMsg = message.content.toLowerCase();
${entries}`;
}
