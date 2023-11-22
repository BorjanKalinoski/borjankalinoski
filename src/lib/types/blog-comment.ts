import type { Blog } from '$lib/types/blog';
import type { User } from '$lib/types/user';

export type BlogComment = {
  author: User;
  content: string;
  createdAt: string;
  id: `blogComment:${string}`;
  in: User['id'];
  numberOfLikes: number;
  userHasLikedComment: boolean;
  out: Blog['id'];
  replies: BlogComment[];
  updatedAt: string;
};
