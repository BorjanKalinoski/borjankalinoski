<script lang="ts">
    /* eslint-disable svelte/no-at-html-tags */
    import Likes from './likes.svelte';
    import Tag from '$lib/components/tag.svelte';
    export let data;

    let {
        blog: {
            title,
            tags,
            content,
            numberOfLikes,
            userHasLikedBlog
        },
    } = data;
</script>

<style>
    @import 'blog.css';
</style>

<div class="blog">
    <h1 class="font-bold text-2xl">
        {title}
    </h1>

    <div class="border-y-[1px] border-[#ccc] py-2.5 flex flex-col gap-2.5">
        <Likes {userHasLikedBlog} {numberOfLikes} />

        <div class="flex gap-2.5">
            {#each tags as tag}
                <Tag {tag}/>
            {/each}
        </div>
    </div>

    {@html content}
</div>
