import type { BlogComment } from '$lib/types/blog-comment';
import ky from 'ky';

export async function getCommentByCommentId(
  commentId: string,
): Promise<BlogComment> {
  return await ky.get(`/api/comments/${commentId}`).json<BlogComment>();
}
