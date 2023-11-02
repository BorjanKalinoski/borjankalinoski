<style>
    header {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 10px;
        padding: 20px;
        border-bottom: 1px solid slategray;
        width: 100%;
    }

    header a {
        padding: 5px 10px
    }

    main {
        padding: 24px 32px;
        flex-grow: 1;
        overflow-y: auto;
    }
</style>

<script lang="ts">
    export let data;

    const isAuthenticated = data.isAuthenticated;
</script>

<header>
    <a href="/blogs">Blogs</a>
    <a href="/write-blog">Write a blog</a>
    <a href="/cv">CV</a>

    {#if (isAuthenticated)}
        <form action="/sign-out" method="POST">
            <button type="submit">Log out</button>
        </form>
    {/if}

    {#if (!isAuthenticated)}
        <a href="/sign-up">Sign up</a>
    {/if}
</header>

<main>
    <slot/>
</main>
