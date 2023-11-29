<script lang="ts">
    import HeartIcon from "$lib/icons/heart-icon.svelte";
    import {useQueryClient} from "@tanstack/svelte-query";
    import {useCommentQuery} from "$lib/comments/queries/use-comment-query";
    import {useDislikeCommentMutation} from "$lib/comments/mutations/use-dislike-comment-mutation";
    import type {BlogComment} from "$lib/types/blog-comment";
    import {useLikeCommentMutation} from "$lib/comments/mutations/use-like-comment-mutation";
    import type {Blog} from "$lib/types/blog";
    import {page} from "$app/stores";
    import {useUserHasLikedCommentQuery} from "$lib/comments/queries/use-user-has-liked-comment-query";

    // 1. replies are closed when adding a reply to a reply (probably due to a page refresh)
    // 2. loading state for user has liked comment [done]
    // 3. update # of comments when adding a comment [done]
    // 4. update # of comments when deleting a comment [no-delete-comment functionality now]
    export let commentId: BlogComment['id'];

    const userId = $page.data?.currentUser?.id;
    const blogId = $page.params.blog_id as Blog['id'];

    let commentQuery:ReturnType<typeof useCommentQuery>;

    $: commentQuery = useCommentQuery({
        commentId,
        blogId,
    })

    const queryClient = useQueryClient();

    let userHasLikedCommentQuery: ReturnType<typeof useUserHasLikedCommentQuery>;

    $: userHasLikedCommentQuery = useUserHasLikedCommentQuery({
        commentId,
        userId,
        blogId,
    });

    const dislikeCommentMutation = useDislikeCommentMutation({
        onSuccess: () => {
            void queryClient.invalidateQueries({
                    queryKey: ['blog', $page.params.blog_id, 'comments', commentId]
                },
            );
        }
    })

    const likeCommentMutation = useLikeCommentMutation({
        onSuccess: () => {
            void queryClient.invalidateQueries({
                    queryKey: ['blog', $page.params.blog_id, 'comments', commentId]
                },
            );
        }
    });
</script>

<div class="blog-stats">
    {#if $userHasLikedCommentQuery.data}
        <HeartIcon
            class="cursor-pointer [&>path]:fill-rose-600 fill-rose-600 stroke-rose-600"
            width={16}
            height={16}
            on:click={() => {
                $dislikeCommentMutation.mutate(commentId)
            }}
        />
    {/if}

    {#if !$userHasLikedCommentQuery.data}
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
