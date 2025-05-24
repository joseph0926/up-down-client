export const QUERY_KEY = {
  DEBATES: {
    ALL: (sort: 'hot' | 'imminent' | 'latest') => ['debates', sort] as const,
  },
};
