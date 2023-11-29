import ky from 'ky';

export async function replyToCommentByCommentId(payload: {
  blogId: string;
  commentId: string;
  content: string;
}) {
  return await ky.post(`/api/comments/${payload.commentId}/reply`, {
    json: payload,
  });
}
