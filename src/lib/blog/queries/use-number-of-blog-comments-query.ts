import { createQuery } from '@tanstack/svelte-query';
import { getNumberOfBlogComments } from '$lib/blog/api/get-number-of-blog-comments';
import type { Blog } from '$lib/types/blog';

export function useNumberOfBlogCommentsQuery({
  blogId,
}: {
  blogId: Blog['id'];
}) {
  return createQuery({
    queryFn: async () => await getNumberOfBlogComments(blogId),
    queryKey: ['blog', blogId, 'comments', 'count'],
  });
}
