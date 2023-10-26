<style>
    @import "../../app.css";

    header {
        display: flex;
        justify-content: flex-end;
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
    }
</style>

<script>
    export let data

    console.log('data',data)
</script>

<header>
    <a href="/blogs">Blogs</a>
    <a href="/write-blog">Write a blog</a>
    <a href="/cv">CV</a>
    <a href="/sign-up">Sign Up</a>
    <form action="/sign-out" method="POST">
        <button type="submit">Log out</button>
    </form>
</header>

<main>
 <slot/>
</main>

