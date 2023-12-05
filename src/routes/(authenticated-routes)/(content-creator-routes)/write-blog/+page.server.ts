import { database } from '../../../../hooks.server';
import type { Actions, PageServerLoad } from './$types';
import { getDownloadUrl } from '$lib/storage/get-download-url';
import { uploadFile } from '$lib/storage/upload-file';
import type { Blog } from '$lib/types/blog';
import type { Tag } from '$lib/types/tag';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const createBlogFormSchema = z
  .object({
    content: z.string(),
    tags: z.string().array(),
    thumbnail: z.custom<File>(),
    title: z.string(),
    wordCount: z.number(),
  })
  .required()
  .strict();

export const load: PageServerLoad = async () => {
  const form = await superValidate(createBlogFormSchema);

  const [tags] = await database.query<[Tag[]]>(`
      select * from tag
    `);

  return {
    form,
    tags,
  };
};

export const actions: Actions = {
  default: async ({ request, locals: { currentUser } }) => {
    const now = Date.now();

    const formData = await request.formData();

    const form = await superValidate(formData, createBlogFormSchema);

    const thumbnail = formData.get('thumbnail');

    if (!form.valid || !(thumbnail instanceof File)) {
      return {
        form,
      };
    }

    const thumbnailLocation = `images/${now}.jpeg`;

    const thumbnailImageStorageReference = await uploadFile({
      file: thumbnail,
      location: thumbnailLocation,
    });

    const thumbnailImageDownloadUrl = await getDownloadUrl(
      thumbnailImageStorageReference,
    );

    const content = form.data.content;

    const [, , , blogId] = await database.query<[null, null, null, Blog['id']]>(
      `
            BEGIN TRANSACTION;

            LET $now = time::now();

            LET $blogId = (
                CREATE blog SET
                createdAt = $now,
                updatedAt = $now,
                content = $content,
                thumbnailImageDownloadUrl = $thumbnailImageDownloadUrl,
                title = $title,
                creator = $userId,
                wordCount = $wordCount,
                timeToRead = math::ceil($wordCount / 200)
            )[0].id;
            
            FOR $tagName IN $tagNames {
                LET $existingTag = (SELECT * FROM tag WHERE name = $tagName)[0];

                IF $existingTag IS NONE {
                    LET $newTag = CREATE tag SET 
                        name = $tagName,
                        createdAt = $now,
                        updatedAt = $now;

                    RELATE ONLY $blogId->blogTag->$newTag;
                } ELSE {
                    RELATE ONLY $blogId->blogTag->$existingTag;
                }
            };

            COMMIT TRANSACTION;

            RETURN $blogId;
    `,
      {
        content,
        tagNames: form.data.tags,
        thumbnailImageDownloadUrl,
        title: form.data.title,
        userId: currentUser?.id,
        wordCount: form.data.wordCount,
      },
    );

    return {
      blogId,
      form,
    };
  },
};