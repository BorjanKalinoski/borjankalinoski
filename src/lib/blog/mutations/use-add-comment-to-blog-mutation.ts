import { createMutation, type MutateOptions } from '@tanstack/svelte-query';
import { addCommentToBlog } from '$lib/blog/api/add-comment-to-blog';
import type { Blog } from '$lib/types/blog';
import type { BlogComment } from '$lib/types/blog-comment';

export function useAddCommentToBlogMutation({
  onSuccess,
  onError,
}: {
  onError: MutateOptions<
    unknown,
    unknown,
    {
      blogId: Blog['id'];
      content: BlogComment['content'];
    }
  >['onError'];
  onSuccess: MutateOptions<
    unknown,
    unknown,
    {
      blogId: Blog['id'];
      content: BlogComment['content'];
    }
  >['onSuccess'];
}) {
  return createMutation<
    unknown,
    unknown,
    {
      blogId: Blog['id'];
      content: BlogComment['content'];
    }
  >({
    mutationFn: async (payload) => {
      return await addCommentToBlog(payload);
    },
    onError,
    onSuccess,
  });
}
