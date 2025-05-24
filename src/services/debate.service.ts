import { parseApiResponse } from '@/schemas/common.schema';
import { DebateListSchema } from '@/schemas/debate.schema';
import type { DebateListRes } from '@/types/debate.type';
import { axiosInstance } from './api';

export type SortType = 'hot' | 'imminent' | 'latest';

interface Params {
  sort?: SortType;
  limit?: number;
  cursor?: string | null;
}

export async function getDebates({
  sort = 'hot',
  limit = 10,
  cursor,
}: Params): Promise<DebateListRes> {
  const { data } = await axiosInstance.get('/debates', {
    params: { sort, limit, cursor },
  });

  const parsed = parseApiResponse(data, DebateListSchema);

  if (!parsed.success) throw new Error(parsed.message);
  return parsed.data;
}
