<script lang="ts">
    import HeartIcon from "$lib/icons/heart-icon.svelte";
    import {useQueryClient} from "@tanstack/svelte-query";
    import {page} from "$app/stores";
    import {useNumberOfBlogLikesQuery} from "$lib/blog/queries/use-number-of-blog-likes-query";
    import {useUserHasLikedBlogQuery} from "$lib/blog/queries/use-user-has-liked-blog-query";
    import type {Blog} from "$lib/types/blog";
    import {useLikeBlogMutation} from "$lib/blog/mutations/use-like-blog-mutation";
    import {useDislikeBlogMutation} from "$lib/blog/mutations/use-dislike-blog-mutation.js";

    const userId = $page.data?.currentUser?.id;
    const blogId = $page.params.blog_id as Blog['id'];

    const queryClient = useQueryClient();

    let numberOfBlogLikesQuery: ReturnType<typeof useNumberOfBlogLikesQuery>;

    $: numberOfBlogLikesQuery = useNumberOfBlogLikesQuery(
        blogId
    );

    let userHasLikedBlogQuery: ReturnType<typeof useUserHasLikedBlogQuery>;

    $: userHasLikedBlogQuery = useUserHasLikedBlogQuery({
        userId,
        blogId
    });

    const likeBlogMutation = useLikeBlogMutation({
        onSuccess: () => {
            void queryClient.invalidateQueries({
                queryKey: ['blog', blogId, 'likes']
            });
        }
    });

    const dislikeBlogMutation = useDislikeBlogMutation({
        onSuccess: () => {
            void queryClient.invalidateQueries({
                queryKey: ['blog', blogId, 'likes']
            });
        },
    });
</script>

<div class="blog-stats select-none">

    {#if ($userHasLikedBlogQuery.data === undefined || $userHasLikedBlogQuery.isLoading)}
        <HeartIcon
                class="stroke-gray-500 [&>path]:fill-transparent"
        />
    {:else}
        {#if $userHasLikedBlogQuery.data}
            <HeartIcon
                    on:click={() => {
                        if($dislikeBlogMutation.isPending) {
                            return;
                        }

                        $dislikeBlogMutation.mutate(blogId);
                    }}
                    class="cursor-pointer [&>path]:fill-rose-600 fill-rose-600 stroke-rose-600"
            />
        {/if}

        {#if !$userHasLikedBlogQuery.data}
            <HeartIcon
                    on:click={() => {
                        if($likeBlogMutation.isPending) {
                            return;
                        }
                        $likeBlogMutation.mutate(blogId);
                    }}
                    class="cursor-pointer stroke-black [&>path]:fill-transparent"
            />
        {/if}
    {/if}

    {#if ($numberOfBlogLikesQuery.data === undefined || $numberOfBlogLikesQuery.isLoading)}
        <span class="text-gray-400 opacity-70">
            -
        </span>
    {/if}

    {#if $numberOfBlogLikesQuery.isError}
        <span>
            -
        </span>
    {/if}

    {#if $numberOfBlogLikesQuery.isSuccess}
        <span>
            {$numberOfBlogLikesQuery.data}
        </span>
    {/if}
</div>
