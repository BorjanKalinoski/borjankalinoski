// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // type Error = {}
    interface Locals {
      isAuthenticated: boolean;
    }
    // type PageData = {}
    // type Platform = {}
  }
}

export {};
