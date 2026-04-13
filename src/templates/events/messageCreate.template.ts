import type { RenderContext } from '../../generator/types';

export function messageCreateTemplate(ctx: RenderContext, fragments: string[]): string {
  const prefixDispatch = ctx.commandStyle === 'prefix' ? `
  // Prefix command dispatch
  if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/\\s+/);
  const commandName = args.shift().toLowerCase();
  const command = client.commands.get(commandName);
  if (!command) return;
  try {
    command.execute(message, args, client);
  } catch (error) {
    console.error(error);
    message.reply('An error occurred while executing that command.');
  }` : '';

  const fragmentCode = fragments.length > 0
    ? '\n' + fragments.map(f => f.split('\n').map(l => '  ' + l).join('\n')).join('\n\n')
    : '';

  const prefixConst = ctx.commandStyle === 'prefix'
    ? `\n  const prefix = '${ctx.prefix}';\n` : '';

  return `module.exports = {
  name: 'messageCreate',
  execute(message, client) {
    if (message.author.bot) return;
    if (!message.guild) return;
${prefixConst}${fragmentCode}${prefixDispatch}
  },
};
`;
}
