import { QUERY_KEY } from '@/lib/query/query-key';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { DebateDetailClient } from './debate-detail.client';
import { fetchDebate } from '@/services/debate.service';

type DebateDetailServerProps = {
  debateId: string;
};

export const DebateDetailServer = async ({
  debateId,
}: DebateDetailServerProps) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: QUERY_KEY.DEBATE.DETAIL(debateId),
    queryFn: () => fetchDebate(debateId),
    staleTime: Infinity,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DebateDetailClient debateId={debateId} />
    </HydrationBoundary>
  );
};
