import { database } from '../../../../../hooks.server';

export async function POST({ params: { commentId }, locals: { currentUser } }) {
  await database.query(
    `
        LET $now = time::now();

        RELATE ONLY $userId->user_likes_comment->$commentId
            CONTENT {
                in: $userId,
                out: $commentId,
                createdAt: $now,
                updatedAt: $now
            };
  `,
    {
      commentId,
      userId: currentUser?.id,
    },
  );

  return Response.json({});
}
