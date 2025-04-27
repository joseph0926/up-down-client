import { z } from 'zod';
import { ApiSuccess, CursorList } from './common.schema';

export const DebateSidebarItem = z.object({
  id: z.string(),
  title: z.string(),
  status: z.enum(['upcoming', 'ongoing', 'closed']),
  deadline: z.string().datetime(),
  dDay: z.number().int(),
  proRatio: z.number(),
  conRatio: z.number(),
  commentCount: z.number(),
  viewCount: z.number(),
  hotScore: z.number(),
  thumbUrl: z.string().nullable(),
});

export const DebateList = z.object({
  items: z.array(DebateSidebarItem),
  nextCursor: z.string().nullable(),
});

export const DebateDetail = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string().nullable(),
  status: z.enum(['upcoming', 'ongoing', 'closed']),
  startAt: z.string().datetime().nullable(),
  deadline: z.string().datetime(),
  proCount: z.number(),
  conCount: z.number(),
  viewCount: z.number(),
  hotScore: z.number(),
});

export const CreateDebateBody = z.object({
  title: z.string().min(3),
  content: z.string().optional(),
  startAt: z.string().datetime().optional(),
  deadline: z.string().datetime(),
  categoryId: z.number().int().optional(),
});

export const CommentBody = z.object({
  debateId: z.string(),
  side: z.enum(['PRO', 'CON']),
  nickname: z.string().min(1),
  content: z.string().min(1),
});

export const ResDebateList = CursorList(DebateSidebarItem);
export const ResDebateDetail = ApiSuccess(DebateDetail);
export const ResCreateDebate = ApiSuccess(DebateDetail);
export const ResAddComment = ApiSuccess(z.object({ ok: z.literal(true) }));
