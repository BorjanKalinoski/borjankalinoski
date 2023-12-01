import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { userCanCreateContent } from '$lib/utils/user-can-create-content';

export const load: LayoutServerLoad = ({
  locals: { isAuthenticated, currentUser },
}) => {
  if (!isAuthenticated || !currentUser) {
    throw redirect(302, '/sign-in');
  }

  if (!userCanCreateContent(currentUser.role)) {
    throw redirect(302, '/sign-in');
  }
};
