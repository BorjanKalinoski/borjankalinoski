import type { BlogComment } from '$lib/types/blog-comment';

export async function getRepliesByCommentId(
  commentId: string,
): Promise<BlogComment[]> {
  const response = await fetch(`/api/comments/${commentId}/replies`, {
    method: 'GET',
  });

  const { replies } = await response.json();

  return replies;
}
