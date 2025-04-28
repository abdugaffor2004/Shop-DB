'use client';

import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const RootProvider = ({ children }) => {
  const [client] = useState(new QueryClient());

  return (
    <>
      <MantineProvider
        theme={{
          components: {
            TextInput: {
              styles: () => ({
                input: {
                  backgroundColor: '#2e2e2e',
                  borderColor: '#484848',
                  color: '#c9c9c9',
                },
              }),
            },
            NumberInput: {
              styles: () => ({
                input: {
                  backgroundColor: '#2e2e2e',
                  borderColor: '#484848',
                  color: '#c9c9c9',
                },
              }),
            },
            Combobox: {
              styles: () => ({
                dropdown: { backgroundColor: '#2e2e2e', borderColor: '#484848', color: '#c9c9c9' },
              }),
            },
          },
        }}
      >
        <QueryClientProvider client={client}>
          <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
        </QueryClientProvider>
      </MantineProvider>
    </>
  );
};
