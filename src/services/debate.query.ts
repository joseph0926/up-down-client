import { QUERY_KEY } from '@/lib/query/query-key';
import { SortType, TDebateDetail } from '@/types/debate.type';
import {
  useInfiniteQuery,
  useMutation,
  useSuspenseQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { createDebate, fetchDebate, fetchDebates } from './debate.service';


export function useInfiniteDebates(sort: SortType, limit: number = 10) {
  return useInfiniteQuery({
    queryKey: QUERY_KEY.DEBATE.ALL(sort, limit),
    queryFn: ({ pageParam }: { pageParam: string | undefined }) =>
      fetchDebates({ pageParam, sort, limit }),
    getNextPageParam: (last) => {
      if (!last) return undefined;
      return last.nextCursor ?? undefined;
    },
    staleTime: 30_000,
    initialPageParam: undefined,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}

export function useDebate(id: string) {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.DEBATE.DETAIL(id),
    queryFn: () => fetchDebate(id),
    staleTime: Infinity,
  });
}

export function useCreateDebate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createDebate,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.DEBATE.DEFAULT,
        type: 'all',
      }),
  });
}
