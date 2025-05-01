import { z } from 'zod';
import { fetchJson } from './fetch-json';
import { API } from './api';
import {
  ResDebateDetail,
  ResDebateList,
  CreateDebateBody,
  ResCreateDebate,
} from '@/schemas/debate.schema';

export async function fetchDebates(opts: {
  sort: 'hot' | 'imminent' | 'latest';
  limit: number;
  pageParam?: string;
}) {
  const { sort, limit, pageParam } = opts;
  const qs = new URLSearchParams({ sort, limit: String(limit) });
  if (pageParam) qs.append('cursor', pageParam);

  return fetchJson(`${API}/debates?${qs}`, ResDebateList);
}

export async function fetchHot(limit = 5, cursor?: string) {
  const qs = new URLSearchParams({ sort: 'hot', limit: String(limit) });
  if (cursor) qs.append('cursor', cursor);

  return fetchJson(`${API}/debates?${qs}`, ResDebateList, {
    next: { revalidate: 30, tags: ['debates', 'hot'] },
  });
}

export async function fetchDebate(id: string) {
  return fetchJson(`${API}/debates/${id}`, ResDebateDetail, {
    next: { revalidate: 5, tags: [`debate:${id}`] },
  });
}

export async function createDebate(body: z.infer<typeof CreateDebateBody>) {
  const data = await fetchJson(`${API}/debates`, ResCreateDebate, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    cache: 'no-store',
  });

  import('next/cache').then((c) => {
    c.revalidateTag('debates');
    c.revalidateTag('hot');
  });
  return data;
}
