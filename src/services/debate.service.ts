import { debatePageSuccessSchema } from '@/schemas/debate.schema';
import { apiFetch } from './fetcher';
import { cache } from 'react';
import { buildQuery } from '@/lib/query-params';

type GetAllDebatesProps = {
  page?: number;
  size?: number;
};

export const getAllDebates = cache(
  async ({ page = 1, size = 10 }: GetAllDebatesProps) => {
    const query = buildQuery({ page, size });

    const json = await apiFetch(`/debates${query}`, {
      schema: debatePageSuccessSchema,
      init: {
        method: 'GET',
      },
    });

    return json;
  },
);
