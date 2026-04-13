import { useSelectionStore } from '../../store/selectionStore';
import { useTranslation } from '../../i18n';

export function WelcomeConfigSection() {
  const { welcomeConfig, setWelcomeConfig } = useSelectionStore();
  const { t } = useTranslation();
  const w = t.step2.welcome;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 space-y-4">
      <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
        {w.title}
      </h3>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {w.joinChannelId}
        </label>
        <input
          type="text"
          value={welcomeConfig.joinChannelId}
          onChange={e => setWelcomeConfig({ joinChannelId: e.target.value })}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white font-mono focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="Channel ID"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {w.joinMessage}
        </label>
        <input
          type="text"
          value={welcomeConfig.joinMessage}
          onChange={e => setWelcomeConfig({ joinMessage: e.target.value })}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Use <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">{'{user}'}</code>{' '}
          <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">{'{server}'}</code>{' '}
          <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">{'{memberCount}'}</code>
        </p>
      </div>
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={welcomeConfig.enableLeave}
          onChange={e => setWelcomeConfig({ enableLeave: e.target.checked })}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600"
        />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{w.enableLeave}</span>
      </label>
      {welcomeConfig.enableLeave && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {w.leaveChannelId}
            </label>
            <input
              type="text"
              value={welcomeConfig.leaveChannelId}
              onChange={e => setWelcomeConfig({ leaveChannelId: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white font-mono focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Channel ID"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {w.leaveMessage}
            </label>
            <input
              type="text"
              value={welcomeConfig.leaveMessage}
              onChange={e => setWelcomeConfig({ leaveMessage: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </>
      )}
    </div>
  );
}
