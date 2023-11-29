import type { BlogComment } from '$lib/types/blog-comment';
import ky from 'ky';

export async function dislikeCommentByCommentId(commentId: BlogComment['id']) {
  return await ky.post(`/api/comments/${commentId}/dislike`);
}
