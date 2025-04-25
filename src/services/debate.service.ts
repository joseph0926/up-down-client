import { debatePageSuccessSchema } from '@/schemas/debate.schema';
import { apiFetch } from './fetcher';

export const getAllDebate = async () => {
  const json = await apiFetch('/debates', {
    schema: debatePageSuccessSchema,
    init: {
      method: 'GET',
    },
  });

  return json;
};
