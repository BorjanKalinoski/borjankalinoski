<script lang="ts">
    import CommentIcon from "$lib/icons/comment-icon.svelte";
    import {page} from "$app/stores";
    import type {Blog} from "$lib/types/blog";
    import {useNumberOfBlogCommentsQuery} from "$lib/blog/queries/use-number-of-blog-comments-query";

    const blogId = $page.params.blog_id as Blog['id'];

    let numberOfBlogCommentsQuery: ReturnType<typeof useNumberOfBlogCommentsQuery>;

    $: numberOfBlogCommentsQuery = useNumberOfBlogCommentsQuery({ blogId });

</script>

<div class="blog-stats">
    {#if ($numberOfBlogCommentsQuery.data === undefined || $numberOfBlogCommentsQuery.isLoading)}
        <CommentIcon class="[&>path]:fill-gray-400 fill-gray-400 opacity-70"/>

        <span class="text-gray-400 opacity-70">
            -
        </span>
    {:else if ($numberOfBlogCommentsQuery.isError)}
        <CommentIcon />

        <span>
            -
        </span>
    {:else}
        <CommentIcon />

        <span>
            {$numberOfBlogCommentsQuery.data}
        </span>
    {/if}
</div>
