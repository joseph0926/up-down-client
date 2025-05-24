import { z } from 'zod';

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
