import { database } from '../../../hooks.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const [blogs] = await database.query(
    'SELECT * from blog ORDER BY createdAt DESC',
  );

  return {
    blogs,
  };
};
