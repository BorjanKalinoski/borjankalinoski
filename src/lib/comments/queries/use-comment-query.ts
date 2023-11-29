import { createQuery } from '@tanstack/svelte-query';
import { getCommentByCommentId } from '$lib/comments/api/get-comment-by-comment-id';
import type { Blog } from '$lib/types/blog';
import type { BlogComment } from '$lib/types/blog-comment';

export function useCommentQuery({
  commentId,
  initialData,
  blogId,
}: {
  blogId: Blog['id'];
  commentId: BlogComment['id'];
  initialData?: BlogComment;
}) {
  return createQuery({
    initialData: initialData ?? null,
    queryFn: async () => await getCommentByCommentId(commentId),
    queryKey: ['blog', blogId, 'comments', commentId],
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
}
