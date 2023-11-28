<script lang="ts">
    /* eslint-disable svelte/no-at-html-tags */
    import NumberOfBlogLikes from './number-of-blog-likes.svelte';
    import NumberOfBlogComments from './number-of-blog-comments.svelte';
    import Tag from '$lib/components/tag.svelte';
    import {filterBlogsByTagNames} from "$lib/utils/filter-blogs-by-tag-names";
    import {superForm} from "sveltekit-superforms/client";
    import type {PageServerData} from "./$types";
    import LoadingSpinner from "$lib/components/loading-spinner.svelte";
    import {toast} from "@zerodevx/svelte-toast";
    import {extractErrorMessage} from "$lib/utils/extract-error-message";
    import BlogComment from "$lib/components/blog-comment.svelte";
    import { useCommentsQuery } from "$lib/comments/queries/use-comments-query";

    export let data: PageServerData;

    const {
        form: addCommentForm,
        enhance,
        submitting,
        reset,
    } = superForm(data.addCommentForm, {
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

    const commentsQuery = useCommentsQuery();
</script>

<style>
    @import 'blog.css';
</style>

<div class="blog">
    <h1 class="font-bold text-2xl py-2">
        {data.blog.title}
    </h1>

    <div class="border-y-[1px] border-[#ccc] py-2.5 flex flex-col gap-2.5">
        <div class="flex gap-x-2.5 items-center">
            <NumberOfBlogLikes
                userHasLikedBlog={data.blog.userHasLikedBlog}
                numberOfBlogLikes={data.blog.numberOfLikes}
            />

            <NumberOfBlogComments
                numberOfBlogComments={data.blog.numberOfComments}
            />
        </div>

        <div class="flex gap-2.5">
            {#each data.blog.tags as tag}
                <Tag
                    on:click={async () => await filterBlogsByTagNames([tag.name])}
                    {tag}
                />
            {/each}
        </div>
    </div>

    <div class="py-1.5 mb-5 border-b-[1px] border-[#ccc]">
        {@html data.blog.content}
    </div>


    <form
        use:enhance
        method="post"
        action="?/add-comment"
        class="flex flex-col items-end gap-y-4 mb-5"
    >
        <textarea
            bind:value={$addCommentForm.content}
            class="outline-0 bg-gray-50 rounded w-full h-16 p-2"
            placeholder="Write your comment"
            name="content"
        ></textarea>

        <button
            type="submit"
            class="bg-blue-400 px-2.5 py-2 text-white rounded flex items-center justify-center break-after-auto w-28 h-8"
            disabled={$submitting}
        >
            {#if $submitting}
                <LoadingSpinner />
            {:else}
                Comment
            {/if}
        </button>
    </form>

    {#if $commentsQuery.data}
        {#each $commentsQuery.data as comment}
            <BlogComment comment={comment} />
        {/each}
    {:else}
        <LoadingSpinner />
    {/if}

</div>
