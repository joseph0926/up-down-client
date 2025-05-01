import {
  useInfiniteQuery,
  useMutation,
  QueryClient,
} from '@tanstack/react-query';
import { fetchComments, addComment } from './comment.service';
import { QUERY_KEY } from '@/lib/query/query-key';
import { CommentListDto } from '@/schemas/comment.schema';

const qc = new QueryClient();

export function useComments(debateId: string, side: 'PRO' | 'CON', limit = 20) {
  return useInfiniteQuery({
    queryKey: QUERY_KEY.COMMENT.ALL(debateId, side),
    queryFn: ({ pageParam }) => fetchComments(debateId, pageParam, limit),
    getNextPageParam: (last: CommentListDto) => last.nextCursor ?? undefined,
    initialPageParam: undefined,
    staleTime: 10_000,
    select: (data) => ({
      ...data,
      pages: data.pages.map((p) => ({
        ...p,
        items: p.items.filter((c) => c.side === side),
      })),
    }),
  });
}

export function useAddComment() {
  return useMutation({
    mutationFn: addComment,
    onSuccess: (_res, variables) => {
      qc.invalidateQueries({
        queryKey: QUERY_KEY.COMMENT.ALL(variables.debateId, variables.side),
      });
    },
  });
}
