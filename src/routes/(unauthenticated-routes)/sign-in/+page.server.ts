import { database } from '../../../hooks.server';
import type { Action, Actions, PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
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

const signIn: Action = async ({ request, cookies }) => {
  const formData = await request.formData();

  const form = await superValidate(formData, schema);

  const { email, password } = form.data;

  try {
    const token = await database.signin({
      database: 'test',
      email,
      namespace: 'test',
      password,
      scope: 'user',
    });

    cookies.set('token', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 30 * 24,
      path: '/',
      sameSite: 'strict',
      // secure: true, only in prod
    });
  } catch (error_) {
    throw error(400, {
      message: (error_ as Error).message,
    });
  }
};

export const actions: Actions = {
  'sign-in': signIn,
};