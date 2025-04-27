import {
  DebateSidebarItem,
  DebateList,
  DebateDetail,
  CreateDebateBody,
  CommentBody,
} from '@/schemas/debate.schema';
import { z } from 'zod';

export type SortType = 'hot' | 'imminent' | 'latest';

export type TSidebarItem = z.infer<typeof DebateSidebarItem>;
export type TDebateList = z.infer<typeof DebateList>;
export type TDebateDetail = z.infer<typeof DebateDetail>;
export type TCreateDebate = z.infer<typeof CreateDebateBody>;
export type TCommentBody = z.infer<typeof CommentBody>;
