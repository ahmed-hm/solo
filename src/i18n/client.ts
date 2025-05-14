// filepath: /home/node/workspace/solo/src/i18n/client.ts
'use client';

import i18next from 'i18next';
import { initReactI18next, useTranslation as useTranslationOrg } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { getOptions, isRTL } from './i18n-config';
import { useEffect, useState } from 'react';

i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) => import(`../../public/locales/${language}/${namespace}.json`)
    )
  )
  .init({
    ...getOptions(),
    lng: undefined, // Let detect the language on client side
    detection: {
      order: ['path', 'htmlTag', 'cookie', 'navigator'],
    },
  });

export function useTranslation(lng: string, ns?: string, options = {}) {
  if (i18next.resolvedLanguage !== lng) i18next.changeLanguage(lng);
  return useTranslationOrg(ns, options);
}

// Custom hook to check if the current language is RTL
export function useIsRTL(lng: string) {
  const [isRtl, setIsRtl] = useState(isRTL(lng));

  useEffect(() => {
    setIsRtl(isRTL(lng));
  }, [lng]);

  return isRtl;
}
