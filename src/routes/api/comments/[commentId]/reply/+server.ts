import { database } from '../../../../../hooks.server';
import type { RequestEvent } from '@sveltejs/kit';

export async function POST({
  locals: { currentUser },
  params: { commentId },
  request,
}: RequestEvent) {
  const { blogId, content } = await request.json();

  await database.query(
    `
    LET $now = time::now();

    LET $newComment = RELATE ONLY $userId->user_comments_on_blog->$blogId
        CONTENT {
            in: $userId,
            out: $blogId,
            createdAt: $now,
            updatedAt: $now,
            content: $content,
        };

    RELATE ONLY $newComment->comment_replies_to->$commentId;
    
    RETURN $newComment;
    `,
    {
      blogId,
      commentId,
      content,
      userId: currentUser?.id,
    },
  );

  return Response.json({});
}
