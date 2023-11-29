import { database } from '../../../../hooks.server';
import type { RequestEvent } from '@sveltejs/kit';

export async function GET({
  params: { commentId },
  locals: { currentUser },
}: RequestEvent) {
  const [comment] = await database.query(
    `
        SELECT 
            *,
            count(id<-user_likes_comment) as numberOfLikes,
            (id<-user_likes_comment.in CONTAINS $userId) as userHasLikedComment,
            count(id<-comment_replies_to) as numberOfReplies,
            (in.*) as author
        FROM ONLY $commentId
    `,
    {
      commentId,
      userId: currentUser?.id,
    },
  );

  return Response.json(comment);
}
