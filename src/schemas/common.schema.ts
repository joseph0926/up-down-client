import { z } from 'zod';

export const ApiSuccess = <T extends z.ZodTypeAny>(data: T) =>
  z.object({
    data,
    success: z.literal(true),
    message: z.string().optional(),
  });

export const ApiFail = z.object({
  data: z.null(),
  success: z.literal(false),
  message: z.string(),
});

export const ApiResponse = <T extends z.ZodTypeAny>(data: T) =>
  z.union([ApiSuccess(data), ApiFail]);

export type ApiSuccess<T extends z.ZodTypeAny> = z.infer<
  ReturnType<typeof ApiSuccess<T>>
>;
export type ApiFail = z.infer<typeof ApiFail>;
export type ApiResponseT<T extends z.ZodTypeAny> = ApiSuccess<T> | ApiFail;

export const CursorList = <T extends z.ZodTypeAny>(item: T) =>
  z.object({
    items: z.array(item),
    nextCursor: z.string().nullable(),
  });
export type CursorListT<T extends z.ZodTypeAny> = z.infer<
  ReturnType<typeof CursorList<T>>
>;

export const OkSchema = z.object({ ok: z.literal(true) });
export type TOk = z.infer<typeof OkSchema>;
