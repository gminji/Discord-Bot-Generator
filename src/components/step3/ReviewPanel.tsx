import { useSelectionStore } from '../../store/selectionStore';
import { ALL_MODULES } from '../../generator/modules/index';
import { buildFileMap } from '../../generator/compose';
import { GenerateButton } from './GenerateButton';
import { useTranslation } from '../../i18n';

export function ReviewPanel() {
  const state = useSelectionStore();
  const { t } = useTranslation();
  const s = t.step3;

  const activeModules = ALL_MODULES.filter(mod => {
    if (state.selectedFeatures[mod.id]) return true;
    return mod.subFeatures?.some(sf => state.selectedFeatures[sf.id]) ?? false;
  });

  let fileCount = 0;
  try {
    const map = buildFileMap(state);
    fileCount = map.size;
  } catch {}

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{s.title}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {fileCount > 0 ? s.filesGenerated(fileCount) : s.noFeaturesSelected}
        </p>
      </div>

      {activeModules.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="font-medium text-gray-900 dark:text-white mb-3 text-sm">{s.includedFeatures}</h3>
          <div className="space-y-2">
            {activeModules.map(mod => {
              const activeSubFeatures = mod.subFeatures?.filter(sf => state.selectedFeatures[sf.id]) ?? [];
              const modLabel = t.modules[mod.id]?.label ?? mod.label;
              return (
                <div key={mod.id} className="flex items-start gap-2">
                  <span className="text-lg mt-0.5">{mod.emoji}</span>
                  <div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{modLabel}</span>
                    {activeSubFeatures.length > 0 && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {activeSubFeatures.map(sf => t.subFeatures[sf.id]?.label ?? sf.label).join(', ')}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="font-medium text-gray-900 dark:text-white mb-3 text-sm">{s.configuration}</h3>
        <dl className="space-y-1 text-sm">
          <div className="flex justify-between">
            <dt className="text-gray-500 dark:text-gray-400">{s.commandStyle}</dt>
            <dd className="font-medium text-gray-900 dark:text-white">
              {state.commandStyle === 'slash' ? s.slash : s.prefix}
            </dd>
          </div>
          {state.commandStyle === 'prefix' && (
            <div className="flex justify-between">
              <dt className="text-gray-500 dark:text-gray-400">{s.prefixLabel}</dt>
              <dd className="font-mono font-medium text-gray-900 dark:text-white">{state.prefix}</dd>
            </div>
          )}
          {state.commandStyle === 'slash' && state.guildId && (
            <div className="flex justify-between">
              <dt className="text-gray-500 dark:text-gray-400">{s.guildId}</dt>
              <dd className="font-mono text-xs font-medium text-gray-900 dark:text-white">{state.guildId}</dd>
            </div>
          )}
        </dl>
      </div>

      <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800 p-4">
        <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-2 text-sm">{s.afterDownload.title}</h3>
        <ol className="text-xs text-blue-700 dark:text-blue-400 space-y-1 list-decimal list-inside">
          <li>{s.afterDownload.step1}</li>
          <li>
            {s.afterDownload.step2.split('.env.example').map((part, i, arr) =>
              i < arr.length - 1 ? (
                <span key={i}>
                  {part}
                  <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">.env.example</code>
                  {' '}→{' '}
                  <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">.env</code>
                </span>
              ) : (
                <span key={i}>{part}</span>
              )
            )}
          </li>
          <li><code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">npm install</code></li>
          {state.commandStyle === 'slash' && (
            <li><code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">node deploy-commands.js</code></li>
          )}
          <li><code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">npm start</code></li>
        </ol>
      </div>

      <GenerateButton />
    </div>
  );
}
