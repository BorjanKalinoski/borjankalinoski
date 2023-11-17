<script lang="ts">
    /* eslint-disable svelte/no-at-html-tags */
    import Likes from './likes.svelte';
    import Tag from '$lib/components/tag.svelte';
    import {filterBlogsByTagNames} from "$lib/utils/filter-blogs-by-tag-names";
    import {superForm} from "sveltekit-superforms/client";
    import type {PageServerData} from "./$types";

    export let data: PageServerData;

    const {form, enhance, submitting} = superForm(data.form);

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
                <Tag
                    on:click={async () => await filterBlogsByTagNames([tag.name])}
                    {tag}
                />
            {/each}
        </div>
    </div>

    {@html content}

    <hr>

    <form
        use:enhance
        method="post"
        action="?/add-comment"
        class="flex flex-col items-end gap-y-4"
    >
        <textarea
            bind:value={$form.comment}
            class="bg-gray-50 rounded w-full h-16 p-2"
            placeholder="Write your comment here"
            name="comment"
        ></textarea>

        <button
            type="submit"
            class="bg-blue-400 px-2.5 py-1 text-white rounded"
            disabled={$submitting}
        >
            Post Comment
        </button>
    </form>
</div>
