import type { LayoutServerLoad } from '../../../../.svelte-kit/types/src/routes';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = (event) => {
  if (!event.locals.isAuthenticated) {
    throw redirect(302, '/sign-in');
  }
};
