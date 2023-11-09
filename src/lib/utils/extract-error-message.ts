export function extractErrorMessage(error: unknown): string {
  if (typeof error === 'string') {
    return error;
  }

  return 'Sorry, something went wrong. A report has been sent.';
}
