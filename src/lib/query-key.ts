export const QUERY_KEY = {
  DEBATES: {
    ALL: (sort: 'hot' | 'imminent' | 'latest') => ['debates', sort] as const,
    DETAIL: (id?: string) => ['debates', id],
  },
  COMMENTS: {
    ALL: (id?: string) => ['comments', id],
    BEST: (id?: string) => ['bestComment', id],
  },
};
