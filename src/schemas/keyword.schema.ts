import { z } from 'zod';
import { apiResponse } from './common.schema';

const LiveKeyword = z.object({
  word: z.string(),
  index: z.number().int().min(0).max(100),
});

export const ResLiveKeyword = apiResponse(
  z.object({ keywords: z.array(LiveKeyword) }),
);
export type LiveKeyword = z.infer<typeof LiveKeyword>;
