<script lang="ts">
    import HeartIcon from "$lib/icons/heart-icon.svelte";

    export let numberOfLikes: number;
    export let userHasLikedComment: boolean = false;
    export let commentId: string;

    import {enhance} from '$app/forms'

</script>

<div class="blog-stats">
    {#if userHasLikedComment}
        <form action="?/dislike-comment" method="post" use:enhance>
            <label>
                <input type="submit" class="hidden">

                <input type="text" name="commentId" class="hidden" value={commentId}>

                <HeartIcon
                        class="cursor-pointer [&>path]:fill-rose-600 fill-rose-600 stroke-rose-600"
                        width={16}
                        height={16}
                />
            </label>
        </form>
    {/if}

    {#if !userHasLikedComment}
        <form action="?/like-comment" method="post" use:enhance>
            <label>
                <input type="submit" class="hidden">

                <input type="text" name="commentId" class="hidden" value={commentId}>

                <HeartIcon
                        class="[&>path]:fill-white stroke-black cursor-pointer"
                        width={16}
                        height={16}
                />
            </label>
        </form>
    {/if}

    <span class="text-xs">
        {numberOfLikes}
    </span>
</div>
