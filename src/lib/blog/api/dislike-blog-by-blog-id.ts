import ky from 'ky';

export async function dislikeBlogByBlogId(blogId: string): Promise<void> {
  await ky.post(`/api/blogs/${blogId}/dislike`).json();
}
