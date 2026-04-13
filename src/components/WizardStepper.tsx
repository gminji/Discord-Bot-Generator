import { useTranslation } from '../i18n';

interface WizardStepperProps {
  currentStep: number;
  onStepClick: (step: number) => void;
}

export function WizardStepper({ currentStep, onStepClick }: WizardStepperProps) {
  const { t } = useTranslation();

  const steps = [
    { number: 1, label: t.steps.features },
    { number: 2, label: t.steps.config },
    { number: 3, label: t.steps.download },
  ];

  return (
    <div className="flex items-center justify-center gap-0 mb-6">
      {steps.map((step, i) => (
        <div key={step.number} className="flex items-center">
          <button
            onClick={() => onStepClick(step.number)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              currentStep === step.number
                ? 'bg-indigo-600 text-white shadow-md'
                : currentStep > step.number
                ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 cursor-pointer hover:bg-green-200 dark:hover:bg-green-800'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'
            }`}
            disabled={currentStep < step.number}
          >
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              currentStep === step.number
                ? 'bg-white/20'
                : currentStep > step.number
                ? 'bg-green-500 text-white'
                : 'bg-gray-300 dark:bg-gray-600 text-gray-500'
            }`}>
              {currentStep > step.number ? '✓' : step.number}
            </span>
            {step.label}
          </button>
          {i < steps.length - 1 && (
            <div className={`w-8 h-0.5 mx-1 ${currentStep > step.number ? 'bg-green-400' : 'bg-gray-200 dark:bg-gray-700'}`} />
          )}
        </div>
      ))}
    </div>
  );
}
