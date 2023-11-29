import { createQuery } from '@tanstack/svelte-query';
import { getUserHasLikedBlog } from '$lib/blog/api/get-user-has-liked-blog';
import type { Blog } from '$lib/types/blog';
import type { User } from '$lib/types/user';

export function useUserHasLikedBlogQuery({
  blogId,
  userId,
}: {
  blogId: Blog['id'];
  userId: User['id'];
}) {
  return createQuery({
    queryFn: async () => await getUserHasLikedBlog({ blogId, userId }),
    queryKey: ['blog', blogId, 'likes', 'user', userId],
  });
}
