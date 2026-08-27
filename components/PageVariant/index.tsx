'use client';

import { createContext, useContext } from 'react';

export type PageVariant = 'landing' | 'lead';

const PageVariantContext = createContext<PageVariant>('landing');

export function PageVariantProvider({
  variant,
  children,
}: {
  variant: PageVariant;
  children: React.ReactNode;
}) {
  return (
    <PageVariantContext.Provider value={variant}>
      {children}
    </PageVariantContext.Provider>
  );
}

export function usePageVariant(): PageVariant {
  return useContext(PageVariantContext);
}
