import type { User } from '$lib/types/user';

export type Blog = {
  content: string;
  createdAt: string;
  creator: User['id'];
  id: `blog:${string}`;
  thumbnailImageDownloadUrl: string;
  title: string;
  updatedAt: string;
  wordCount: number;
};
