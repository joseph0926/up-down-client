import { debatePageSuccessSchema } from '@/schemas/debate.schema';
import { apiFetch } from './fetcher';
import { cache } from 'react';
import { buildQuery } from '@/lib/query-params';

type GetAllDebatesProps = {
  page?: number;
  size?: number;
};

export const getAllDebates = cache(async (params: GetAllDebatesProps) => {
  const query = buildQuery(params);

  const json = await apiFetch(`/debates${query}`, {
    schema: debatePageSuccessSchema,
    init: {
      method: 'GET',
    },
  });

  return json;
});
