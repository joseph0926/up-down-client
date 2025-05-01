import { z, ZodTypeAny } from 'zod';

export const ISO = z.string().datetime();

export const cursorList = <S extends ZodTypeAny>(item: S) =>
  z.object({
    items: z.array(item),
    nextCursor: z.string().nullable(),
  });

export const apiSuccess = <S extends ZodTypeAny>(data: S) =>
  z.object({
    success: z.literal(true),
    data,
    message: z.string().optional(),
  });

export const apiFail = z.object({
  success: z.literal(false),
  code: z.enum([
    'VALIDATION',
    'NOT_FOUND',
    'FORBIDDEN',
    'CONFLICT',
    'INTERNAL',
  ]),
  message: z.string(),
  data: z.null(),
});

export const apiResponse = <S extends ZodTypeAny>(schema: S) =>
  z.union([apiSuccess(schema), apiFail]);

export type ApiResponse<T extends ZodTypeAny> = z.infer<
  ReturnType<typeof apiResponse<T>>
>;
export type CursorList<T extends ZodTypeAny> = z.infer<
  ReturnType<typeof cursorList<T>>
>;
