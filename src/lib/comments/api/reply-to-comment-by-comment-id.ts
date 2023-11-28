export async function replyToCommentByCommentId(payload: {
  blogId: string;
  commentId: string;
  content: string;
}) {
  return await fetch(`/api/comments/${payload.commentId}/reply`, {
    body: JSON.stringify(payload),
    method: 'POST',
  });
}
