import { database } from '../../../../../hooks.server';
import type { RequestEvent } from '@sveltejs/kit';

export async function POST({
  params: { blogId },
  locals: { currentUser },
}: RequestEvent) {
  const userId = currentUser?.id;

  await database.query(`DELETE $userId->likes WHERE out = $blogId`, {
    blogId,
    userId,
  });

  return Response.json({});
}
