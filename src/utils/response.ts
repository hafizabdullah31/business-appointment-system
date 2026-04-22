export const successResponse = <T = unknown>(message: string, data: T | null = null) => ({
  success: true,
  message,
  data,
});

export const errorResponse = (message: string, errors: unknown[] = []) => ({
  success: false,
  message,
  errors,
});
