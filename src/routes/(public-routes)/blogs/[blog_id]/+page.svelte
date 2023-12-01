<script lang="ts">
    /* eslint-disable svelte/no-at-html-tags */
    import NumberOfBlogLikes from '$lib/blog/components/number-of-blog-likes.svelte';
    import NumberOfBlogComments from './number-of-blog-comments.svelte';
    import Tag from '$lib/components/tag.svelte';
    import {filterBlogsByTagNames} from "$lib/utils/filter-blogs-by-tag-names";
    import type {PageServerData} from "./$types";
    import BlogComment from "$lib/components/blog-comment.svelte";
    import { useCommentsQuery } from "$lib/comments/queries/use-comments-query";
    import AddCommentForm from "./add-comment-form.svelte";
    import {getTimeToReadInMinutes} from "$lib/utils/get-time-to-read-in-minutes";
    import dayjs from "dayjs";
    export let data: PageServerData;

    let commentsQuery: ReturnType<typeof useCommentsQuery>;

    $: commentsQuery = useCommentsQuery(data.blog.id);
</script>

<style>
    @import 'blog.css';
</style>

<div class="blog">
    <h1 class="font-bold text-2xl">
        {data.blog.title}
    </h1>

    <div class="flex items-center gap-x-2.5 py-2 border-t-[1px] border-[#ccc]">
        <div class="w-8 h-8 rounded-[50%] bg-gray-500"></div>

        <div>
            <div class="text-xs">
                {data.blog.creator.email}
            </div>

            <div class="text-xs text-gray-400">
                {dayjs(data.blog.createdAt).format('D MMM, YYYY')}
            </div>
        </div>
    </div>

    <div class="border-y-[1px] border-[#ccc] py-2.5 flex flex-col gap-2.5">
        <div class="flex gap-x-2.5 items-center">
            <NumberOfBlogLikes />

            <NumberOfBlogComments />
        </div>

        <div class="flex gap-2.5">
            {#each data.blog.tags as tag}
                <Tag
                    on:click={async () => await filterBlogsByTagNames([tag.name])}
                    {tag}
                />
            {/each}
        </div>

        <div class="text-gray-600 text-xs">
            {getTimeToReadInMinutes({
                wordCount: data.blog.wordCount
            })} min read
        </div>
    </div>

    <div class="py-1.5 mb-5 border-b-[1px] border-[#ccc]">
        {@html data.blog.content}
    </div>

    <AddCommentForm />

    {#each $commentsQuery.data as comment}
        <BlogComment comment={comment} />
    {/each}
</div>
