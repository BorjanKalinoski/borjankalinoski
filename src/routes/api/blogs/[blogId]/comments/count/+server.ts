import { database } from '../../../../../../hooks.server';
import type { RequestEvent } from '@sveltejs/kit';

export async function GET({ params: { blogId } }: RequestEvent) {
  const [response] = await database.query<[{ numberOfBlogComments: number }]>(
    `
        SELECT count(id<-user_comments_on_blog) as numberOfBlogComments
        FROM ONLY $blogId
    `,
    {
      blogId,
    },
  );

  return Response.json(response.numberOfBlogComments);
}
