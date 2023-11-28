import { database } from '../../../../../hooks.server';
import type { BlogComment } from '$lib/types/blog-comment';

export async function GET({ params: { commentId }, locals: { currentUser } }) {
  const [replies] = await database.query<[BlogComment[]]>(
    `
      SELECT
        *,
        count(id<-user_likes_comment) as numberOfLikes,
        in.* as author,
        (id<-user_likes_comment.in CONTAINS $userId) as userHasLikedComment,
        count(id<-comment_replies_to) as numberOfReplies
      FROM $commentId<-comment_replies_to.in
      ORDER BY createdAt DESC
  `,
    {
      commentId,
      userId: currentUser?.id,
    },
  );

  return Response.json({
    replies,
  });
}
