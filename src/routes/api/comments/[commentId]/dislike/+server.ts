import { database } from '../../../../../hooks.server';
import type { RequestEvent } from '@sveltejs/kit';

export async function POST({
  params: { commentId },
  locals: { currentUser },
}: RequestEvent) {
  await database.query(
    `DELETE $userId->user_likes_comment WHERE out = $commentId`,
    {
      commentId,
      userId: currentUser?.id,
    },
  );

  return Response.json({});
}
