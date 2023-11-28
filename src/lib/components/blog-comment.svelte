<script lang="ts">
    import dayjs from "dayjs";
    import type {BlogComment as BlogCommentType} from "$lib/types/blog-comment";
    import NumberOfCommentLikes from "$lib/components/number-of-comment-likes.svelte";
    import ReplyToCommentForm from "$lib/components/reply-to-comment-form.svelte";
    import {createQuery} from "@tanstack/svelte-query";
    import {getRepliesByCommentId} from "$lib/api/comments/get-replies-by-comment-id";
    import {getCommentByCommentId} from "$lib/api/comments/get-comment-by-comment-id";
    import {createCommentStore} from "$lib/stores/comment-store";
    import LoadingSpinner from "$lib/components/loading-spinner.svelte";


    export let comment: BlogCommentType;


    const commentStore = createCommentStore(comment.id);

    const commentData = createQuery({
        queryKey: ['comments', comment?.id],
        initialData: comment,
        queryFn: async () => {
            return await getCommentByCommentId(comment?.id)
        },
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchInterval: false,
        refetchIntervalInBackground: false,
    });

    let repliesQuery;

    $: {
        repliesQuery = createQuery({
            queryKey: ['comments', comment?.id, 'replies'],
            enabled: $commentStore.displayCommentReplies,
            initialData: [],
            queryFn: async () => {
                return await getRepliesByCommentId(comment?.id)
            },
        });
    }

</script>

{#if $commentData.data?.id !== undefined}
    <div
            class="border-solid border-2 mb-2 flex p-2.5 gap-x-2.5 gap-y-2.5 flex-col rounded"
    >
        <div class="flex gap-x-2 items-center">
            <div class="avatar w-[20px] h-[20px] rounded-[50%] bg-gray-500"></div>

            <div class="text-xs">
                {$commentData.data.author.email}
            </div>

            <div class="text-xs text-[#656D76]">
                {dayjs($commentData.data.createdAt).format('D MMM, YYYY')}
            </div>
        </div>

        <div class="text-base my-3.5">
            {$commentData.data.content}
        </div>


        <div class="flex items-center gap-x-2.5">
            <NumberOfCommentLikes
                commentId={$commentData.data.id}
            />

            <button
                on:click={commentStore.onDisplayReplyCommentForm}
            >
                Reply
            </button>
        </div>

        <ReplyToCommentForm
                isReplyingToComment={$commentStore.displayReplyCommentForm}
                commentId={$commentData.data.id}
        />

        {#if ($commentData.data.numberOfReplies !== 0)}
            <button class="text-blue-400 self-start" on:click={()=>{
                commentStore.onDisplayCommentReplies();
            }}>
                View {$commentData.data.numberOfReplies} {$commentData.data.numberOfReplies === 1 ? 'reply' : 'replies'}
            </button>
        {/if}

    </div>

    {#if ($commentStore.displayCommentReplies)}
        <div class="pl-5">
            {#if $repliesQuery.isFetching}
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
<!--
1. List replies only when view-1-reply is clicked [DoNE]
2. Add loading UI [done]
3. Display reply once it is added [DONE]
4. Add a toast message [done]
5. Refactor code
-->
