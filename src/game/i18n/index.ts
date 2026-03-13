import type { Language, I18nStrings } from './types';
import { es } from './es';
import { en } from './en';

const translations: Record<Language, I18nStrings> = { es, en };

class I18nManager {
  private language: Language;
  private listeners: Array<(lang: Language) => void> = [];

  constructor() {
    this.language =
      (localStorage.getItem('portfolio-lang') as Language) || 'es';
  }

  get current(): Language {
    return this.language;
  }

  get t(): I18nStrings {
    return translations[this.language];
  }

  setLanguage(lang: Language): void {
    this.language = lang;
    localStorage.setItem('portfolio-lang', lang);
    this.listeners.forEach((cb) => cb(lang));
  }

  toggle(): Language {
    const next = this.language === 'es' ? 'en' : 'es';
    this.setLanguage(next);
    return next;
  }

  onLanguageChange(callback: (lang: Language) => void): () => void {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((cb) => cb !== callback);
    };
  }

  format(template: string, values: Record<string, string | number>): string {
    return Object.entries(values).reduce(
      (str, [key, val]) => str.replace(`{${key}}`, String(val)),
      template
    );
  }
}

export const i18n = new I18nManager();
export type { Language, I18nStrings };
