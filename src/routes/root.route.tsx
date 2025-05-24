import type { RouteObject } from 'react-router';
import { HomePage } from '@/pages/root/home.page';
import { RootLayout } from '@/pages/root/root.layout';

export const rootRoutes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
];
