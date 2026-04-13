import { useSelectionStore } from '../../store/selectionStore';
import { useTranslation } from '../../i18n';
import type { AutoResponderEntry } from '../../generator/types';

export function AutoResponderConfigSection() {
  const { autoResponderConfig, setAutoResponderConfig } = useSelectionStore();
  const { t } = useTranslation();
  const a = t.step2.autoResponder;

  const addEntry = () => {
    setAutoResponderConfig([...autoResponderConfig, { trigger: '', response: '', matchType: 'contains' }]);
  };

  const updateEntry = (index: number, field: keyof AutoResponderEntry, value: string) => {
    const updated = autoResponderConfig.map((e, i) =>
      i === index ? { ...e, [field]: value } : e
    );
    setAutoResponderConfig(updated);
  };

  const removeEntry = (index: number) => {
    setAutoResponderConfig(autoResponderConfig.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 space-y-4">
      <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
        {a.title}
      </h3>
      <div className="space-y-3">
        {autoResponderConfig.map((entry, i) => (
          <div key={i} className="flex gap-2 items-start">
            <div className="flex-1 space-y-2">
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder={a.trigger}
                  value={entry.trigger}
                  onChange={e => updateEntry(i, 'trigger', e.target.value)}
                  className="col-span-2 px-2 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-xs text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <select
                  value={entry.matchType}
                  onChange={e => updateEntry(i, 'matchType', e.target.value)}
                  className="px-2 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-xs text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="contains">{a.contains}</option>
                  <option value="exact">{a.exact}</option>
                  <option value="startsWith">{a.startsWith}</option>
                </select>
              </div>
              <input
                type="text"
                placeholder={a.response}
                value={entry.response}
                onChange={e => updateEntry(i, 'response', e.target.value)}
                className="w-full px-2 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-xs text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => removeEntry(i)}
              className="p-1.5 text-red-400 hover:text-red-600 transition-colors mt-1"
              aria-label="Remove entry"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={addEntry}
        className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium transition-colors"
      >
        {a.addEntry}
      </button>
    </div>
  );
}
