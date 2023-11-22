<script lang="ts">
    import HeartIcon from "$lib/icons/heart-icon.svelte";
    export let numberOfCommentLikes: number = 0;
</script>

<div class="blog-stats">
    <HeartIcon
        class="[&>path]:fill-white stroke-black cursor-pointer"
        width={16}
        height={16}
    />

    <span class="text-xs">
        {numberOfCommentLikes}
    </span>
</div>
