import { database } from '../../../../hooks.server';
import type { Action, Actions, PageServerLoad } from './$types';
import type { BlogWithTags } from '$lib/types/blog-with-tags';

export const load: PageServerLoad = async ({
  params: { blog_id: blogId },
  locals: { currentUser },
}) => {
  const [blog] = await database.query<
    [
      BlogWithTags & {
        numberOfLikes: number;
        userHasLikedBlog: boolean;
      },
    ]
  >(
    `
        SELECT *,
            (count(id<-likes)) as numberOfLikes, 
            (id->blogTag.out.*) as tags,
            (id<-likes.in CONTAINS $userId) as userHasLikedBlog
        FROM ONLY $blogId;
  `,
    {
      blogId,
      userId: currentUser?.id,
    },
  );

  return {
    blog,
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

export const actions: Actions = {
  'dislike-blog': dislikeBlog,
  'like-blog': likeBlog,
};
