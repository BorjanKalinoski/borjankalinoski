import { createQuery } from '@tanstack/svelte-query';
import { getNumberOfLikesByBlogId } from '$lib/blog/api/get-number-of-likes-by-blog-id';

export function useNumberOfBlogLikesQuery(blogId: string) {
  return createQuery({
    queryFn: async () => await getNumberOfLikesByBlogId(blogId),
    queryKey: ['blog', blogId, 'likes'],
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
}
