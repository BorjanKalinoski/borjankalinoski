import { database } from '../../../hooks.server';
import type { Action, Actions } from './$types';
import { redirect } from '@sveltejs/kit';

const signOut: Action = async ({ cookies }) => {
  await database.invalidate();

  cookies.set('token', '', {
    expires: new Date(0),
    path: '/',
  });

  throw redirect(302, '/sign-in');
};

export const actions: Actions = {
  default: signOut,
};
