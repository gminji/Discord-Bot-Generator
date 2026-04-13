import type { SubFeature } from '../../generator/types';
import { useSelectionStore } from '../../store/selectionStore';
import { useTranslation } from '../../i18n';

interface SubFeatureListProps {
  subFeatures: SubFeature[];
}

export function SubFeatureList({ subFeatures }: SubFeatureListProps) {
  const { selectedFeatures, setFeature } = useSelectionStore();
  const { t } = useTranslation();

  return (
    <div className="mt-3 space-y-2 pl-2 border-l-2 border-indigo-200 dark:border-indigo-800">
      {subFeatures.map((sf) => {
        const sfT = t.subFeatures[sf.id];
        const label = sfT?.label ?? sf.label;
        const description = sfT?.description ?? sf.description;

        return (
          <label key={sf.id} className="flex items-start gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={!!selectedFeatures[sf.id]}
              onChange={(e) => setFeature(sf.id, e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <div className="min-w-0">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {label}
              </span>
              <p className="text-xs text-gray-500 dark:text-gray-500">{description}</p>
            </div>
          </label>
        );
      })}
    </div>
  );
}
