import { database } from '../../../../../hooks.server';
import type { RequestEvent } from '@sveltejs/kit';

export async function POST({
  locals: { currentUser },
  params: { blogId },
}: RequestEvent) {
  await database.query(
    `
        RELATE ONLY $userId->likes->$blogId
      `,
    {
      blogId,
      userId: currentUser?.id,
    },
  );

  return Response.json({});
}
