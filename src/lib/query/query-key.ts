import { SortType } from '@/types/debate.type';

const DOMAIN = {
  DEBATE: 'debate',
};

export const QUERY_KEY = {
  DEBATE: {
    DEFAULT: [DOMAIN.DEBATE],
    ALL: (sort: SortType, limit: number) => [DOMAIN.DEBATE, sort, limit],
    DETAIL: (id: string) => [DOMAIN.DEBATE, id],
  },
};
