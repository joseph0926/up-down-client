import { Logo } from '../common/logo';
import { Suspense } from 'react';
import { getAllDebates } from '@/services/debate.service';
import { Sidebar } from '../ui/sidebar';
import { SidebarDebateList } from './debate-list';
import { DebateCardSkeleton } from './debate-skeleton';

export const SidebarWrapper = () => {
  const allDebatePromise = getAllDebates({});

  return (
    <Sidebar width={255} showOverlay={false} className="pl-2">
      <Logo />
      <Suspense fallback={<DebateCardSkeleton />}>
        <SidebarDebateList allDebatePromise={allDebatePromise} />
      </Suspense>
    </Sidebar>
  );
};
