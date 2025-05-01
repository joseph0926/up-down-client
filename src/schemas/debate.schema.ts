import { z } from 'zod';
import { ISO, cursorList, apiResponse } from '@/schemas/common.schema';

export const Category = z.object({
  id: z.number().int(),
  name: z.string(),
  slug: z.string(),
  createdAt: ISO,
});

export const DebateListItem = z.object({
  id: z.string().cuid(),
  title: z.string(),
  content: z.string().nullable(),
  status: z.enum(['upcoming', 'ongoing', 'closed']),
  deadline: ISO,
  dDay: z.number().int(),
  proRatio: z.number(),
  conRatio: z.number(),
  commentCount: z.number(),
  viewCount: z.number(),
  hotScore: z.number(),
  thumbUrl: z.string().nullable(),
});

export const DebateList = cursorList(DebateListItem);
export const ResDebateList = apiResponse(DebateList);

export const DebateDetail = DebateListItem.extend({
  startAt: ISO.nullable(),
  createdAt: ISO,
  proCount: z.number(),
  conCount: z.number(),
  smallUrl: z.string().nullable(),
  category: Category,
});
export const ResDebateDetail = apiResponse(DebateDetail);

export const DebateListQuery = z.object({
  sort: z.enum(['hot', 'imminent', 'latest']).default('hot'),
  limit: z.coerce.number().int().min(1).max(50).default(10),
  cursor: z.string().optional(),
});

export const DebateIdParam = z.object({ id: z.string().cuid() });

export const CreateDebateBody = z.object({
  title: z.string().min(3).max(100),
  content: z.string().optional(),
  startAt: ISO.optional(),
  deadline: ISO,
  categoryId: z.number().int().optional(),
});
export const ResCreateDebate = apiResponse(DebateDetail);

export type DebateListDto = z.infer<typeof DebateList>;
export type DebateItemDto = z.infer<typeof DebateListItem>;
export type DebateDetailDto = z.infer<typeof DebateDetail>;
