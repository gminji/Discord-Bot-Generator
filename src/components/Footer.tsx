import { useTranslation } from '../i18n';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-6 py-4 text-center">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {t.footer.tagline}
      </p>
      {/* Ad slot — insert Google AdSense here */}
      <div className="mt-3 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-xs text-gray-400 dark:text-gray-600">
        {t.footer.adLabel}
      </div>
    </footer>
  );
}
