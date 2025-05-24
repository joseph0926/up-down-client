export type DebateStatus = 'ongoing' | 'closed';

export type Debate = {
  id: string;
  title: string;
  deadline: string;
  proRatio: number;
  conRatio: number;
  thumbUrl: string | null;
  smallUrl: string | null;
  status: DebateStatus;
};
