import { Outlet } from 'react-router';
import { Header } from '@/components/layout/header';

export function RootLayout() {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Header />
      <Outlet />
    </div>
  );
}
