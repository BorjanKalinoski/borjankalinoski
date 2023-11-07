import { database } from '../../../../hooks.server';
import type { Action, Actions, PageServerLoad } from './$types';
import type { Blog } from '$lib/types/blog';
import type { Tag } from '$lib/types/tag';

export const load: PageServerLoad = async ({
  params: { blog_id: blogId },
  locals: { currentUser },
}) => {
  const [blogTags] = await database.query<[Tag[]]>(
    `
        select * from $blogId->blogTag.out
    `,
    {
      blogId,
    },
  );

  const [
    {
      numberOfLikes: [numberOfLikes],
      ...blog
    },
  ] = await database.query<
    [
      Blog & {
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
    blogTags,
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
