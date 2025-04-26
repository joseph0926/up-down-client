import { z } from 'zod';
import { ApiError } from './api-error';
import { env } from '@/lib/env';

export async function apiFetch<T>(
  path: string,
  {
    schema,
    init,
    cache = 'force-cache',
    tags,
    revalidate = 60,
  }: {
    schema?: z.ZodType<T>;
    init?: RequestInit;
    cache?: RequestCache | 'no-store';
    tags?: string[];
    revalidate?: number | 0;
  } = {},
): Promise<T> {
  try {
    const res = await fetch(`${env.NEXT_PUBLIC_SERVER_URL}${path}`, {
      ...init,
      cache,
      next: { revalidate, tags },
    });

    if (!res.ok) {
      let body: unknown;
      try {
        body = await res.json();
      } catch (e) {
        console.warn('Non-JSON error body', e);
      }
      const code =
        typeof body === 'object' && body && 'code' in body
          ? body.code
          : `HTTP_${res.status}`;
      throw new ApiError(res.status, String(code), body);
    }

    const json = await res.json();

    if (schema) {
      const parsed = schema.safeParse(json);
      if (!parsed.success) {
        throw new ApiError(
          null,
          'INVALID_SCHEMA',
          parsed.error.flatten().fieldErrors,
        );
      }
      return parsed.data;
    }

    return json as T;
  } catch (err) {
    if (err instanceof ApiError) throw err;
    if (err instanceof z.ZodError)
      throw new ApiError(null, 'INVALID_SCHEMA', err.errors);
    if ((err as Error).name === 'AbortError')
      throw new ApiError(null, 'ABORTED', err);

    throw new ApiError(null, 'NETWORK', err);
  }
}
