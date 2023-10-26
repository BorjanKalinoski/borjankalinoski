<script lang="ts">
    import type { PageData } from '.././$types';
    import {TextEditor} from "$lib/text-editor";
    import {onMount} from "svelte";

    export let data: PageData;
    console.log(data)
    //

    let editorReference: HTMLDivElement;

    onMount(() => {
        new TextEditor({
            type:'bubble',
            editorReference,
            initialState:data.blog.content,
            readOnly: true,
        })
    });


</script>

<div style="
        height: 100vh;
        display: flex;
        flex-direction: column;
">
    <div bind:this={editorReference}></div>

</div>

<div>hi</div>
