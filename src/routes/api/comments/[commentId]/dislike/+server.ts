import { database } from '../../../../../hooks.server';

export async function POST({ params: { commentId }, locals: { currentUser } }) {
  await database.query(
    `DELETE $userId->user_likes_comment WHERE out = $commentId`,
    {
      commentId,
      userId: currentUser?.id,
    },
  );

  return Response.json({});
}
