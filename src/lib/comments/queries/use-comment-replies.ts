import { createQuery } from '@tanstack/svelte-query';
import { getRepliesByCommentId } from '$lib/comments/api/get-replies-by-comment-id';
import type { Blog } from '$lib/types/blog';
import type { BlogComment } from '$lib/types/blog-comment';

export function useCommentReplies({
  commentId,
  enabled,
  blogId,
}: {
  blogId: Blog['id'];
  commentId: BlogComment['id'];
  enabled: boolean;
}) {
  return createQuery({
    enabled,
    initialData: [],
    queryFn: async () => await getRepliesByCommentId(commentId),
    queryKey: ['blog', blogId, 'comments', commentId, 'replies'],
  });
}
