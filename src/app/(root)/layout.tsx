import { Sidebar } from '@/components/layout/sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <SidebarProvider>
      <Sidebar />
      <main className="w-full overflow-x-hidden">
        <SidebarTrigger className="fixed" />
        {children}
      </main>
    </SidebarProvider>
  );
}
