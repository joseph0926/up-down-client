import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { fetchJson } from '@/services/fetch-json';
import { API } from '@/services/api';
import { LiveKeyword, ResLiveKeyword } from '@/schemas/keyword.schema';
import { QUERY_KEY } from '@/lib/query/query-key';

export function useKeywords(): LiveKeyword[] {
  const qc = useQueryClient();

  const { data: list = [] } = useQuery({
    queryKey: QUERY_KEY.KEYWORD.LIVE,
    queryFn: () =>
      fetchJson(`${API}/keywords/live`, ResLiveKeyword).then((r) => r.keywords),
    staleTime: 30_000,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const es = new EventSource(`${API}/keywords/live/stream`);

    es.onmessage = (e) => {
      try {
        const parsed = ResLiveKeyword.parse(JSON.parse(e.data));
        qc.setQueryData(QUERY_KEY.KEYWORD.LIVE, parsed.data?.keywords);
      } catch (err) {
        console.error('[SSE] parse error', err);
      }
    };

    es.onerror = () => es.close();

    return () => es.close();
  }, [qc]);

  return list;
}
