import { useSelectionStore } from '../../store/selectionStore';
import { useTranslation } from '../../i18n';

export function EconomyConfigSection() {
  const { economyConfig, setEconomyConfig } = useSelectionStore();
  const { t } = useTranslation();
  const e = t.step2.economy;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 space-y-4">
      <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
        {e.title}
      </h3>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {e.startingBalance}
          </label>
          <input
            type="number"
            min={0}
            value={economyConfig.startingBalance}
            onChange={ev => setEconomyConfig({ startingBalance: Number(ev.target.value) })}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {e.dailyReward}
          </label>
          <input
            type="number"
            min={1}
            value={economyConfig.dailyAmount}
            onChange={ev => setEconomyConfig({ dailyAmount: Number(ev.target.value) })}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {e.workMinReward}
          </label>
          <input
            type="number"
            min={1}
            value={economyConfig.workMinReward}
            onChange={ev => setEconomyConfig({ workMinReward: Number(ev.target.value) })}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {e.workMaxReward}
          </label>
          <input
            type="number"
            min={1}
            value={economyConfig.workMaxReward}
            onChange={ev => setEconomyConfig({ workMaxReward: Number(ev.target.value) })}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {e.currencySymbol}
        </label>
        <input
          type="text"
          maxLength={10}
          value={economyConfig.currencySymbol}
          onChange={ev => setEconomyConfig({ currencySymbol: ev.target.value || '💰' })}
          className="w-32 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="💰"
        />
      </div>
    </div>
  );
}
