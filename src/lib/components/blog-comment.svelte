<script lang="ts">
    import dayjs from "dayjs";
    import type {BlogComment} from "$lib/types/blog-comment";
    import ReplyToCommentForm from "$lib/components/reply-to-comment-form.svelte";
    import NumberOfCommentLikes from "$lib/components/number-of-comment-likes.svelte";

    export let comment: BlogComment;

    let isReplyingToComment = false;

    const onReplyButtonClick = () => {
        isReplyingToComment = !isReplyingToComment;
    };
</script>

<div
    class="border-solid border-2 mb-2 flex p-2.5 gap-x-2.5 flex-col rounded"
>
    <div class="flex gap-x-2 items-center">
        <div class="avatar w-[20px] h-[20px] rounded-[50%] bg-gray-500"></div>

        <div class="text-xs">
            {comment.author.email}
        </div>

        <div class="text-xs text-[#656D76]">
            {dayjs(comment.createdAt).format('D MMM, YYYY')}
        </div>
    </div>

    <div class="text-base my-3.5">
        {comment.content}
    </div>


    <div class="flex items-center gap-x-2.5 mb-2">
        <NumberOfCommentLikes
            commentId={comment.id}
            numberOfLikes={comment.numberOfLikes}
            userHasLikedComment={comment.userHasLikedComment}
        />

        <button
            on:click={onReplyButtonClick}
        >
            Reply
        </button>
    </div>

    <ReplyToCommentForm
        {isReplyingToComment}
        commentId={comment.id}
    />
</div>

