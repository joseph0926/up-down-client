import { fetchDebates } from '@/services/debate.service';
import { notFound } from 'next/navigation';
import { SidebarDebatesClient } from './sidebar-debates.client';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { QUERY_KEY } from '@/lib/query/query-key';

export const SidebarDebatesServer = async () => {
  const initalData = await fetchDebates({ sort: 'latest', limit: 10 });
  if (!initalData) {
    notFound();
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: QUERY_KEY.DEBATE.ALL('latest', 10),
    initialData: initalData,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SidebarDebatesClient />
    </HydrationBoundary>
  );
};
