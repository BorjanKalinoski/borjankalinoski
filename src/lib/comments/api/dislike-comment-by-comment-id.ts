import type { BlogComment } from '$lib/types/blog-comment';

export async function dislikeCommentByCommentId(commentId: BlogComment['id']) {
  return await fetch(`/api/comments/${commentId}/dislike`, {
    method: 'POST',
  });
}
