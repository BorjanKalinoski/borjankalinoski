import { storage } from '$lib/firebase';
import { ref, type StorageReference, uploadBytes } from 'firebase/storage';

export async function uploadFile({
  file,
  location,
}: {
  file: File;
  location: string;
}): Promise<StorageReference> {
  const storageRef = ref(storage, location);

  const uploadResult = await uploadBytes(storageRef, await file.arrayBuffer());

  return uploadResult.ref;
}
