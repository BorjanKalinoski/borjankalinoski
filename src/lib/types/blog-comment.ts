import type { Blog } from '$lib/types/blog';
import type { User } from '$lib/types/user';

export type BlogComment = {
  comment: string;
  createdAt: string;
  id: `blogComment:${string}`;
  in: User['id'];
  out: Blog['id'];
  replies: BlogComment[];
  updatedAt: string;
};
