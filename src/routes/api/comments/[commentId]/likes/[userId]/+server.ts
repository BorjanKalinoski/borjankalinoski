import { database } from '../../../../../../hooks.server';
import type { RequestEvent } from '@sveltejs/kit';

export async function GET({ params: { commentId, userId } }: RequestEvent) {
  const [userHasLikedComment] = await database.query<[boolean]>(
    `
            RETURN count(
                     SELECT *
                     FROM $commentId<-user_likes_comment
                     WHERE in = $userId
                   ) > 0;
        `,
    {
      commentId,
      userId,
    },
  );

  return Response.json(userHasLikedComment);
}
