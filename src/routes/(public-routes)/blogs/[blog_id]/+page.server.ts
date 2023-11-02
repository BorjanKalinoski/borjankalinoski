import { database } from '../../../../hooks.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params: { blog_id: blogId } }) => {
  const [blog] = await database.query(
    `
      SELECT * FROM ONLY ${blogId}
      `,
  );
  return {
    blog,
  };
};
