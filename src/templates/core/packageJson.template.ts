import type { FeatureModule } from '../../generator/types';

export function renderPackageJson(
  deps: Record<string, string>,
  _modules: FeatureModule[]
): string {
  return JSON.stringify(
    {
      name: 'discord-bot',
      version: '1.0.0',
      description: 'Generated Discord bot',
      main: 'index.js',
      scripts: {
        start: 'node index.js',
        deploy: 'node deploy-commands.js',
      },
      dependencies: deps,
    },
    null,
    2
  );
}
