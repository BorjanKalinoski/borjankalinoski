export function extractErrorMessage(error: unknown): string {
  if (typeof error === 'string') {
    return error;
  }

  if ((error as Error)?.message) {
    return (error as Error).message;
  }

  return 'Sorry, something went wrong. A report has been sent.';
}
