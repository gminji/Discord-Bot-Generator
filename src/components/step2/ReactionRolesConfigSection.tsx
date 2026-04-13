import { useSelectionStore } from '../../store/selectionStore';
import { useTranslation } from '../../i18n';
import type { ReactionRoleEntry } from '../../generator/types';

export function ReactionRolesConfigSection() {
  const { reactionRolesConfig, setReactionRolesConfig } = useSelectionStore();
  const { t } = useTranslation();
  const r = t.step2.reactionRoles;

  const addEntry = () => {
    setReactionRolesConfig([...reactionRolesConfig, { messageId: '', emoji: '', roleId: '' }]);
  };

  const updateEntry = (index: number, field: keyof ReactionRoleEntry, value: string) => {
    const updated = reactionRolesConfig.map((e, i) =>
      i === index ? { ...e, [field]: value } : e
    );
    setReactionRolesConfig(updated);
  };

  const removeEntry = (index: number) => {
    setReactionRolesConfig(reactionRolesConfig.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 space-y-4">
      <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
        {r.title}
      </h3>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {r.hint}
      </p>
      <div className="space-y-3">
        {reactionRolesConfig.map((entry, i) => (
          <div key={i} className="flex gap-2 items-start">
            <div className="flex-1 grid grid-cols-3 gap-2">
              <input
                type="text"
                placeholder={r.messageId}
                value={entry.messageId}
                onChange={e => updateEntry(i, 'messageId', e.target.value)}
                className="px-2 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-xs font-mono text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder={r.emoji}
                value={entry.emoji}
                onChange={e => updateEntry(i, 'emoji', e.target.value)}
                className="px-2 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-xs text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder={r.roleId}
                value={entry.roleId}
                onChange={e => updateEntry(i, 'roleId', e.target.value)}
                className="px-2 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-xs font-mono text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => removeEntry(i)}
              className="p-1.5 text-red-400 hover:text-red-600 transition-colors"
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
        {r.addEntry}
      </button>
    </div>
  );
}
