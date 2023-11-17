<script lang="ts">
    import HeartIcon from "$lib/icons/heart-icon.svelte";
    import {enhance} from '$app/forms'
    export let userHasLikedBlog: boolean;
    export let numberOfBlogLikes: number;

</script>

<div class="blog-stats">
    {#if userHasLikedBlog}
        <form
                class="flex"
                action="?/dislike-blog"
                method="post"
                use:enhance
        >

            <label class="flex">
                <input type="submit" class="hidden">
                <HeartIcon class="cursor-pointer [&>path]:fill-rose-600 fill-rose-600 stroke-rose-600" />
            </label>
        </form>
    {/if}

    {#if !userHasLikedBlog}
        <form
            class="flex"
            action="?/like-blog"
            method="post"
            use:enhance
        >
            <label class="flex">
                <input type="submit" class="hidden">

                <HeartIcon class="cursor-pointer stroke-black [&>path]:fill-transparent" />
            </label>
        </form>
    {/if}

    <span>{numberOfBlogLikes}</span>
</div>
