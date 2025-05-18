import NotFoundPage from '@/components/NotFoundPage';
import { fallbackLng } from '@/i18n/i18n-config';

export default function RootNotFound() {
  // Render the 404 page directly instead of redirecting
  return <NotFoundPage lng={fallbackLng} />;
}