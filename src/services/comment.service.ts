import { fetchJson } from './fetch-json';
import { API } from './api';
import {
  ResCommentList,
  ResCommentOk,
  CommentBody,
} from '@/schemas/comment.schema';
import { z } from 'zod';

export async function fetchComments(
  debateId: string,
  cursor?: string,
  limit = 20,
) {
  const qs = new URLSearchParams({ limit: String(limit) });
  if (cursor) qs.append('cursor', cursor);

  return fetchJson(
    `${API}/debates/${debateId}/comments?${qs}`,
    ResCommentList,
    { next: { revalidate: 10, tags: [`comments:${debateId}`] } },
  );
}

export async function addComment(body: z.infer<typeof CommentBody>) {
  return fetchJson(`${API}/comments`, ResCommentOk, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    cache: 'no-store',
  });
}
