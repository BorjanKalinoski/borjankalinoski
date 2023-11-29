import { database } from '../../../../../hooks.server';
import type { RequestEvent } from '@sveltejs/kit';

export async function POST({
  params: { commentId },
  locals: { currentUser },
}: RequestEvent) {
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
