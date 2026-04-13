import { useSelectionStore } from '../../store/selectionStore';
import { useTranslation } from '../../i18n';

export function BotConfigSection() {
  const { commandStyle, prefix, guildId, setCommandStyle, setPrefix, setGuildId } = useSelectionStore();
  const { t } = useTranslation();
  const c = t.step2.botConfig;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 space-y-4">
      <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
        {c.title}
      </h3>

      {/* Command Style */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {c.commandStyle}
        </label>
        <div className="flex gap-3">
          {(['slash', 'prefix'] as const).map((style) => (
            <button
              key={style}
              onClick={() => setCommandStyle(style)}
              className={`flex-1 py-2 px-4 rounded-lg border-2 text-sm font-medium transition-all ${
                commandStyle === style
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300'
                  : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300'
              }`}
            >
              {style === 'slash' ? c.slashCommands : c.prefixCommands}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {commandStyle === 'slash' ? c.slashHint : c.prefixHint}
        </p>
      </div>

      {/* Prefix (only for prefix mode) */}
      {commandStyle === 'prefix' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {c.commandPrefix}
          </label>
          <input
            type="text"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value || '!')}
            maxLength={5}
            className="w-24 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="!"
          />
        </div>
      )}

      {/* Guild ID (for slash commands) */}
      {commandStyle === 'slash' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {c.guildId} <span className="text-gray-400 font-normal">{c.optional}</span>
          </label>
          <input
            type="text"
            value={guildId}
            onChange={(e) => setGuildId(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono"
            placeholder="123456789012345678"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {c.guildIdHint}
          </p>
        </div>
      )}
    </div>
  );
}
