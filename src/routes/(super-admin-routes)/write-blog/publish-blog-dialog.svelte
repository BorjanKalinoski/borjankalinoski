<style>
    dialog:not([open]){
        display:none;
    }


    dialog{
        display:grid;
    }
</style>

<script lang="ts">
    import CloseIcon from '$lib/icons/close-icon.svelte'
    import MultiSelect from 'svelte-multiselect'
    import type {Tag} from "$lib/types/tag";

    export let publishBlogDialog: HTMLDialogElement;
    export let form;
    export let enhance;
    export let tags: Tag[];

    export const allTagsWithNames = tags.map((tag) => tag.name);

    let selectedTags: string[] = [];
</script>

<dialog bind:this={publishBlogDialog} class="relative w-[500px]  rounded flex flex-col px-8 py-5">
    <CloseIcon
       on:click={() => publishBlogDialog.close()}
       class="cursor-pointer h-5 w-5 absolute right-1.5 top-1.5"
   />

    <h1 class="mb-4">
        Preview your article
    </h1>

    <form method="POST" enctype="multipart/form-data" use:enhance>
        <input type="text" bind:value={$form.content} name="content" hidden>
        <input type="text" bind:value={$form.title} name="title" hidden>

        <MultiSelect
            name="tags"
            maxSelect={5}
            options={allTagsWithNames}
            allowUserOptions={true}
            bind:selected={selectedTags}
            bind:value={$form.tags}
        />

        <input
            bind:value={$form.thumbnail}
            name="thumbnail"
            type="file"
            class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        />

        <button type="submit"
                class="mt-auto rounded bg-blue-600 px-4 py-2 text-xs text-white font-medium uppercase  shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-blue-900 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-blue-900 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none active:bg-blue-900 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
        >
            Publish
        </button>
    </form>
</dialog>
