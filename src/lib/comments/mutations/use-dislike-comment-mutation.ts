import { createMutation, type MutateOptions } from '@tanstack/svelte-query';
import { dislikeCommentByCommentId } from '$lib/comments/api/dislike-comment-by-comment-id';
import type { BlogComment } from '$lib/types/blog-comment';

export function useDislikeCommentMutation({
  onSuccess,
}: {
  onSuccess: MutateOptions<unknown, unknown, BlogComment['id']>['onSuccess'];
}) {
  return createMutation<unknown, unknown, BlogComment['id']>({
    mutationFn: async (commentId) => {
      await dislikeCommentByCommentId(commentId);
    },
    onSuccess,
  });
}
