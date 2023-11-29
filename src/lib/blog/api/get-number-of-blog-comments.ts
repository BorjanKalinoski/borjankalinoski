import type { Blog } from '$lib/types/blog';
import ky from 'ky';

export async function getNumberOfBlogComments(blogId: Blog['id']) {
  return await ky.get(`/api/blogs/${blogId}/comments/count`).json<number>();
}
