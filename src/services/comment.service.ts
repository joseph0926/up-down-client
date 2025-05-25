import {
  type CommentList,
  CommentListSchema,
  type CreateCommentPayload,
  type CreateCommentRes,
  parseCreateCommentResponse,
} from '@/schemas/comment.schema';
import { parseApiResponse } from '@/schemas/common.schema';
import { axiosInstance } from './api';

export interface GetCommentsParams {
  debateId?: string;
  cursor?: string | null;
  limit?: number;
}

export async function getComments({
  debateId,
  cursor,
  limit = 20,
}: GetCommentsParams): Promise<CommentList> {
  const { data } = await axiosInstance.get(`/debates/${debateId}/comments`, {
    params: { cursor, limit },
  });

  const parsed = parseApiResponse(data, CommentListSchema);
  if (!parsed.success) throw new Error(parsed.message);
  return parsed.data;
}

export async function createComment(
  payload: CreateCommentPayload,
): Promise<CreateCommentRes> {
  const { data } = await axiosInstance.post('/comments', payload);

  const parsed = parseCreateCommentResponse(data);
  if (!parsed.success) throw new Error(parsed.message);
  return parsed;
}
