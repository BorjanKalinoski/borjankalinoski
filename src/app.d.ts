// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { User } from '$lib/types/user';

declare global {
  interface GlobalEventHandlersEventMap {
    dropimage: CustomEvent<{ file: File }>;
  }

  namespace App {
    // type Error = {}
    interface Locals {
      currentUser?: User;
      isAuthenticated: boolean;
    }
    // type PageData = {}
    // type Platform = {}
  }
}

export {};
