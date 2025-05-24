import { z } from 'zod';

export const ApiError = z.object({
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
export const apiSuccessSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.literal(true),
    message: z.string(),
    data: dataSchema,
  });
export function parseApiResponse<T extends z.ZodTypeAny>(
  raw: unknown,
  dataSchema: T,
) {
  const ApiSuccess = apiSuccessSchema(dataSchema);
  return z.discriminatedUnion('success', [ApiSuccess, ApiError]).parse(raw) as
    | ApiSuccessRes<z.infer<T>>
    | ApiErrorRes;
}

export type ApiSuccessRes<T> = {
  success: true;
  message: string;
  data: T;
};
export type ApiErrorRes = z.infer<typeof ApiError>;
export type ApiResult<T> = ApiSuccessRes<T> | ApiErrorRes;
