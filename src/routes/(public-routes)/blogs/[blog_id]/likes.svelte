<script lang="ts">
    import HeartIcon from "$lib/icons/heart-icon.svelte";
    import {enhance, applyAction} from '$app/forms'
    import type {SubmitFunction} from "@sveltejs/kit";
    export let userHasLikedBlog: boolean;
    export let numberOfLikes: number;

    const onDislikeBlog: SubmitFunction = () => async ({result}) => {
        if (result.type === 'success') {
            userHasLikedBlog = false;
            numberOfLikes--;
        }

        await applyAction(result);
    };

    const onLikeBlog: SubmitFunction = () => async ({result}) => {
        if (result.type === 'success') {
            userHasLikedBlog = true;
            numberOfLikes++;
        }

        await applyAction(result);
    };


</script>

<div class=" w-max flex rounded-[50px] px-1.5 py-0.5 border border-[#ccc] gap-[4px] items-center text-sm">
    {#if userHasLikedBlog}
        <form
                class="flex"
                action="?/dislike-blog"
                method="post"
                use:enhance={onDislikeBlog}
        >

            <label class="flex">
                <input type="submit" class="hidden">
                <HeartIcon class="cursor-pointer [&>path]:fill-rose-600 fill-rose-600 stroke-rose-600" />
            </label>
        </form>
    {/if}

    {#if !userHasLikedBlog}
        <form
            class="flex"
            action="?/like-blog"
            method="post"
            use:enhance={onLikeBlog}
        >
            <label class="flex">
                <input type="submit" class="hidden">

                <HeartIcon class="cursor-pointer stroke-black [&>path]:fill-transparent" />
            </label>
        </form>
    {/if}

    <span>{numberOfLikes}</span>
</div>
