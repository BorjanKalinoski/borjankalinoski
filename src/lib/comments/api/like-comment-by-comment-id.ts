import type { BlogComment } from '$lib/types/blog-comment';

export async function likeCommentByCommentId(commentId: BlogComment['id']) {
  return await fetch(`/api/comments/${commentId}/like`, {
    method: 'POST',
  });
}
