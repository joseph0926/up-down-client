import { QUERY_KEY } from '@/lib/query/query-key';
import { SortType, TDebateDetail } from '@/types/debate.type';
import {
  useInfiniteQuery,
  useQuery,
  useMutation,
  QueryClient,
} from '@tanstack/react-query';
import {
  addComment,
  addVote,
  createDebate,
  fetchDebate,
  fetchDebates,
} from './debate.service';

const queryClient = new QueryClient();

export function useInfiniteDebates(sort: SortType, limit: number = 10) {
  return useInfiniteQuery({
    queryKey: QUERY_KEY.DEBATE.ALL(sort, limit),
    queryFn: ({ pageParam }: { pageParam: string | undefined }) =>
      fetchDebates({ pageParam, sort, limit }),
    getNextPageParam: (last) => last.nextCursor ?? undefined,
    staleTime: 30_000,
    initialPageParam: undefined,
  });
}

export function useDebate(id: string) {
  return useQuery({
    queryKey: QUERY_KEY.DEBATE.DETAIL(id),
    queryFn: () => fetchDebate(id),
    staleTime: 5_000,
  });
}

export function useCreateDebate() {
  return useMutation({
    mutationFn: createDebate,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.DEBATE.DEFAULT,
        type: 'all',
      }),
  });
}

export function useAddComment() {
  return useMutation({
    mutationFn: addComment,
    onSuccess: (_, { debateId }) =>
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.DEBATE.DETAIL(debateId),
      }),
  });
}

export function useAddVote() {
  return useMutation({
    mutationFn: addVote,
    onMutate: async ({ debateId, side }) => {
      await queryClient.cancelQueries({
        queryKey: QUERY_KEY.DEBATE.DETAIL(debateId),
      });

      const prev = queryClient.getQueryData<TDebateDetail>([
        'debate',
        debateId,
      ]);
      if (prev) {
        const delta =
          side === 'PRO'
            ? { proCount: prev.proCount + 1 }
            : { conCount: prev.conCount + 1 };
        queryClient.setQueryData<TDebateDetail>(
          QUERY_KEY.DEBATE.DETAIL(debateId),
          {
            ...prev,
            ...delta,
          },
        );
      }
      return { prev };
    },
    onError: (_err, { debateId }, ctx) => {
      if (ctx?.prev)
        queryClient.setQueryData(QUERY_KEY.DEBATE.DETAIL(debateId), ctx.prev);
    },
    onSettled: (_data, _err, { debateId }) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.DEBATE.DETAIL(debateId),
      });
    },
  });
}
