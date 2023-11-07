<script lang="ts">
    import Likes from './likes.svelte';
    export let data;

    let {
        blog,
        numberOfLikes,
        userHasLikedBlog,
        blogTags
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
            {#each blogTags as tag}
                <p>{tag.name}</p>
            {/each}
        </div>
    </div>

    {@html blog.content}
</div>



