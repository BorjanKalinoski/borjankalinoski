import { createQuery } from '@tanstack/svelte-query';
import { getCommentsByBlogId } from '$lib/comments/api/get-comments-by-blog-id';
import type { Blog } from '$lib/types/blog';
import type { BlogComment } from '$lib/types/blog-comment';

export function useCommentsQuery(blogId: Blog['id']) {
  return createQuery<unknown, unknown, BlogComment[]>({
    initialData: [],
    queryFn: async () => await getCommentsByBlogId(blogId),
    queryKey: ['blog', blogId, 'comments'],
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
}
