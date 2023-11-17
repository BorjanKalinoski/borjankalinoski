<script lang="ts">
    /* eslint-disable svelte/no-at-html-tags */
    import Likes from './likes.svelte';
    import Tag from '$lib/components/tag.svelte';
    import {filterBlogsByTagNames} from "$lib/utils/filter-blogs-by-tag-names";
    import {superForm} from "sveltekit-superforms/client";
    import type {PageServerData} from "./$types";
    import LoadingSpinner from "$lib/components/loading-spinner.svelte";
    import {toast} from "@zerodevx/svelte-toast";
    import {extractErrorMessage} from "$lib/utils/extract-error-message";

    export let data: PageServerData;

    const {form, enhance, submitting, reset} = superForm(data.form, {
        onError: (event) => {
            toast.push(
                extractErrorMessage(event.result.error)
            );
        },
        onUpdated: ({form}) => {
            if (form.valid) {
                reset();
                toast.push('Your comment was added successfully!');
            }
        }
    });

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
            class="bg-blue-400 px-2.5 py-2 text-white rounded flex items-center justify-center break-after-auto w-36 h-8"
            disabled={$submitting}
        >
            {#if $submitting}
                <LoadingSpinner />
            {:else}
                Add Comment
            {/if}
        </button>
    </form>
</div>
