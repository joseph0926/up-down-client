import { SortType } from '@/types/debate.type';

const DOMAIN = {
  DEBATE: 'debate',
  COMMENT: 'comment',
  KEYWORD: 'keyword',
};

export const QUERY_KEY = {
  DEBATE: {
    DEFAULT: [DOMAIN.DEBATE],
    ALL: (sort: SortType, limit: number) => [DOMAIN.DEBATE, sort, limit],
    DETAIL: (id: string) => [DOMAIN.DEBATE, id],
  },
  COMMENT: {
    ALL: (id: string, side: 'PRO' | 'CON') =>
      [DOMAIN.COMMENT, id, side] as const,
  },
  KEYWORD: {
    LIVE: [DOMAIN.KEYWORD, 'live'],
  },
};
