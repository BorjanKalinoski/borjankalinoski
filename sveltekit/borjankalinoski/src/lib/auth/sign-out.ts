import { auth } from '$lib/firebase';
import { signOut as firebaseSignOut } from 'firebase/auth';

export async function signOut() {
  await firebaseSignOut(auth);
}
