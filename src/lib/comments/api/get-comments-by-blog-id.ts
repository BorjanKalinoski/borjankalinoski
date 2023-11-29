import type { Blog } from '$lib/types/blog';
import type { BlogComment } from '$lib/types/blog-comment';
import ky from 'ky';

export async function getCommentsByBlogId(blogId: Blog['id']) {
  return await ky.get(`/api/blogs/${blogId}/comments`).json<BlogComment[]>();
}
