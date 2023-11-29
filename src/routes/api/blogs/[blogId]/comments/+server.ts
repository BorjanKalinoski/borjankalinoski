import { database } from '../../../../../hooks.server';
import type { RequestEvent } from '@sveltejs/kit';
import type { BlogComment } from '$lib/types/blog-comment';

export async function GET({ params: { blogId } }: RequestEvent) {
  const [blogComments] = await database.query<[BlogComment[]]>(
    `
    SELECT 
        *,
        count(id<-user_likes_comment.*) as numberOfLikes,
        in.* as author,
        count(id<-comment_replies_to) as numberOfReplies
    FROM $blogId<-user_comments_on_blog
    WHERE !id->comment_replies_to
    ORDER BY createdAt DESC
    `,
    {
      blogId,
    },
  );

  return Response.json(blogComments);
}

export async function POST({
  locals: { currentUser },
  params: { blogId },
  request,
}: RequestEvent) {
  const userId = currentUser?.id;

  const { content } = await request.json();

  await database.query(
    `
     LET $now = time::now();
     
     RELATE $userId->user_comments_on_blog->$blogId
        CONTENT {
            in: $userId,
            out: $blogId,
            createdAt: $now,
            updatedAt: $now,
            content: $content,
        };
  `,
    {
      blogId,
      content,
      userId,
    },
  );

  return Response.json({});
}
