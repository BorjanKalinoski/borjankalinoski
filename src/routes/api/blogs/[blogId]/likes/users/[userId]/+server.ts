import { database } from '../../../../../../../hooks.server';
import type { RequestEvent } from '@sveltejs/kit';

export async function GET({ params: { blogId, userId } }: RequestEvent) {
  const [userHasLikedComment] = await database.query<[boolean]>(
    `
        RETURN count(
                    SELECT *
                    FROM likes
                    WHERE in = $userId 
                        AND out = $blogId
        ) > 0;
        `,
    {
      blogId,
      userId,
    },
  );

  return Response.json(userHasLikedComment);
}
