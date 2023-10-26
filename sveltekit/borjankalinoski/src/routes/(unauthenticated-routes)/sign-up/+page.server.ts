import { database } from '../../../hooks.server';
import type { Action, Actions, PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const schema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
  })
  .strict();

export const load: PageServerLoad = async () => {
  const form = await superValidate(schema);

  return {
    form,
  };
};

const signUp: Action = async ({ request }) => {
  const formData = await request.formData();

  const form = await superValidate(formData, schema);

  const { email, password } = form.data;

  try {
    await database.signup({
      DB: 'test',
      email,
      NS: 'test',
      password,
      SC: 'user',
    });
  } catch (error) {
    console.log('ee', error);
    throw error;
  }

  throw redirect(303, '/sign-in');
};

export const actions: Actions = {
  'sign-up': signUp,
};
