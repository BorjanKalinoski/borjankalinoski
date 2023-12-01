import type { UserRoleType } from '$lib/types/user-role-type';

export type User = {
  createdAt: string;
  email: string;
  id: `user:${string}`;
  role: UserRoleType;
  updatedAt: string;
};
