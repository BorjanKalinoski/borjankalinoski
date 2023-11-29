import { database } from '../../../../hooks.server';
import type { PageServerLoad } from './$types';
import type { BlogComment } from '$lib/types/blog-comment';
import type { BlogWithTags } from '$lib/types/blog-with-tags';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const addCommentFormSchema = z
  .object({
    content: z.string().min(1),
  })
  .required()
  .strict();

const replyToCommentFormSchema = z
  .object({
    commentId: z.string().min(1),
    content: z.string().min(1),
  })
  .required()
  .strict();

export const load: PageServerLoad = async ({
  params: { blog_id: blogId },
  locals: { currentUser },
}) => {
  const [blog] = await database.query<
    [
      BlogWithTags & {
        comments: BlogComment[];
        numberOfComments: number;
        numberOfLikes: number;
        userHasLikedBlog: boolean;
      },
    ]
  >(
    `
        SELECT *,
            (count(id<-likes)) as numberOfLikes, 
            (count(id<-user_comments_on_blog)) as numberOfComments,
            (id->blogTag.out.*) as tags,
            (id<-likes.in CONTAINS $userId) as userHasLikedBlog,
               (SELECT
                    *, 
                    count(id<-user_likes_comment.*) as numberOfLikes,
                    in.* as author,
                    (<-user_likes_comment.in CONTAINS $userId) as userHasLikedComment,
                    count(id<-comment_replies_to) as numberOfReplies
                FROM id<-user_comments_on_blog
                WHERE !id->comment_replies_to
                ORDER BY createdAt DESC 
               ) as comments                                                                                                
        FROM ONLY $blogId;
  `,
    {
      blogId,
      userId: currentUser?.id,
    },
  );

  const addCommentForm = await superValidate(addCommentFormSchema);

  const replyToCommentForm = await superValidate(replyToCommentFormSchema);

  return {
    addCommentForm,
    blog,
    replyToCommentForm,
  };
};
