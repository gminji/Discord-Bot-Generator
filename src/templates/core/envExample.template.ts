import type { RenderContext } from '../../generator/types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function renderEnvExample(_ctx: RenderContext): string {
  return `# Discord Bot Configuration
TOKEN=your_bot_token_here
CLIENT_ID=your_client_id_here
GUILD_ID=your_guild_id_here
`;
}
