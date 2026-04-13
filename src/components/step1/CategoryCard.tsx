import { useState } from 'react';
import type { FeatureModule } from '../../generator/types';
import { useSelectionStore } from '../../store/selectionStore';
import { SubFeatureList } from './SubFeatureList';
import { useTranslation } from '../../i18n';

interface CategoryCardProps {
  module: FeatureModule;
}

export function CategoryCard({ module }: CategoryCardProps) {
  const { selectedFeatures, toggleCategory } = useSelectionStore();
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  const subFeatureIds = module.subFeatures?.map(sf => sf.id) ?? [];
  const isActive = !!selectedFeatures[module.id] ||
    subFeatureIds.some(id => selectedFeatures[id]);
  const activeCount = subFeatureIds.filter(id => selectedFeatures[id]).length;

  const moduleT = t.modules[module.id];
  const label = moduleT?.label ?? module.label;
  const description = moduleT?.description ?? module.description;

  const handleToggle = () => {
    const newValue = !isActive;
    toggleCategory(module.id, subFeatureIds, newValue);
    if (newValue && !expanded) setExpanded(true);
  };

  return (
    <div className={`rounded-xl border-2 transition-all duration-200 ${
      isActive
        ? 'border-indigo-400 dark:border-indigo-600 bg-indigo-50 dark:bg-indigo-950/30'
        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 hover:border-gray-300 dark:hover:border-gray-600'
    }`}>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <button
            onClick={() => setExpanded(e => !e)}
            className="flex items-start gap-3 flex-1 text-left"
          >
            <span className="text-2xl mt-0.5">{module.emoji}</span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-900 dark:text-white">{label}</h3>
                {isActive && activeCount > 0 && (
                  <span className="text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 px-1.5 py-0.5 rounded-full">
                    {activeCount}/{subFeatureIds.length}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{description}</p>
            </div>
          </button>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setExpanded(e => !e)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors text-sm"
              aria-label={expanded ? 'Collapse' : 'Expand'}
            >
              {expanded ? '▲' : '▼'}
            </button>
            {/* Toggle switch */}
            <button
              onClick={handleToggle}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                isActive ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'
              }`}
              role="switch"
              aria-checked={isActive}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                  isActive ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {expanded && module.subFeatures && module.subFeatures.length > 0 && (
          <SubFeatureList subFeatures={module.subFeatures} />
        )}
      </div>
    </div>
  );
}
