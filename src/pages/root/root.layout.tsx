import { Outlet } from 'react-router';
import { Header } from '@/components/layout/header';

export function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Outlet />
    </div>
  );
}
