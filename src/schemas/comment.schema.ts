import { z } from 'zod';
import type { ApiResult, ApiSuccessRes } from '@/schemas/common.schema';

export const CommentSchema = z.object({
  id: z.string().regex(/^[cC][^\s-]{8,}$/),
  debateId: z.string().regex(/^[cC][^\s-]{8,}$/),
  nickname: z.string(),
  content: z.string(),
  side: z.enum(['PRO', 'CON']),
  likes: z.number(),
  createdAt: z.string().datetime(),
});
export type Comment = z.infer<typeof CommentSchema>;

export const CommentListSchema = z.object({
  items: z.array(CommentSchema),
  nextCursor: z.string().nullable(),
});
export type CommentList = z.infer<typeof CommentListSchema>;
export type CommentListSuccess = ApiSuccessRes<CommentList>;
export type CommentListResult = ApiResult<CommentList>;
