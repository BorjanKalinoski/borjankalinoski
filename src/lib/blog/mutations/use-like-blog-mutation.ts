import { createMutation } from '@tanstack/svelte-query';
import { likeBlogByBlogId } from '$lib/blog/api/like-blog-by-blog-id';
import type { Blog } from '$lib/types/blog';

export function useLikeBlogMutation({ onSuccess }: { onSuccess: () => void }) {
  return createMutation({
    mutationFn: async (blogId: Blog['id']) => await likeBlogByBlogId(blogId),
    onSuccess,
  });
}
