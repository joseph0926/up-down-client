export class ApiError extends Error {
  constructor(
    public status: number | null,
    public code: string,
    public detail?: unknown,
  ) {
    super(code);
    this.name = 'ApiError';
  }
}
