import ky from 'ky';

export async function likeBlogByBlogId(blogId: string): Promise<void> {
  await ky.post(`/api/blogs/${blogId}/like`).json();
}
