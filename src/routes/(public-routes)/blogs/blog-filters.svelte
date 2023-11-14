<script lang="ts">
    import {type DispatchEvents, MultiSelect,} from "svelte-multiselect";
    import type {PageServerData} from "./$types";
    import {page} from "$app/stores";
    import {filterBlogsByTagNames} from "$lib/utils/filter-blogs-by-tag-names";
    export let tags: PageServerData['tags'];

    let selectedTags: string[] = $page.url.searchParams
            .get('tags')
            ?.split?.(',')
            ?.filter(Boolean)
        ?? [];

    $: {
        selectedTags = Object.fromEntries($page.url.searchParams)?.tags
            ?.split?.(',')
            ?.filter(Boolean) ?? [];
    }

    const onChangeTagsFilter = async (event: CustomEvent<DispatchEvents['change']>) => {
        await filterBlogsByTagNames(
            event.detail.type === 'removeAll'
                ? []
                : selectedTags
        );
    };

</script>


<MultiSelect
        options={tags.map((tag) => tag.name)}
        bind:selected={selectedTags}
        on:change={onChangeTagsFilter}
/>
