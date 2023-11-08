<script lang="ts">
    import Likes from './likes.svelte';
    export let data;

    let {
        blog,
        numberOfLikes,
        userHasLikedBlog,
    } = data;
</script>

<style>
    @import 'blog.css';
</style>

<div class="blog">
    <h1 class="font-bold text-2xl">
        {blog.title}
    </h1>

    <div class="border-y-[1px] border-[#ccc] py-2.5 flex flex-col gap-2.5">
        <Likes {userHasLikedBlog} {numberOfLikes} />
        <div class="flex gap-2.5">
            {#each blog.tags as tag}
                <button class="bg-gray-500 flex px-2 py-1 rounded text-white cursor-pointer text-xs">
                    {tag.name}
                </button>
            {/each}
        </div>
    </div>

    {@html blog.content}
</div>



<!-- 1. List tags in blogs page-->
