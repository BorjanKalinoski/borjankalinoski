<script lang="ts">
    import {superForm} from "sveltekit-superforms/client";
    import {goto} from "$app/navigation";
    import {toast} from "@zerodevx/svelte-toast";
    import {extractErrorMessage} from "$lib/utils/extract-error-message";

    export let data;

    const {form, errors, enhance, submitting} = superForm(data.form, {
        onError: (event) => {
            toast.push(
                extractErrorMessage(
                    event.result.error
                )
            );
        },
    });
</script>

<form
        use:enhance
        action="?/sign-in"
        method="POST"
        class="flex flex-col w-[300px] m-auto bg-gray-400 p-4 text-center items-stretch rounded-xl"
>
    <input
            bind:value={$form.email}
            class="rounded p-2 mb-3"
            type="email"
            name="email"
            placeholder="john@doe.com"
    >
    <input
            bind:value={$form.password}
            class="rounded p-2 mb-3"
            type="password"
            name="password"
            placeholder="***********"
    >

    <button class="bg-blue-500 text-white rounded w-[100%] p-2 mb-3">
        {#if $submitting}
            <span class="animate-spin">⏳</span>
        {:else}
            Sign in
        {/if}
    </button>

    <p class="text-sm p-2 mb-5">Forgot your password?</p>

    <em class="text-xs p-2 ">or</em>

    <button
        type="button"
        class="bg-white p-2 rounded"
        on:click={async ()=>await goto('/sign-up')}
    >
        Create account
    </button>

</form>

