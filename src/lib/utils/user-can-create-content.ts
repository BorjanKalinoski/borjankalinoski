import { UserRoleType } from '$lib/types/user-role-type';

export function userCanCreateContent(userRole: UserRoleType) {
  return (
    userRole === UserRoleType.Admin || userRole === UserRoleType.ContentCreator
  );
}
