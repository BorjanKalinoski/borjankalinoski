// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { User } from './types/user';

declare global {
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
