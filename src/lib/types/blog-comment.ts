import type { Blog } from '$lib/types/blog';
import type { User } from '$lib/types/user';

export type BlogComment = {
  author: User;
  content: string;
  createdAt: string;
  id: `user_comments_on_blog:${string}`;
  in: User['id'];
  numberOfLikes: number;
  numberOfReplies: number;
  out: Blog['id'];
  updatedAt: string;
  userHasLikedComment: boolean;
};
