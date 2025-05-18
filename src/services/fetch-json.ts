import { z, ZodTypeAny } from 'zod';
import { apiResponse } from '@/schemas/common.schema';

export class ApiError extends Error {
  constructor(
    public code: string,
    message: string,
    public status = 500,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function fetchJson<S extends ZodTypeAny>(
  url: string,
  schema: ReturnType<typeof apiResponse<S>>,
  init: RequestInit & { next?: { revalidate?: number; tags?: string[] } } = {},
): Promise<z.infer<S>> {
  let res: Response;

  try {
    res = await fetch(url, {
      ...init,
      next: { revalidate: 30, ...init.next },
    });
  } catch (e) {
    throw new ApiError('NETWORK', (e as Error).message ?? 'Fetch failed', 503);
  }
  let json: unknown;
  try {
    json = await res.json();
  } catch {
    throw new ApiError('PARSE', 'Invalid JSON', res.status);
  }

  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    const { code, message } = parsed.error.flatten().fieldErrors;
    throw new ApiError(
      code?.[0] ?? 'VALIDATION',
      message?.[0] ?? 'Invalid',
      res.status,
    );
  }
  return parsed.data.data;
}
