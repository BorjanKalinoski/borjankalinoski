<script lang="ts">
    import { SvelteToast } from '@zerodevx/svelte-toast'
    import {QueryClientProvider} from "@tanstack/svelte-query";

    export let data;

</script>

<style>
    @import "../app.css";
</style>

<QueryClientProvider client={data.queryClient}>
    <slot/>
    <SvelteToast />
</QueryClientProvider>


