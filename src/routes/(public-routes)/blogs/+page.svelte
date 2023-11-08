<script lang="ts">
    import dayjs from "dayjs";

    export let data;

    const blogs = data.blogs;
</script>

{#each blogs as blog}
        <div style="max-width: 320px; margin: auto; margin-bottom: 20px">
            <a href="/blogs/{blog.id}">
                <img
                    style="width: 100%; height: 200px; object-fit: cover;"
                    src="{blog.thumbnailImageDownloadUrl}"
                    alt="{blog.title}"
                />
            </a>

               <div>{dayjs(blog.createdAt).format('DD.MM.YYYY HH:mm')}</div>

            <div class="flex gap-2.5">
                {#each blog.tags as tag}
                    <button class="bg-gray-500 flex px-2 py-1 rounded text-white cursor-pointer text-xs">
                        {tag.name}
                    </button>
                {/each}
            </div>
            <h1><a href="blogs/{blog.id}">{blog.title}</a></h1>
        </div>
{/each}

