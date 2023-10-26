
<style>


</style>

<script lang="ts">
    import dayjs from "dayjs";

    export let data;

    const blogs = data.blogs;
    console.log(blogs)

</script>


{#each blogs as blog}
    <div style="max-width: 320px; margin: auto" on:click={()=>console.log('magare')}>
        <img
            style="width: 100%; height: 200px; object-fit: cover;"
            src="{blog.thumbnailImageDownloadUrl}"
            alt="{blog.title}"
        />
           <div>{dayjs(blog.createdAt).format('DD.MM.YYYY')}</div>
        <h1><a href="blogs/{blog.id}">{blog.title}</a></h1>
    </div>
{/each}

