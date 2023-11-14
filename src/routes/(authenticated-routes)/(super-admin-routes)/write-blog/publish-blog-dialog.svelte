<script lang="ts">
    import CloseIcon from '$lib/icons/close-icon.svelte'
    import LoadingSpinner from '$lib/components/loading-spinner.svelte'
    import MultiSelect from 'svelte-multiselect'
    import type {Tag} from "$lib/types/tag";
    import {superForm} from "sveltekit-superforms/client";
    import type {PageServerData, ActionData} from "./$types";
    import {toast} from "@zerodevx/svelte-toast";
    import {extractErrorMessage} from "$lib/utils/extract-error-message";
    import {goto} from "$app/navigation";
    import type {Blog} from "$lib/types/blog";
    import {afterUpdate} from "svelte";

    export let serverForm: PageServerData['form'];
    export let title: string;
    export let content: string;

    export let publishBlogDialog: HTMLDialogElement;
    export let tags: Tag[];

    const {form, enhance, submitting, reset} = superForm(serverForm, {
        dataType: 'json',
        onError: (event) => {
            toast.push(
                extractErrorMessage(event.result.error)
            );
        },
        onResult: async ({result}) => {
            const isBlogPublished = result.type === 'success'
                && !!(result?.data as ActionData)?.blogId;

            if (isBlogPublished) {
                const blogId = (result.data as ActionData)?.blogId as Blog['id'];

                toast.push('Your blog has been successfully published!');

                await goto(`blogs/${blogId}`);
            }
        },
    });

    export const allTagsWithNames = tags.map((tag) => tag.name);

    afterUpdate(() => {
        $form.content = content;
        $form.title = title;
    });

    let selectedTags: string[] = [];

    let thumbnailInput: HTMLInputElement;

    const onCloseDialog = () => {
        thumbnailInput.value = '';
        reset();
    };

</script>

<dialog bind:this={publishBlogDialog} class="relative w-[500px] h-[300px] rounded flex flex-col px-8 py-5 [&:not([open])]:hidden" on:close={onCloseDialog} >
    <CloseIcon
       on:click={() => publishBlogDialog.close()}
       class="absolute right-1.5 top-1.5 cursor-pointer h-5 w-5"
   />

    <h1 class="mb-4">
        Preview
    </h1>

    <form
        method="POST"
        enctype="multipart/form-data"
        use:enhance
        class="flex flex-col gap-2.5 h-full"
    >
        <input
            type="text"
            bind:value={$form.content}
            name="content"
            hidden
        >

        <input
            type="text"
            bind:value={$form.title}
            name="title"
            hidden
        >

        <div>
            <label
                class="text-sm"
                for="tags"
            >
                Tags
            </label>

            <MultiSelect
                id="tags"
                outerDivClass=" inp&:placeholder-shown:!hidden"
                placeholder="Add up to 5 tags related to your blog"
                name="tags"
                ulOptionsClass="!max-h-[135px] !overflow-y-scroll"
                maxSelect={5}
                options={allTagsWithNames}
                allowUserOptions={true}
                bind:selected={selectedTags}
                bind:value={$form.tags}
            />
        </div>

        <div>
            <label
                class="text-sm"
                for="thumbnail"
            >
                Thumbnail
            </label>

            <input
                id="thumbnail"
                bind:this={thumbnailInput}
                type="file"
                bind:value={$form.thumbnail}
                name="thumbnail"
                class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            />
        </div>

        <button
            type="submit"
            class="mt-auto flex gap-x-2.5 items-center justify-center rounded bg-blue-600 px-4 py-2 text-xs text-white font-medium uppercase  shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-blue-900 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-blue-900 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none active:bg-blue-900 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
            disabled={$submitting}
        >
            {#if $submitting}
                <LoadingSpinner/>
            {/if}

            Publish
        </button>
    </form>
</dialog>
<!-- Fix issue where duplicate tags are entered -->
