import { InitOptions } from 'i18next';

export const fallbackLng = 'en';
export const languages = [fallbackLng, 'ar'];
export const defaultNS = 'common';

// RTL languages
export const rtlLanguages = ['ar'];

// Utility function to check if language is RTL
export function isRTL(lng: string): boolean {
  return rtlLanguages.includes(lng);
}

export function getOptions(lng = fallbackLng, ns = defaultNS): InitOptions {
  return {
    // debug: process.env.NODE_ENV === 'development',
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}