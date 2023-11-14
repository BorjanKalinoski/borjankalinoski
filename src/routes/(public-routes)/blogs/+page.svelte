<script lang="ts">
    import dayjs from "dayjs";
    import Tag from '$lib/components/tag.svelte'
    import type {PageServerData} from "./$types";
    import BlogFilters from './blog-filters.svelte';
    import {filterBlogsByTagNames} from "$lib/utils/filter-blogs-by-tag-names";

    export let data: PageServerData;
</script>


<div class="flex justify-center items-center mb-5">
    <BlogFilters tags={data.tags} />
</div>

{#each data.blogs as {id, title, tags, thumbnailImageDownloadUrl, createdAt}}
        <div class="max-w-[320px] m-auto mb-6 p-2 border border-gray-300 rounded-lg" >
            <a href="/blogs/{id}">
                <img
                    class="w-full h-[200px] object-cover shadow rounded-lg"
                    src={thumbnailImageDownloadUrl}
                    alt={title}
                />
            </a>

            <div class="flex flex-col gap-1.5 mt-3">
                <a class="font-bold leading-[100%] text-lg" href="blogs/{id}">
                    {title}
                </a>

               <div class="text-sm">
                   {dayjs(createdAt).format('D MMM, YYYY')}
               </div>

                <div class="flex gap-x-2.5 gap-y-1.5 flex-wrap">
                    {#each tags as tag}
                        <Tag
                            on:click={async ()=> await filterBlogsByTagNames([tag.name])}
                            {tag}
                        />
                    {/each}
                </div>

            </div>
        </div>
{/each}

