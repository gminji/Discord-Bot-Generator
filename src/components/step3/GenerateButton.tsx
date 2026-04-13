import { useGenerator } from '../../hooks/useGenerator';
import { useSelectionStore } from '../../store/selectionStore';
import { ALL_MODULES } from '../../generator/modules/index';
import { useTranslation } from '../../i18n';

export function GenerateButton() {
  const { generate, isGenerating, error } = useGenerator();
  const { selectedFeatures } = useSelectionStore();
  const { t } = useTranslation();
  const s = t.step3;

  const hasAnyFeature = ALL_MODULES.some(mod => {
    if (selectedFeatures[mod.id]) return true;
    return mod.subFeatures?.some(sf => selectedFeatures[sf.id]) ?? false;
  });

  return (
    <div className="space-y-3">
      <button
        onClick={generate}
        disabled={isGenerating || !hasAnyFeature}
        className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all shadow-lg ${
          !hasAnyFeature
            ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
            : isGenerating
            ? 'bg-indigo-400 text-white cursor-wait'
            : 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white hover:shadow-indigo-200 dark:hover:shadow-indigo-900'
        }`}
      >
        {isGenerating ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            {s.generating}
          </span>
        ) : hasAnyFeature ? (
          s.generate
        ) : (
          s.selectFirst
        )}
      </button>

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400 text-center">{error}</p>
      )}

      {!hasAnyFeature && (
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          {s.selectFirstHint}
        </p>
      )}
    </div>
  );
}
