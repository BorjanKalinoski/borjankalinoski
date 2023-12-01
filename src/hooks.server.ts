import type { Handle } from '@sveltejs/kit';
import type { User } from '$lib/types/user';
import Surreal from 'surrealdb.js';

export const database = new Surreal();

try {
  await database.connect('ws://localhost:8000/rpc', {
    auth: {
      database: 'test',
      namespace: 'test',
      password: 'root',
      username: 'root',
    },
  });
} catch (error) {
  console.log('error', error);
}

export const handle: Handle = async function ({ event, resolve }) {
  const token = event.cookies.get('token');

  if (!token) {
    event.locals.isAuthenticated = false;
    event.locals.currentUser = undefined;

    return await resolve(event);
  }

  try {
    event.locals.isAuthenticated = await database.authenticate(token);
    event.locals.currentUser = event.locals.isAuthenticated
      ? (
          await database.query<[User]>(
            'SELECT *, role.*.role_type as role from ONLY $auth.*',
          )
        )[0]
      : undefined;
  } catch (error) {
    console.error(
      `There was an error authenticating the user with token: ${token}. `,
      error,
    );

    event.locals.isAuthenticated = false;
    event.locals.currentUser = undefined;
  }

  return await resolve(event);
};
