import { useTranslation } from '../i18n';
import type { Lang } from '../i18n';

interface HeaderProps {
  darkMode: boolean;
  onToggleDark: () => void;
}

const LANG_OPTIONS: Lang[] = ['en', 'ja', 'ko'];

export function Header({ darkMode, onToggleDark }: HeaderProps) {
  const { t, lang, setLang } = useTranslation();

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="flex items-center gap-3">
        <span className="text-3xl">🤖</span>
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
            Discord Bot Generator
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {t.header.subtitle}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {/* Language selector */}
        <div className="flex items-center rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden text-xs font-medium">
          {LANG_OPTIONS.map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-2.5 py-1.5 transition-colors ${
                lang === l
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {t.langNames[l]}
            </button>
          ))}
        </div>

        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
        >
          GitHub
        </a>
        <button
          onClick={onToggleDark}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle dark mode"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
}
