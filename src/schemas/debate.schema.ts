import { z } from 'zod';
import type { ApiResult, ApiSuccessRes } from './common.schema';

export const DebateSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string().nullable(),
  status: z.enum(['upcoming', 'ongoing', 'closed']),
  deadline: z.string(),
  dDay: z.number(),
  proRatio: z.number(),
  conRatio: z.number(),
  commentCount: z.number(),
  viewCount: z.number(),
  hotScore: z.number(),
  thumbUrl: z.string().nullable(),
});
export const DebateListSchema = z.object({
  items: z.array(DebateSchema),
  nextCursor: z.string().nullable(),
});
export type DebateListRes = z.infer<typeof DebateListSchema>;

export const DebateCategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  createdAt: z.string().datetime(),
});

export const DebateDetailSchema = z.object({
  id: z.string().regex(/^[cC][^\s-]{8,}$/),
  title: z.string(),
  content: z.string().nullable(),
  status: z.enum(['upcoming', 'ongoing', 'closed']),
  deadline: z.string().datetime(),
  dDay: z.number(),
  proRatio: z.number(),
  conRatio: z.number(),
  commentCount: z.number(),
  viewCount: z.number(),
  hotScore: z.number(),
  thumbUrl: z.string().nullable(),
  startAt: z.string().datetime().nullable(),
  proCount: z.number(),
  conCount: z.number(),
  smallUrl: z.string().nullable(),
  createdAt: z.string().datetime(),
  category: DebateCategorySchema,
});

export type DebateDetailRes = z.infer<typeof DebateDetailSchema>;
export type DebateDetailSuccess = ApiSuccessRes<DebateDetailRes>;
export type DebateDetailResult = ApiResult<DebateDetailRes>;
