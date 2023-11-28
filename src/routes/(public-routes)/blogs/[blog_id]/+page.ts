import type { PageLoad } from './$types';

export const load: PageLoad = async ({ data, parent }) => {
  const { queryClient } = await parent();

  await queryClient.prefetchQuery({
    initialData: data.blog.comments,
    queryKey: ['comments'],
  });

  for (const comment of data.blog.comments) {
    await queryClient.prefetchQuery({
      initialData: comment,
      queryKey: ['comments', comment.id],
    });
  }

  return data;
};
