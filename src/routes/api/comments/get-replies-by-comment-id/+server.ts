import { RequestHandler } from './$types';

/** @type {import('./$types').RequestHandler} */
export function POST(event) {
  return {
    body: {
      message: 'Hello world!',
    },
  };
}
