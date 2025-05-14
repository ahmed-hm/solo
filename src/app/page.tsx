import { redirect } from 'next/navigation';
import { fallbackLng } from '@/i18n/i18n-config';

export default function RootPage() {
  // Redirect from / to /en (or whatever the fallback language is)
  redirect(`/${fallbackLng}`);
}