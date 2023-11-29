import { createMutation } from '@tanstack/svelte-query';
import { replyToCommentByCommentId } from '$lib/comments/api/reply-to-comment-by-comment-id';
import type { BlogComment } from '$lib/types/blog-comment';

export function useReplyToCommentMutation({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  return createMutation({
    mutationFn: async (payload: {
      blogId: string;
      commentId: BlogComment['id'];
      content: string;
    }) => await replyToCommentByCommentId(payload),
    onSuccess,
  });
}
