import { Outlet } from 'react-router';
import { Header } from '@/components/layout/header';
import { LeftSidebar } from '@/components/layout/left-sidebar';
import { RightSidebar } from '@/components/layout/right-sidebar';

export function RootLayout() {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Header />
      <main className="mx-auto grid flex-1 grid-cols-12 gap-6 px-4 py-6 lg:px-8">
        <LeftSidebar className="col-span-3 hidden sm:block xl:col-span-2" />
        <section className="col-span-12 sm:col-span-9 xl:col-span-7">
          <Outlet />
        </section>
        <RightSidebar className="col-span-3 hidden xl:block" />
      </main>
    </div>
  );
}
