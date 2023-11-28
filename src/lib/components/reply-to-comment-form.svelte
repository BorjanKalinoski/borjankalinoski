<script lang="ts">
    import {superForm} from "sveltekit-superforms/client";
    import {page} from "$app/stores";
    import type {BlogComment} from "$lib/types/blog-comment";
    import LoadingSpinner from "$lib/components/loading-spinner.svelte";
    import {useQueryClient} from "@tanstack/svelte-query";
    import {toast} from "@zerodevx/svelte-toast";
    import {useReplyToCommentMutation} from "$lib/comments/mutations/use-reply-to-comment-mutation";

    export let isReplyingToComment: boolean;
    export let commentId: BlogComment['id'];

    const queryClient = useQueryClient();

    $: {
        replyToCommentMutation = useReplyToCommentMutation({
            onSuccess: () => {
                toast.push('Your comment was added successfully!');

                void queryClient.invalidateQueries({
                    queryKey: ['comments', commentId],
                });
            }
        });
    }

    let replyToCommentMutation: ReturnType<typeof useReplyToCommentMutation>;


    const {form, enhance, submitting} = superForm($page.data.replyToCommentForm, {
        id: commentId,
        validators: false,
        SPA: true,
        resetForm: true,
        onSubmit: ({formData}) => {
            $replyToCommentMutation.mutate({
                blogId: $page.params.blog_id,
                commentId,
                content: formData.get('content') as string
            });

        }
    });

</script>

<form
    method="post"
    use:enhance
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
            disabled={$submitting}
    >
        {#if $submitting}
            <LoadingSpinner />
        {:else}
            Reply
        {/if}
    </button>
</form>


