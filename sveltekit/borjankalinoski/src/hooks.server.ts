import type { Handle } from '@sveltejs/kit';
import Surreal from 'surrealdb.js';

export const database = new Surreal();

try {
  await database.connect('ws://localhost:8000/rpc', {
    db: 'test',
    ns: 'test',
  });
} catch (error) {
  console.log('error', error);
}

export const handle: Handle = async function ({ event, resolve }) {
  const token = event.cookies.get('token');

  if (token) {
    try {
      await database.authenticate(token);
      event.locals.isAuthenticated = true;
    } catch (error) {
      console.error(
        `There was an error authenticating the user with token: ${token}`,
      );
      console.error(error);
      event.locals.isAuthenticated = false;
    }
  }

  return await resolve(event);
};
