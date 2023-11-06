<script lang="ts">
    import Likes from './likes.svelte';
    export let data;

    let {
        blog,
        numberOfLikes,
        userHasLikedBlog
    } = data;

</script>

<style>
    @import 'blog.css';
</style>



<div class="blog">
    <h1 class="font-bold text-2xl">
        {blog.title}
    </h1>

    <div class="border-y-[1px] border-[#ccc] py-2.5">
        <Likes {userHasLikedBlog} {numberOfLikes} />
    </div>

    {@html blog.content}
</div>



