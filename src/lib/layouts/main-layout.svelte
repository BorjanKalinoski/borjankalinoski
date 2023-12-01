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
    import type {User} from "$lib/types/user";
    import {userCanCreateContent} from "$lib/utils/user-can-create-content";

    export let data: {
        isAuthenticated: boolean;
        currentUser?: User;
    };

</script>

<header>
    <a href="/blogs">Blogs</a>

    {#if data.currentUser && userCanCreateContent(data.currentUser.role)}
        <a href="/write-blog">Write a blog</a>
    {/if}

    <a href="/cv">CV</a>

    {#if (data.isAuthenticated)}
        <form action="/sign-out" method="POST">
            <button type="submit">Log out</button>
        </form>
    {:else }
        <a href="/sign-up">Sign up</a>
    {/if}
</header>

<main>
    <slot/>
</main>
