import { createQuery } from '@tanstack/svelte-query';
import { getCommentByCommentId } from '$lib/comments/api/get-comment-by-comment-id';
import type { BlogComment } from '$lib/types/blog-comment';

export function useCommentQuery({
  commentId,
  initialData,
}: {
  commentId: string;
  initialData?: BlogComment;
}) {
  return createQuery({
    initialData: initialData ?? null,
    queryFn: async () => {
      return await getCommentByCommentId(commentId);
    },
    queryKey: ['comments', commentId],
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
}
