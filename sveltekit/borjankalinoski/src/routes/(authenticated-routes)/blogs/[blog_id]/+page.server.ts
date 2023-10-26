import { database } from '../../../../hooks.server';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async () => {
  // const [{ result: blog }] = await database.query(
  //   `
  //     SELECT * FROM ${params.blog_id}
  //     `,
  // );

  return {
    // blog: blog?.[0],
  };
};
