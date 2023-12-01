import { database } from '../../../hooks.server';
import type { Action, Actions } from './$types';
import { redirect } from '@sveltejs/kit';

const signOut: Action = async ({ cookies }) => {
  // TODO: check if this invalidates all active sessions
  await database.invalidate();

  cookies.delete('token');

  // TODO:

  // OR move this into a separate hook that runs only once
  // Invalidate completely removes the database session
  // maybe we need to: log in once as a DB user, and then log in as a regular user
  // await database.invalidate(); would invalidate only the regular user session
  // and when logging out, we can invalidate only the DB session
  await database.connect('ws://localhost:8000/rpc', {
    auth: {
      database: 'test',
      namespace: 'test',
      password: 'root',
      username: 'root',
    },
  });

  throw redirect(302, '/sign-in');
};

export const actions: Actions = {
  default: signOut,
};
