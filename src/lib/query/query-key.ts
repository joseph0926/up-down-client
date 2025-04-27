import { SortType } from '@/types/debate.type';

const DOMAIN = {
  DEBATE: 'debate',
};

export const QUERY_KEY = {
  DEBATE: {
    ALL: (sort: SortType, limit: number) => [DOMAIN.DEBATE, sort, limit],
  },
};
