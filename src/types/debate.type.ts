export type DebateStatus = 'upcoming' | 'ongoing' | 'closed';

export interface Debate {
  id: string;
  title: string;
  content: string | null;
  status: DebateStatus;
  deadline: string;
  dDay: number;
  proRatio: number;
  conRatio: number;
  proCount: number;
  conCount: number;
  commentCount: number;
  viewCount: number;
  hotScore: number;
  thumbUrl: string | null;
}

export interface DebateListRes {
  items: Debate[];
  nextCursor: string | null;
}
