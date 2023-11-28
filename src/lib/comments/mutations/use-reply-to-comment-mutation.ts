import { createMutation, type MutateOptions } from '@tanstack/svelte-query';
import { replyToCommentByCommentId } from '$lib/comments/api/reply-to-comment-by-comment-id';
import type { BlogComment } from '$lib/types/blog-comment';

export function useReplyToCommentMutation({
  onSuccess,
}: {
  onSuccess: MutateOptions<
    unknown,
    unknown,
    {
      blogId: string;
      commentId: BlogComment['id'];
      content: string;
    }
  >['onSuccess'];
}) {
  return createMutation<
    unknown,
    unknown,
    {
      blogId: string;
      commentId: BlogComment['id'];
      content: string;
    }
  >({
    mutationFn: async (payload) => {
      await replyToCommentByCommentId(payload);
    },
    onSuccess,
  });
}
