import { createMutation, type MutateOptions } from '@tanstack/svelte-query';
import { likeCommentByCommentId } from '$lib/comments/api/like-comment-by-comment-id';
import type { BlogComment } from '$lib/types/blog-comment';

export function useLikeCommentMutation({
  onSuccess,
}: {
  onSuccess: MutateOptions<unknown, unknown, BlogComment['id']>['onSuccess'];
}) {
  return createMutation<unknown, unknown, BlogComment['id']>({
    mutationFn: async (commentId) => {
      await likeCommentByCommentId(commentId);
    },
    onSuccess,
  });
}
