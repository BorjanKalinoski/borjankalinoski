import { database } from '../../../../../hooks.server';
import type { RequestEvent } from '@sveltejs/kit';

export async function GET({ params: { blogId } }: RequestEvent) {
  const [response] = await database.query<[[{ numberOfBlogLikes: number }]]>(
    `
    SELECT count(id) as numberOfBlogLikes
    FROM $blogId<-likes`,
    {
      blogId,
    },
  );

  const numberOfBlogLikes = !response[0] ? 0 : response[0].numberOfBlogLikes;

  return Response.json(numberOfBlogLikes);
}
