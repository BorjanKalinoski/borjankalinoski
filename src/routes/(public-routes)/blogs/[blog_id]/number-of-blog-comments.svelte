<script lang="ts">
import CommentIcon from "$lib/icons/comment-icon.svelte";

export let numberOfBlogComments: number = 0;

</script>

<div class="blog-stats">
    <CommentIcon />

    {numberOfBlogComments}
</div>
