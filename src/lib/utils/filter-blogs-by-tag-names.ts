import { goto } from '$app/navigation';

export async function filterBlogsByTagNames(tagNames: string[]) {
  await goto(`/blogs?tags=${tagNames.join(',')}`);
}
