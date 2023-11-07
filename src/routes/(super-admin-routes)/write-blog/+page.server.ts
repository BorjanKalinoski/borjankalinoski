import { database } from '../../../hooks.server';
import type { Actions, PageServerLoad } from './$types';
import { getDownloadUrl } from '$lib/storage/get-download-url';
import { uploadFile } from '$lib/storage/upload-file';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const createBlogFormSchema = z
  .object({
    content: z.any(),
    tags: z.string().array(),
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

    await database.query(
      `
            BEGIN TRANSACTION;

            LET $now = time::now();
            
            LET $blog = (
                CREATE blog SET
                    createdAt = $now,
                    updatedAt = $now,
                    content = $content,
                    thumbnailImageDownloadUrl = $thumbnailImageDownloadUrl,
                    title = $title,
                    userId = $userId
            )[0];
      
            FOR $tag IN $tags {
                LET $existingTag = SELECT * FROM tag WHERE name = $tag;
                LET $tagId = $existingTag[0].id;

                IF $tagId IS NONE { 
                    $newTag = CREATE tag SET 
                        name = $tag,
                        createdAt = $now,
                        updatedAt = $now;
                        
                    $tagId = $newTag[0].id;
                    
                    INSERT INTO blogTag {  
                        blogId: $blog.id,
                        userId: $userId,
                        tagId: $tagId,
                    }
                } ELSE {
                    INSERT INTO blogTag {  
                        blogId: $blog.id,
                        userId: $userId,
                        tagId: $tagId,
                    }
                };
            };
            
            COMMIT TRANSACTION;
    `,
      {
        content,
        tags: form.data.tags,
        thumbnailImageDownloadUrl,
        title: form.data.title,
        userId: currentUser?.id,
      },
    );
    // 1. Save new tags to DB [DONE]
    // 2. Save blogTags to DB [DONE]
    // 3. Fetch all tags into dropdown
    // 4. Display tags in blog U
    // 5. LowPrio: infinite scrolling
    // 6. Refactor code
    return {
      form,
    };
  },
};
