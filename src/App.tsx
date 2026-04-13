import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WizardStepper } from './components/WizardStepper';
import { FeatureSelector } from './components/step1/FeatureSelector';
import { ConfigForm } from './components/step2/ConfigForm';
import { ReviewPanel } from './components/step3/ReviewPanel';
import { CodePreview } from './components/preview/CodePreview';
import { useSelectionStore } from './store/selectionStore';
import { ALL_MODULES } from './generator/modules/index';
import { useTranslation } from './i18n';

function App() {
  const [step, setStep] = useState(1);
  const [darkMode, setDarkMode] = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const { selectedFeatures } = useSelectionStore();
  const { t } = useTranslation();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const totalSelected = ALL_MODULES.reduce((acc, mod) => {
    const subCount = (mod.subFeatures ?? []).filter(sf => selectedFeatures[sf.id]).length;
    return acc + (selectedFeatures[mod.id] ? (mod.subFeatures?.length ?? 1) : subCount);
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <Header darkMode={darkMode} onToggleDark={() => setDarkMode(d => !d)} />

      <main className="flex-1 flex flex-col lg:flex-row gap-0 overflow-hidden">
        {/* Left panel — wizard */}
        <div className="lg:w-[520px] xl:w-[560px] shrink-0 flex flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="flex-1 overflow-y-auto p-6 pb-24">
            <WizardStepper currentStep={step} onStepClick={setStep} />

            {step === 1 && <FeatureSelector />}
            {step === 2 && <ConfigForm />}
            {step === 3 && <ReviewPanel />}
          </div>

          {/* Step navigation bar */}
          <div className="fixed bottom-0 left-0 lg:relative lg:bottom-auto border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-6 py-3 flex items-center justify-between lg:w-[520px] xl:w-[560px]">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {totalSelected > 0
                ? t.nav.featuresSelected(totalSelected)
                : t.nav.noFeaturesSelected}
            </div>
            <div className="flex gap-2">
              {step > 1 && (
                <button
                  onClick={() => setStep(s => s - 1)}
                  className="px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  {t.nav.back}
                </button>
              )}
              {step < 3 && (
                <button
                  onClick={() => setStep(s => s + 1)}
                  disabled={step === 1 && totalSelected === 0}
                  className={`px-4 py-2 text-sm rounded-lg font-medium transition-all ${
                    step === 1 && totalSelected === 0
                      ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  }`}
                >
                  {t.nav.next}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right panel — live preview */}
        <div className="flex-1 p-4 lg:p-6 min-h-[400px] lg:min-h-0 hidden lg:block">
          <CodePreview />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
