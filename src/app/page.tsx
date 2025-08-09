'use client';

import dynamic from 'next/dynamic';

const LandingPageModernizer = dynamic(() => import('@/components/LandingPageModernizer'), {
  ssr: false,
});

export default function Home() {
  return <LandingPageModernizer />;
}
