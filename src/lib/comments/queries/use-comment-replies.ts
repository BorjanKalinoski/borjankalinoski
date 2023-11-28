import { createQuery } from '@tanstack/svelte-query';
import { getRepliesByCommentId } from '$lib/comments/api/get-replies-by-comment-id';

export function useCommentReplies({
  commentId,
  enabled,
}: {
  commentId: string;
  enabled: boolean;
}) {
  return createQuery({
    enabled,
    initialData: [],
    queryFn: async () => {
      return await getRepliesByCommentId(commentId);
    },
    queryKey: ['comments', commentId, 'replies'],
  });
}
