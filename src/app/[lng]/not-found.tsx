'use client';

import { useParams } from 'next/navigation';
import NotFoundPage from '@/components/NotFoundPage';

export default function LngNotFound() {
  // Get language from URL params
  const params = useParams();
  const lng = params.lng as string;
  
  return <NotFoundPage lng={lng} />;
}