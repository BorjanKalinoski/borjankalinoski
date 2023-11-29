import { createMutation } from '@tanstack/svelte-query';
import { dislikeBlogByBlogId } from '$lib/blog/api/dislike-blog-by-blog-id';
import type { Blog } from '$lib/types/blog';

export function useDislikeBlogMutation({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  return createMutation({
    mutationFn: async (blogId: Blog['id']) => {
      await dislikeBlogByBlogId(blogId);
    },
    onSuccess,
  });
}
