import { database } from '../../../hooks.server';
import type { Actions, PageServerLoad } from './$types';
import { getDownloadUrl } from '$lib/storage/get-download-url';
import { uploadFile } from '$lib/storage/upload-file';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const createBlogFormSchema = z
  .object({
    content: z.any(),
    thumbnail: z.custom<File>(),
    title: z.string(),
  })
  .strict();

export const load: PageServerLoad = async () => {
  const form = await superValidate(createBlogFormSchema);

  return {
    form,
  };
};

export const actions: Actions = {
  default: async ({ request }) => {
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

    const content = JSON.parse(form.data.content);

    await database.query(
      `
        LET $now = time::now();

        CREATE blog SET
        createdAt = $now,
        updatedAt = $now,
        content = $content,
        thumbnailImageDownloadUrl = $thumbnailImageDownloadUrl,
        title = $title
    `,
      {
        content,
        thumbnailImageDownloadUrl,
        title: form.data.title,
      },
    );

    await database.create('blog', {
      content,
      thumbnailImageDownloadUrl,
      title: form.data.title,
    });

    return {
      form,
    };
  },
};
// TODO
// 1. Find a way to store and load
// 2. move everything to camelCase
// 2.
