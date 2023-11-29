import type { Blog } from '$lib/types/blog';
import type { User } from '$lib/types/user';
import ky from 'ky';

export async function getUserHasLikedBlog({
  blogId,
  userId,
}: {
  blogId: Blog['id'];
  userId: User['id'];
}): Promise<boolean> {
  return await ky
    .get(`/api/blogs/${blogId}/likes/users/${userId}`)
    .json<boolean>();
}
