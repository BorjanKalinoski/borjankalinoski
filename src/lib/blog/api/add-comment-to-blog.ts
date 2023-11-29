import type { Blog } from '$lib/types/blog';
import type { BlogComment } from '$lib/types/blog-comment';
import ky from 'ky';

export async function addCommentToBlog({
  blogId,
  content,
}: {
  blogId: Blog['id'];
  content: BlogComment['content'];
}) {
  return await ky
    .post(`/api/blogs/${blogId}/comments`, {
      json: { content },
    })
    .json();
}
