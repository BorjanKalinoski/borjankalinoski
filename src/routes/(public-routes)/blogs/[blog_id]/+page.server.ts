import { database } from '../../../../hooks.server';
import type { Action, Actions, PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
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
            (count(id<-blogComment)) as numberOfComments,
            (id->blogTag.out.*) as tags,
            (id<-likes.in CONTAINS $userId) as userHasLikedBlog,
               (SELECT
                    *, 
                    count(id<-user_likes_comment.*) as numberOfLikes,
                    in.* as author,
                    (<-user_likes_comment.in CONTAINS $userId) as userHasLikedComment 
                FROM id<-blogComment ORDER BY createdAt DESC
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

const likeBlog: Action = async ({
  params: { blog_id: blogId },
  locals: { currentUser },
}) => {
  await database.query(
    `
        RELATE ONLY $userId->likes->$blogId
      `,
    {
      blogId,
      userId: currentUser?.id,
    },
  );
};

const dislikeBlog: Action = async ({
  params: { blog_id: blogId },
  locals: { currentUser },
}) => {
  await database.query(`DELETE $userId->likes WHERE out = $blogId`, {
    blogId,
    userId: currentUser?.id,
  });
};

const addComment: Action = async (event) => {
  const {
    locals: { currentUser },
    params: { blog_id: blogId },
    request,
  } = event;

  const addCommentFormData = await request.formData();

  const form = await superValidate(addCommentFormData, addCommentFormSchema);

  if (!form.valid) {
    return {
      form,
    };
  }

  await database.query(
    `
     LET $now = time::now();
     
     RELATE $userId->blogComment->$blogId
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
      content: form.data.content,
      userId: currentUser?.id,
    },
  );

  return {
    form,
  };
};

const likeComment: Action = async ({ request, locals: { currentUser } }) => {
  const formData = await request.formData();

  const commentId = formData.get('commentId');

  if (!commentId) {
    throw error(400, {
      message: 'An error occurred while liking this comment',
    });
  }

  await database.query(
    `
        LET $now = time::now();

        RELATE ONLY $userId->user_likes_comment->$commentId
            CONTENT {
                in: $userId,
                out: $commentId,
                createdAt: $now,
                updatedAt: $now
            };
  `,
    {
      commentId,
      userId: currentUser?.id,
    },
  );
};

const dislikeComment: Action = async ({ request, locals: { currentUser } }) => {
  const formData = await request.formData();

  const commentId = formData.get('commentId');

  if (!commentId) {
    throw error(400, {
      message: 'An error occurred while liking this comment',
    });
  }

  await database.query(
    `DELETE $userId->user_likes_comment WHERE out = $commentId`,
    {
      commentId,
      userId: currentUser?.id,
    },
  );
};

export const actions: Actions = {
  'add-comment': addComment,
  'dislike-blog': dislikeBlog,
  'dislike-comment': dislikeComment,
  'like-blog': likeBlog,
  'like-comment': likeComment,
};
