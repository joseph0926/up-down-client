import { Logo } from '../common/logo';
import { Suspense } from 'react';
import { getAllDebates } from '@/services/debate.service';
import { Sidebar } from '../ui/sidebar';
import { SidebarDebateList } from './debate-list';
import { DebateListSkeleton } from './debate-skeleton';

const PAGE_SIZE = 10;

export const SidebarWrapper = () => {
  const allDebatePromise = getAllDebates({ page: 1, size: PAGE_SIZE });

  return (
    <Sidebar isOpen width={255} showOverlay={false} className="pl-2">
      <Logo />
      <Suspense fallback={<DebateListSkeleton />}>
        <SidebarDebateList allDebatePromise={allDebatePromise} />
      </Suspense>
    </Sidebar>
  );
};
