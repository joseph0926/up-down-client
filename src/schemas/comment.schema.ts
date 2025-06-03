import { z } from 'zod';
import {
  type ApiResult,
  type ApiSuccessRes,
  parseApiResponse,
} from '@/schemas/common.schema';

export const CommentSchema = z.object({
  id: z.string().regex(/^[cC][^\s-]{8,}$/),
  debateId: z.string().regex(/^[cC][^\s-]{8,}$/),
  nickname: z.string(),
  content: z.string(),
  side: z.enum(['PRO', 'CON']),
  likes: z.number(),
  liked: z.boolean().default(false),
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

export const CreateCommentBodySchema = z.object({
  debateId: z.string().regex(/^[cC][^\s-]{8,}$/),
  side: z.enum(['PRO', 'CON']),
  nickname: z.string().min(1).max(20),
  content: z.string().min(1).max(300),
});
export type CreateCommentPayload = z.infer<typeof CreateCommentBodySchema>;
export type CreateCommentRes = ApiSuccessRes<{ ok: true }>;
export type CreateCommentResult = ApiResult<{ ok: true }>;

export const parseCreateCommentResponse = (
  data: unknown,
): CreateCommentResult =>
  parseApiResponse(data, z.object({ ok: z.literal(true) }));

export const LikeCommentSuccessSchema = z.object({
  liked: z.boolean(),
});
export type LikeCommentRes = ApiSuccessRes<{ liked: boolean }>;
export type LikeCommentResult = ApiResult<{ liked: boolean }>;

export const parseLikeCommentResponse = (data: unknown): LikeCommentResult =>
  parseApiResponse(data, LikeCommentSuccessSchema);
