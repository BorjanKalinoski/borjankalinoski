import { database } from '../../../hooks.server';
import type { PageServerLoad } from './$types';
import type { BlogWithTags } from '$lib/types/blog-with-tags';
import type { Tag } from '$lib/types/tag';

async function getBlogsWithTags(): Promise<BlogWithTags[]> {
  const [blogs] = await database.query<[BlogWithTags[]]>(
    `SELECT *, creator.* as creator, (id->blogTag.out.*) as tags from blog`,
  );

  return blogs;
}

async function getFilteredBlogsWithTags({
  tagFilters,
}: {
  tagFilters: Array<Tag['name']>;
}): Promise<BlogWithTags[]> {
  const [blogs] = await database.query<[BlogWithTags[]]>(
    `SELECT *, creator.* as creator, (id->blogTag.out.*) as tags from blog WHERE $tagFilters ALLINSIDE ->blogTag.out.*.name`,
    {
      tagFilters,
    },
  );

  return blogs;
}

export const load: PageServerLoad = async ({ url }) => {
  const tagFilters =
    (url.searchParams.get('tags')?.split?.(',')?.filter(Boolean) as Array<
      Tag['name']
    >) ?? undefined;

  const isTagFilterApplied = Boolean(tagFilters);

  // TODO fix permissions error with tags
  const blogs = isTagFilterApplied
    ? await getFilteredBlogsWithTags({
        tagFilters,
      })
    : await getBlogsWithTags();

  const [tags] = await database.query<[Tag[]]>(`SELECT * from tag`);

  return {
    blogs,
    tags,
  };
};
