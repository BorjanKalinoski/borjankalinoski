<script lang="ts">
    import HeartIcon from "$lib/icons/heart-icon.svelte";
    import {useQueryClient} from "@tanstack/svelte-query";
    import {useCommentQuery} from "$lib/comments/queries/use-comment-query";
    import {useDislikeCommentMutation} from "$lib/comments/mutations/use-dislike-comment-mutation";
    import type {BlogComment} from "$lib/types/blog-comment";
    import {useLikeCommentMutation} from "$lib/comments/mutations/use-like-comment-mutation";

    export let commentId: BlogComment['id'];

    const commentQuery = useCommentQuery({
        commentId,
    })

    const queryClient = useQueryClient();

    const dislikeCommentMutation = useDislikeCommentMutation({
        onSuccess: () => {
            void queryClient.setQueryData(['comments', commentId], (comment: BlogComment) => {
                return {
                    ...comment,
                    numberOfLikes: comment.numberOfLikes - 1,
                    userHasLikedComment: false,
                } satisfies BlogComment;
            });
        }
    })

    const likeCommentMutation = useLikeCommentMutation({
        onSuccess: () => {
            void queryClient.setQueryData(['comments', commentId], (comment: BlogComment) => {
                return {
                    ...comment,
                    numberOfLikes: comment.numberOfLikes + 1,
                    userHasLikedComment: true,
                } satisfies BlogComment
            });
        }
    });
</script>

<div class="blog-stats">
    {#if ($commentQuery.data?.userHasLikedComment)}
        <HeartIcon
            class="cursor-pointer [&>path]:fill-rose-600 fill-rose-600 stroke-rose-600"
            width={16}
            height={16}
            on:click={() => {
                $dislikeCommentMutation.mutate(commentId)
            }}
        />
    {/if}

    {#if (!$commentQuery.data?.userHasLikedComment)}
        <HeartIcon
            class="[&>path]:fill-white stroke-black cursor-pointer"
            width={16}
            height={16}
            on:click={() => {
                $likeCommentMutation.mutate(commentId)
            }}
        />
    {/if}

    <span class="text-xs">
        {$commentQuery.data?.numberOfLikes}
    </span>
</div>
