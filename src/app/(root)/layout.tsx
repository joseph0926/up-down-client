import { Sidebar } from '@/components/layout/sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <SidebarProvider>
      <Sidebar />
      <main>{children}</main>
    </SidebarProvider>
  );
}
