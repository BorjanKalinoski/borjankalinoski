import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
  return {
    currentUser: event.locals.currentUser,
    isAuthenticated: event.locals.isAuthenticated,
  };
};
