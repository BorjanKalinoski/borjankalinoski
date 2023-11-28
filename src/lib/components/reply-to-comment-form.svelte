<script lang="ts">
    import {superForm} from "sveltekit-superforms/client";
    import {page} from "$app/stores";
    import type {BlogComment} from "$lib/types/blog-comment";
    import LoadingSpinner from "$lib/components/loading-spinner.svelte";
    import {createMutation, useQueryClient} from "@tanstack/svelte-query";
    import {toast} from "@zerodevx/svelte-toast";

    export let isReplyingToComment: boolean;
    export let commentId: BlogComment['id'];

    const queryClient = useQueryClient();

    let replyToCommentMutation;

    $:{

        replyToCommentMutation = createMutation({
            mutationFn: async (body: any) => {
                return await fetch(`/api/comments/${commentId}/reply`, {
                    method: 'POST',
                    body: JSON.stringify(body),
                });
            },
            onSuccess: (data) => {
                toast.push('Your comment was added successfully!');

                isReplyingToComment = false;

                void queryClient.invalidateQueries({
                    queryKey: ['comments', commentId],
                });
            }
        });
    }


    const {form, enhance, submitting} = superForm($page.data.replyToCommentForm, {
        id: commentId,
        validators: false,
        SPA: true,
        resetForm: true,
        onSubmit: ({formData}) => {
            $replyToCommentMutation.mutate({
                content: formData.get('content'),
                commentId,
                blogId: $page.params.blog_id
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


