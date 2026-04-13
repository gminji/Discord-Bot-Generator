import type { RenderContext } from '../../generator/types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const readyTemplate = (_ctx: RenderContext): string => `module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    console.log(\`✅ Logged in as \${client.user.tag}\`);
    console.log(\`Serving \${client.guilds.cache.size} guild(s)\`);
  },
};
`;
