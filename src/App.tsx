import { QueryClientProvider } from '@tanstack/react-query';
import { Analytics } from '@vercel/analytics/react';
import { RouterProvider } from 'react-router';
import { Toaster } from 'sonner';
import { queryClient } from './lib/query-client';
import { router } from './routes';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster richColors closeButton position="bottom-right" />
      <Analytics />
    </QueryClientProvider>
  );
}
