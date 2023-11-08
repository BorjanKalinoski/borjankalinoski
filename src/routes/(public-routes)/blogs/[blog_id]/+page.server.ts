import { database } from '../../../../hooks.server';
import type { Action, Actions, PageServerLoad } from './$types';
import type { BlogWithTags } from '$lib/types/blog-with-tags';

export const load: PageServerLoad = async ({
  params: { blog_id: blogId },
  locals: { currentUser },
}) => {
  const [
    {
      numberOfLikes: [numberOfLikes],
      ...blog
    },
  ] = await database.query<
    [
      BlogWithTags & {
        numberOfLikes: [number];
        userHasLikedBlog: boolean;
      },
    ]
  >(
    `
        SELECT *,
            (SELECT count(), blogId
                   FROM likes
                   WHERE blogId = $blogId
                   GROUP BY blogId
            ).count as numberOfLikes,
            (id->blogTag.out.*) as tags,
            count((SELECT *
              FROM likes
              WHERE blogId = $blogId
              AND userId = $userId
            )) == 1 as userHasLikedBlog
        FROM ONLY $blogId;
  `,
    {
      blogId,
      userId: currentUser?.id,
    },
  );

  return {
    blog,
    numberOfLikes: numberOfLikes ?? 0,
    userHasLikedBlog: blog.userHasLikedBlog,
  };
};

const likeBlog: Action = async ({
  params: { blog_id: blogId },
  locals: { currentUser },
}) => {
  await database.query(
    `
      INSERT INTO likes {  
          blogId: $blogId,
          userId: $userId,
          }
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
  await database.query(
    `DELETE likes WHERE blogId = $blogId AND userId = $userId`,
    {
      blogId,
      userId: currentUser?.id,
    },
  );
};

export const actions: Actions = {
  'dislike-blog': dislikeBlog,
  'like-blog': likeBlog,
};
