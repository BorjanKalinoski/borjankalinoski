import { database } from '../../../hooks.server';
import type { PageServerLoad } from './$types';
import type { BlogWithTags } from '$lib/types/blog-with-tags';

export const load: PageServerLoad = async () => {
  const [blogs] = await database.query<[BlogWithTags[]]>(
    `SELECT *, (id->blogTag.out.*) as tags from blog`,
  );

  return {
    blogs,
  };
};
