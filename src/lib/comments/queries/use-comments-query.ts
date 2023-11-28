import { createQuery } from '@tanstack/svelte-query';

export function useCommentsQuery() {
  return createQuery({
    queryKey: ['comments'],
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
}
