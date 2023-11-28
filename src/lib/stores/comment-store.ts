import { writable } from 'svelte/store';

export function createCommentStore(commentId: string) {
  const commentStore = writable<{
    displayCommentReplies: boolean;
    displayReplyCommentForm: boolean;
  }>({
    displayCommentReplies: false,
    displayReplyCommentForm: false,
  });

  function onDisplayCommentReplies() {
    commentStore.update((store) => ({
      ...store,
      displayCommentReplies: true,
    }));
  }

  function onHideCommentReplies() {
    commentStore.update((store) => ({
      ...store,
      displayCommentReplies: false,
    }));
  }

  function onDisplayReplyCommentForm() {
    commentStore.update((store) => ({
      ...store,
      displayReplyCommentForm: true,
    }));
  }

  function onHideReplyCommentForm() {
    commentStore.update((store) => ({
      ...store,
      displayReplyCommentForm: false,
    }));
  }

  return {
    onDisplayCommentReplies,
    onDisplayReplyCommentForm,
    onHideCommentReplies,
    onHideReplyCommentForm,
    subscribe: commentStore.subscribe,
  };
}
