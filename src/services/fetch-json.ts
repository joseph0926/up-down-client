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
  const res = await fetch(url, {
    ...init,
    next: { revalidate: 30, ...init.next },
  });
  let json: unknown;
  try {
    json = await res.json();
  } catch {
    throw new ApiError('PARSE', 'Invalid JSON', res.status);
  }

  const parsed = schema.parse(json);
  if (!parsed.success) {
    const parsedFail = parsed as {
      code: 'VALIDATION' | 'NOT_FOUND' | 'FORBIDDEN' | 'CONFLICT' | 'INTERNAL';
      message: string;
      success: false;
      data: null;
    };
    throw new ApiError(parsedFail.code, parsedFail.message, res.status);
  }
  return parsed.data;
}
