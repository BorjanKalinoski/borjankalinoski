<script lang="ts">
    export let data;

    const blog = data.blog;
</script>

<style>
    @import 'blog.css';
</style>


<div class="blog">
    {@html blog.content}
</div>
