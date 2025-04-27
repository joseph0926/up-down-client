import { QUERY_KEY } from '@/lib/query/query-key';
import { ApiResponse } from '@/schemas/common.schema';
import { DebateList } from '@/schemas/debate.schema';
import { SortType, TDebateList } from '@/types/debate.type';
import {
  useInfiniteQuery,
  InfiniteData,
  useQuery,
  useMutation,
  QueryClient,
} from '@tanstack/react-query';
import { fetchJson } from './fetch-json';
import { API } from './api';
import { addComment, createDebate, fetchDebate } from './debate.service';

const queryClient = new QueryClient();

export function useInfiniteDebates(sort: SortType, limit = 12) {
  return useInfiniteQuery<InfiniteData<TDebateList>, Error>({
    queryKey: QUERY_KEY.DEBATE.ALL(sort, limit),
    queryFn: ({ pageParam }) =>
      fetchJson(
        `${API}/debates?sort=${sort}&limit=${limit}${pageParam ? `&cursor=${pageParam}` : ''}`,
        ApiResponse(DebateList),
      ),
    getNextPageParam: (last) => last.pages[0].nextCursor ?? undefined,
    staleTime: 30_000,
    initialPageParam: undefined,
  });
}

export function useDebate(id: string) {
  return useQuery({
    queryKey: ['debate', id],
    queryFn: () => fetchDebate(id),
    staleTime: 5_000,
  });
}

export function useCreateDebate() {
  return useMutation({
    mutationFn: createDebate,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['debates'] }),
  });
}

export function useAddComment() {
  return useMutation({
    mutationFn: addComment,
    onSuccess: (_, { debateId }) =>
      queryClient.invalidateQueries({ queryKey: ['debate', debateId] }),
  });
}
