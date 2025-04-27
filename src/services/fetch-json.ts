import { z, ZodType } from 'zod';
import { ApiResponseT } from '@/schemas/common.schema';

export async function fetchJson<S extends z.ZodTypeAny>(
  url: string,
  schema: ZodType<ApiResponseT<S>>,
  init?: RequestInit,
): Promise<z.infer<S>> {
  const res = await fetch(url, { next: { revalidate: 30 }, ...init });
  const json = await res.json();
  const parsed = schema.parse(json);

  if (!parsed.success) {
    throw new Error(parsed.message);
  }

  return parsed.data;
}
