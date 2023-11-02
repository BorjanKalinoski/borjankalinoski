<script>
    import MainLayout from '../../lib/layouts/main-layout.svelte'

    export let data;

</script>

<MainLayout data={data}>
    <slot/>
</MainLayout>
