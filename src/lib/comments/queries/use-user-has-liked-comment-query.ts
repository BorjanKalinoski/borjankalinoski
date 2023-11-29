import { createQuery } from '@tanstack/svelte-query';
import type { Blog } from '$lib/types/blog';
import type { BlogComment } from '$lib/types/blog-comment';
import type { User } from '$lib/types/user';
import ky from 'ky';

export function useUserHasLikedCommentQuery({
  blogId,
  commentId,
  userId,
}: {
  blogId: Blog['id'];
  commentId: BlogComment['id'];
  userId: User['id'];
}) {
  return createQuery({
    queryFn: async () =>
      await ky.get(`/api/comments/${commentId}/likes/${userId}`).json(),
    queryKey: ['blog', blogId, 'comments', commentId, 'likes', userId],
  });
}
