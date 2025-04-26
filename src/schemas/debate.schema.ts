import { z } from 'zod';
import { apiSuccess, paginated } from './common.schema';

export const debateSummarySchema = z.object({
  id: z.string().cuid(),
  title: z.string(),
  deadline: z.string().datetime(),
  proRatio: z.number().min(0).max(1),
  conRatio: z.number().min(0).max(1),
  thumbUrl: z.string().nullable(),
  smallUrl: z.string().nullable(),
  status: z.enum(['ongoing', 'closed']),
});
export type DebateSummary = z.infer<typeof debateSummarySchema>;

export const commentSchema = z.object({
  id: z.string().cuid(),
  nickname: z.string(),
  content: z.string(),
  side: z.enum(['PRO', 'CON']),
  likes: z.number().int().nonnegative(),
  createdAt: z.string().datetime(),
});
export type CommentDTO = z.infer<typeof commentSchema>;

export const debateDetailSchema = debateSummarySchema.extend({
  content: z.string().nullable(),
  comments: z.array(commentSchema),
});
export type DebateDetail = z.infer<typeof debateDetailSchema>;

export const debateList200Schema = paginated(debateSummarySchema);
export const debatePageSuccessSchema = apiSuccess(debateList200Schema);

export type DebatePageSuccessSchema = z.infer<typeof debatePageSuccessSchema>;
