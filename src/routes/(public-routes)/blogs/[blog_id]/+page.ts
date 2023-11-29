import type { PageLoad } from './$types';

export const load: PageLoad = async ({ data, parent }) => {
  const { queryClient, currentUser } = await parent();

  await Promise.all([
    queryClient.prefetchQuery({
      initialData: data.blog.comments,
      queryKey: ['blog', data.blog.id, 'comments'],
      staleTime: Number.POSITIVE_INFINITY,
    }),
    queryClient.prefetchQuery({
      initialData: data.blog.numberOfLikes,
      queryKey: ['blog', data.blog.id, 'likes'],
      staleTime: Number.POSITIVE_INFINITY,
    }),

    queryClient.prefetchQuery({
      initialData: data.blog.numberOfComments,
      queryKey: ['blog', data.blog.id, 'comments', 'count'],
      staleTime: Number.POSITIVE_INFINITY,
    }),

    queryClient.prefetchQuery({
      initialData: data.blog.userHasLikedBlog,
      queryKey: ['blog', data.blog.id, 'likes', 'user', currentUser?.id],
      staleTime: Number.POSITIVE_INFINITY,
    }),
    data.blog.comments.map(
      async (comment) =>
        await queryClient.prefetchQuery({
          initialData: comment,
          queryKey: ['blog', data.blog.id, 'comments', comment.id],
          staleTime: Number.POSITIVE_INFINITY,
        }),
    ),
  ]);

  return data;
};
