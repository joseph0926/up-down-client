import { env } from '@/lib/env';

export const API = env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:4000';

export function handleError(err: unknown): never {
  if (err instanceof Error) throw err;
  throw new Error('알 수 없는 오류가 발생했습니다.');
}
