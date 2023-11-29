<script lang="ts">
    import LoadingSpinner from "$lib/components/loading-spinner.svelte";
    import {superForm} from "sveltekit-superforms/client";
    import {toast} from "@zerodevx/svelte-toast";
    import {extractErrorMessage} from "$lib/utils/extract-error-message";
    import {page} from "$app/stores";
    import {useAddCommentToBlogMutation} from "$lib/blog/mutations/use-add-comment-to-blog-mutation";
    import {useQueryClient} from "@tanstack/svelte-query";

    const queryClient = useQueryClient();

    const addCommentToBlogMutation = useAddCommentToBlogMutation({
        onSuccess: () => {
            void queryClient.invalidateQueries({
                queryKey: ['blog', $page.params.blog_id, 'comments'],
            });
            toast.push('Your comment was added successfully!');
        },
        onError: (error) => {
            toast.push(extractErrorMessage(error));
        }
    });

    const {
        form: addCommentForm,
        enhance,
        submitting,
    } = superForm($page.data.addCommentForm, {
        SPA: true,
        resetForm: true,
        validators: false,
        invalidateAll: false,
        onSubmit: () => {
            $addCommentToBlogMutation.mutate({
                blogId: $page.data.blog.id,
                content: $addCommentForm.content,
            });
        },
    });
</script>

<form
        use:enhance
        method="post"
        class="flex flex-col items-end gap-y-4 mb-5"
>
        <textarea
                bind:value={$addCommentForm.content}
                class="outline-0 bg-gray-50 rounded w-full h-16 p-2"
                placeholder="Write your comment"
                name="content"
        ></textarea>

    <button
            type="submit"
            class="bg-blue-400 px-2.5 py-2 text-white rounded flex items-center justify-center break-after-auto w-28 h-8"
            disabled={$submitting}
    >
        {#if $submitting}
            <LoadingSpinner />
        {:else}
            Comment
        {/if}
    </button>
</form>
