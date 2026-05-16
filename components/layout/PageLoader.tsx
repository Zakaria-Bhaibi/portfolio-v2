'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LoadingScreen } from '@/components/ui/loading-screen';

export function PageLoader({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <LoadingScreen key="loader" onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>
      {children}
    </>
  );
}
