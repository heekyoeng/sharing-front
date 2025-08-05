// src/app/providers.tsx
'use client';

import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';

export function Providers({ children }: { children: React.ReactNode }) {
  const system = createSystem(defaultConfig);
  return (
    <ChakraProvider value={system}>
      {children}
    </ChakraProvider>
  );
}
