import type { BlogComment } from '$lib/types/blog-comment';
import ky from 'ky';

export async function getRepliesByCommentId(
  commentId: string,
): Promise<BlogComment[]> {
  return await ky
    .get(`/api/comments/${commentId}/replies`)
    .json<BlogComment[]>();
}
