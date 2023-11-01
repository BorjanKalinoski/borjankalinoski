import type { User } from './types/user';
import type { Handle } from '@sveltejs/kit';
import Surreal from 'surrealdb.js';

export const database = new Surreal();

try {
  await database.connect('ws://localhost:8000/rpc', {
    database: 'test',
    namespace: 'test',
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
    event.locals.currentUser = (await database.query<[User]>('$auth.*'))[0];
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
