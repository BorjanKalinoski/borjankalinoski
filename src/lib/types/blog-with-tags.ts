import type { Blog } from '$lib/types/blog';
import type { Tag } from '$lib/types/tag';

export type BlogWithTags = Blog & {
  tags: Tag[];
};
