<script lang="ts">
    import HeartIcon from "$lib/icons/heart-icon.svelte";
    import {createMutation, createQuery, useQueryClient} from "@tanstack/svelte-query";

    export let commentId: string;

    const commentQuery = createQuery({
        queryKey: ['comments', commentId],
        queryFn: async () => {
            const res = await fetch(`/api/comments/${commentId}`);
            return await res.json();
        },
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchInterval: false,
        refetchIntervalInBackground: false,
    });


    const queryClient = useQueryClient();

    const dislikeCommentMutation = createMutation({
        mutationFn: async () => {
            return await fetch(`/api/comments/${commentId}/dislike`, {
                method: 'POST',
            });
        },
        onSuccess: () => {
            void queryClient.setQueryData(['comments', commentId], (old) => {
                return {
                    ...old,
                    numberOfLikes: old.numberOfLikes - 1,
                    userHasLikedComment: false,
                }
            });
        }
    });

    const likeCommentMutation = createMutation({
        mutationFn: async () => {
            return await fetch(`/api/comments/${commentId}/like`, {
                method: 'POST',
            });
        },
        onSuccess: () => {
            void queryClient.setQueryData(['comments', commentId], (old) => {

                return {
                    ...old,
                    numberOfLikes: old.numberOfLikes + 1,
                    userHasLikedComment: true,
                }
            });
        }
    });

</script>

<div class="blog-stats">
    {#if ($commentQuery.data.userHasLikedComment)}
        <HeartIcon
            class="cursor-pointer [&>path]:fill-rose-600 fill-rose-600 stroke-rose-600"
            width={16}
            height={16}
            on:click={()=>{
                $dislikeCommentMutation.mutate()
            }}
        />
    {/if}

    {#if (!$commentQuery.data.userHasLikedComment)}
        <HeartIcon
            class="[&>path]:fill-white stroke-black cursor-pointer"
            width={16}
            height={16}
            on:click={() => {
                $likeCommentMutation.mutate()
            }}
        />
    {/if}

    <span class="text-xs">
        {$commentQuery.data.numberOfLikes}
    </span>
</div>
