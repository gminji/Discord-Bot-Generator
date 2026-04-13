import { useLangStore } from '../store/langStore';
import { en } from './en';
import { ja } from './ja';
import { ko } from './ko';
import type { Translations } from './types';

const translations: Record<string, Translations> = { en, ja, ko };

export function useTranslation() {
  const { lang, setLang } = useLangStore();
  return { t: translations[lang], lang, setLang };
}

export type { Translations };
export type { Lang } from '../store/langStore';
