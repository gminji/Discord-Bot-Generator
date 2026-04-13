import { useSelectionStore } from '../../store/selectionStore';
import { useTranslation } from '../../i18n';

export function AutoModConfigSection() {
  const { autoModConfig, setAutoModConfig } = useSelectionStore();
  const { t } = useTranslation();
  const a = t.step2.automod;

  const handleBannedWords = (value: string) => {
    setAutoModConfig({
      bannedWords: value.split(',').map(w => w.trim()).filter(Boolean),
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 space-y-4">
      <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
        {a.title}
      </h3>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {a.bannedWords} <span className="text-gray-400 font-normal">{a.bannedWordsHint}</span>
        </label>
        <textarea
          value={autoModConfig.bannedWords.join(', ')}
          onChange={e => handleBannedWords(e.target.value)}
          rows={2}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
          placeholder="badword1, badword2, badword3"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {a.spamThreshold} <span className="text-gray-400 font-normal">{a.spamThresholdHint}</span>
          </label>
          <input
            type="number"
            min={2}
            max={20}
            value={autoModConfig.spamThreshold}
            onChange={e => setAutoModConfig({ spamThreshold: Number(e.target.value) })}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {a.spamWindow} <span className="text-gray-400 font-normal">{a.spamWindowHint}</span>
          </label>
          <input
            type="number"
            min={1000}
            max={10000}
            step={500}
            value={autoModConfig.spamWindow}
            onChange={e => setAutoModConfig({ spamWindow: Number(e.target.value) })}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {a.logChannelId} <span className="text-gray-400 font-normal">{a.optional}</span>
        </label>
        <input
          type="text"
          value={autoModConfig.logChannelId}
          onChange={e => setAutoModConfig({ logChannelId: e.target.value })}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-mono text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="Channel ID"
        />
      </div>
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={autoModConfig.blockLinks}
          onChange={e => setAutoModConfig({ blockLinks: e.target.checked })}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600"
        />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{a.blockLinks}</span>
      </label>
    </div>
  );
}
