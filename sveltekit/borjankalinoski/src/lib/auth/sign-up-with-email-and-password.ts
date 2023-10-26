import { auth } from '$lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

type SignUpWithEmailAndPassword = {
  email: string;
  password: string;
};

export async function signUpWithEmailAndPassword({
  email,
  password,
}: SignUpWithEmailAndPassword) {
  return await createUserWithEmailAndPassword(auth, email, password);
}
