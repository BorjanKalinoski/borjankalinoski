import type { StorageReference } from './types/storage-reference';
import { getDownloadURL } from 'firebase/storage';

export async function getDownloadUrl(
  storageReference: StorageReference,
): Promise<string> {
  return await getDownloadURL(storageReference);
}
