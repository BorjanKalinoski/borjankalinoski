import type { BlogComment } from '$lib/types/blog-comment';

export async function getCommentByCommentId(
  commentId: string,
): Promise<BlogComment> {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: 'GET',
  });

  const comment = await response.json();

  return comment;
}
