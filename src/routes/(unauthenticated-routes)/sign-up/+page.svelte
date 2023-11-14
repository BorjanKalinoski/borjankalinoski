<script lang="ts">
    import {goto} from "$app/navigation";
    import {superForm} from "sveltekit-superforms/client";
    import {toast} from "@zerodevx/svelte-toast";
    import {extractErrorMessage} from "$lib/utils/extract-error-message";

    export let data;

    const {form, errors, enhance, submitting} = superForm(data.form, {
        onError: (event) => {
            toast.push(
                extractErrorMessage(event.result.error)
            )
        },
        onResult: async ({result}) => {
            const isSignUpSuccessful = result.type === 'success';

            if (isSignUpSuccessful) {
                await goto('/sign-in')
            }
        },
    });

</script>

<div class="flex w-screen h-screen justify-center items-center bg-gray-50">
    <form
            action="?/sign-up"
            method="POST"
            use:enhance
            class="flex flex-col w-[300px] m-auto bg-gray-400 p-4 text-center items-stretch rounded-xl"
    >

        <input class="rounded p-2 mb-3" type="email" name="email" placeholder="john@doe.com" bind:value={$form.email}>
        <input class="rounded p-2 mb-3" type="password" name="password" placeholder="***********" bind:value={$form.password}>

        <button
            type="submit"
            class="bg-blue-500 text-white rounded w-[100%] p-2 mb-3"
            disabled={$submitting}
        >
            {#if $submitting}
                <span class="animate-spin">🔄</span>
            {:else}
                Sign Up
            {/if}
        </button>

        <em class="text-xs p-2 ">or</em>

        <button
            type="button"
            class="bg-white p-2 rounded"
            disabled={$submitting}
            on:click={async ()=>await goto('/sign-in')}
        >
            Sign In
        </button>

    </form>


</div>

