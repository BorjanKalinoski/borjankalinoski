<script lang="ts">
    import dayjs from "dayjs";
    import type {BlogComment as BlogCommentType} from "$lib/types/blog-comment";
    import NumberOfCommentLikes from "$lib/components/number-of-comment-likes.svelte";
    import ReplyToCommentForm from "$lib/components/reply-to-comment-form.svelte";
    import {createCommentStore} from "$lib/stores/comment-store";
    import LoadingSpinner from "$lib/components/loading-spinner.svelte";
    import {useCommentQuery} from "$lib/comments/queries/use-comment-query";
    import {useCommentReplies} from "$lib/comments/queries/use-comment-replies";
    import {page} from "$app/stores";
    import type {Blog} from "$lib/types/blog";

    export let comment: BlogCommentType;

    const blogId = $page.params.blog_id as Blog['id'];


    let commentStore: ReturnType<typeof createCommentStore>;

    $: commentStore = createCommentStore(comment.id);

    let commentQuery: ReturnType<typeof useCommentQuery>;

    $: commentQuery = useCommentQuery({
        commentId: comment.id,
        initialData: comment,
        blogId
    });

    let repliesQuery: ReturnType<typeof useCommentReplies>;

    $: repliesQuery = useCommentReplies({
        enabled: $commentStore.displayCommentReplies,
        commentId: comment.id,
        blogId
    });

</script>

{#if $commentQuery.data?.id !== undefined}
    <div
            class="border-solid border-2 mb-2 flex p-2.5 gap-x-2.5 gap-y-2.5 flex-col rounded"
    >
        <div class="flex gap-x-2 items-center">
            <div class="avatar w-[20px] h-[20px] rounded-[50%] bg-gray-500"></div>

            <div class="text-xs">
                {$commentQuery.data.author.email}
            </div>

            <div class="text-xs text-[#656D76]">
                {dayjs($commentQuery.data.createdAt).format('D MMM, YYYY')}
            </div>
        </div>

        <div class="text-base my-3.5">
            {$commentQuery.data.content}
        </div>


        <div class="flex items-center gap-x-2.5">
            <NumberOfCommentLikes
                commentId={$commentQuery.data.id}
            />

            <button
                on:click={commentStore.onDisplayReplyCommentForm}
            >
                Reply
            </button>
        </div>

        <ReplyToCommentForm
                isReplyingToComment={$commentStore.displayReplyCommentForm}
                commentId={$commentQuery.data.id}
        />

        {#if ($commentQuery.data.numberOfReplies !== 0)}
            <button
                class="text-blue-400 self-start"
                on:click={$commentStore.displayCommentReplies ? commentStore.onHideCommentReplies : commentStore.onDisplayCommentReplies}
            >
                {
                    $commentStore.displayCommentReplies
                        ? 'Hide'
                        : 'View'
                }

                {$commentQuery.data.numberOfReplies}

                {$commentQuery.data.numberOfReplies === 1 ? 'reply' : 'replies'}
            </button>
        {/if}

    </div>

    {#if ($commentStore.displayCommentReplies)}
        <div class="pl-5">
            {#if $repliesQuery.isLoading}
                <div class="flex gap-x-2.5">
                    <LoadingSpinner class="mb-2"/>

                    <span>
                Loading replies...
            </span>
                </div>
            {:else if $repliesQuery.data?.length !== 0}
                {#each $repliesQuery.data as reply}
                    <svelte:self comment={reply}  />
                {/each}
            {/if}
        </div>

    {/if}
{/if}
