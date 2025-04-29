import { ApiResponse, OkSchema } from '@/schemas/common.schema';
import {
  DebateList,
  DebateDetail,
  ResAddComment,
  ResDebateList,
} from '@/schemas/debate.schema';
import { TCreateDebate, TCommentBody, SortType } from '@/types/debate.type';
import { fetchJson } from './fetch-json';
import { API, handleError } from './api';

export async function fetchDebates({
  pageParam,
  sort,
  limit = 10,
}: {
  pageParam: string | undefined;
  sort: SortType;
  limit: number;
}) {
  const qs = new URLSearchParams({ sort, limit: String(limit) });
  if (pageParam) qs.append('cursor', pageParam);

  return fetchJson<typeof ResDebateList>(
    `${API}/debates?${qs}`,
    ApiResponse(DebateList),
  );
}

export async function fetchHot(limit = 5, cursor?: string) {
  const qs = new URLSearchParams({ sort: 'hot', limit: String(limit) });
  if (cursor) qs.append('cursor', cursor);

  return fetchJson<typeof DebateList>(
    `${API}/debates?${qs}`,
    ApiResponse(DebateList),
    {
      next: { revalidate: 30, tags: ['debates', 'hot'] },
    },
  ).catch(handleError);
}

export async function fetchDebate(id: string) {
  return fetchJson<typeof DebateDetail>(
    `${API}/debates/${id}`,
    ApiResponse(DebateDetail),
    {
      next: { revalidate: 5, tags: [`debate:${id}`] },
    },
  ).catch(handleError);
}

export async function createDebate(body: TCreateDebate) {
  const data = await fetchJson<typeof OkSchema>(
    `${API}/debates`,
    ApiResponse(OkSchema),
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      cache: 'no-store',
    },
  ).catch(handleError);

  import('next/cache').then((c) => {
    c.revalidateTag('debates');
    c.revalidateTag('hot');
  });
  return data;
}

export async function addComment(body: TCommentBody) {
  const res = await fetchJson(`${API}/debates/comment`, ResAddComment, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    cache: 'no-store',
  }).catch(handleError);

  import('next/cache').then((c) => c.revalidateTag(`debate:${body.debateId}`));
  return res;
}

export async function addVote(body: { debateId: string; side: 'PRO' | 'CON' }) {
  return fetchJson<typeof OkSchema>(
    `${API}/debates/vote`,
    ApiResponse(OkSchema),
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      cache: 'no-store',
    },
  ).catch(handleError);
}
