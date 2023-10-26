import { auth } from '$lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

type SignIn = {
  email: string;
  password: string;
};

export async function signIn({ email, password }: SignIn) {
  return await signInWithEmailAndPassword(auth, email, password);
}
