import { database } from '../../../../../hooks.server';

export async function POST(event) {
  const {
    locals: {
      currentUser: { id: userId },
    },
    params: { commentId },
    request,
  } = event;

  const { blogId, content } = await request.json();

  const k = await database.query(
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
      userId,
    },
  );

  return Response.json({});
}
