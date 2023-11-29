import ky from 'ky';

export async function getNumberOfLikesByBlogId(
  blogId: string,
): Promise<number> {
  return await ky.get(`/api/blogs/${blogId}/likes`).json<number>();
}
