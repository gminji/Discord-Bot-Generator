import { ALL_MODULES } from '../../generator/modules/index';
import { CategoryCard } from './CategoryCard';
import { useSelectionStore } from '../../store/selectionStore';
import { useTranslation } from '../../i18n';

export function FeatureSelector() {
  const { selectedFeatures, toggleCategory } = useSelectionStore();
  const { t } = useTranslation();

  const totalSelected = Object.values(selectedFeatures).filter(Boolean).length;
  const allSelected = ALL_MODULES.every(m => selectedFeatures[m.id]);

  const handleSelectAll = () => {
    for (const mod of ALL_MODULES) {
      toggleCategory(mod.id, mod.subFeatures?.map(sf => sf.id) ?? [], !allSelected);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{t.step1.title}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {totalSelected > 0 ? t.step1.subtitleCount(totalSelected) : t.step1.subtitleNone}
          </p>
        </div>
        <button
          onClick={handleSelectAll}
          className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium transition-colors"
        >
          {allSelected ? t.step1.deselectAll : t.step1.selectAll}
        </button>
      </div>
      <div className="space-y-3">
        {ALL_MODULES.map((module) => (
          <CategoryCard key={module.id} module={module} />
        ))}
      </div>
    </div>
  );
}
