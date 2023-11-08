<script lang="ts">
    import type {Tag} from "$lib/types/tag";

    export let tag: Tag;
</script>


<button class="bg-gray-500 flex px-2 py-1 rounded text-white cursor-pointer text-xs">
    {tag.name}
</button>
