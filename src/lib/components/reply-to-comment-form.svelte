<script lang="ts">
    import {superForm} from "sveltekit-superforms/client";
    import {page} from "$app/stores";
    import type {BlogComment} from "$lib/types/blog-comment";

    export let isReplyingToComment: boolean = false;
    export let commentId: BlogComment['id'];

    const {form, enhance} = superForm($page.data.replyToCommentForm, {
        id: commentId
    });

</script>

<form
    use:enhance
    method="post"
    action="?/reply-to-comment"
    class={`flex overflow-hidden flex-col gap-y-2.5 items-end
        ${isReplyingToComment ? 'h-fit' : 'h-0 hidden'}
    `}
>
    <input
        name="commentId"
        type="text"
        value={commentId}
        hidden
    >

    <textarea
        bind:value={$form.content}
        name="content"
        placeholder="Write your reply"
        class="outline-0 bg-gray-50 rounded w-full h-16 p-2"
    ></textarea>
    <button
            type="submit"
            class="bg-blue-400 px-2.5 py-2 text-white rounded flex items-center justify-center break-after-auto w-28 h-8"

    >
        Reply
    </button>
</form>

<!--{#if $submitting}-->
<!--        disabled={$submitting}-->
<!--    <LoadingSpinner />-->
<!--{:else}-->
<!--{/if}-->
