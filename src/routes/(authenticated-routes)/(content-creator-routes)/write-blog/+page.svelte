<style>
    @import '$lib/text-editor/styles/default-text-editor.css';

    .editor-container {
        height: 100%;
        display: flex;
        flex-direction: column;
    }
</style>

<script lang="ts">
    import {onMount} from 'svelte';
    import PublishBlogDialog from './publish-blog-dialog.svelte'
    import {TextEditor, type TextEditorInitialState} from "$lib/text-editor";
    import {TextEditorHeading} from "$lib/text-editor/text-editor-heading";
    import {TextEditorSource} from "$lib/text-editor/text-editor-source";
    import {uploadFile} from "$lib/storage/upload-file";
    import {getDownloadUrl} from "$lib/storage/get-download-url";

    export let data;

    const tags = data.tags;

    let title: string;
    let content: string;
    let wordCount: number;

    let publishBlogDialog: HTMLDialogElement;

    let editorReference: HTMLDivElement;
    let textEditor: TextEditor;

    const toolbarOptions = [
        ['bold', 'italic', 'underline'],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['image'],
    ];

    const onPublishDialogButtonClick = () => {
       content = textEditor.getHtml();
       title = textEditor.getLine(0)[0]?.text;
        wordCount = textEditor.getWordCount();

        publishBlogDialog.showModal();
    };

    onMount(async () => {
        const textEditorInitialState: TextEditorInitialState = {
            ops: [{
                insert: "Write your story"
            }]
        };

        textEditor = new TextEditor({
            editorReference,
            initialState: textEditorInitialState,
            type: 'default',
            toolbarOptions,
        });

        textEditor.setHeading({
            lineIndex: 0,
            numberOfLines: 1,
            value: TextEditorHeading.H1,
        });

        textEditor.onTextChange(() => {
            const titleFormat = textEditor.getFormat({
                lineIndex: 0,
                numberOfLines: 1,
            });

            const isTitleHeading1 = titleFormat.header && titleFormat.header === TextEditorHeading.H1;

            if (!isTitleHeading1) {
                textEditor.setHeading({
                    lineIndex: 0,
                    numberOfLines: 1,
                    value: TextEditorHeading.H1,
                });
            }
        });

        textEditor.onUploadImage(async (file) => {
            if (file instanceof Error) {
                return;
            }

            const storageReference = await uploadFile({
                file,
                location: '/temporary/new-blogs-post',
            });

            const downloadUrl = await getDownloadUrl(storageReference);

            let indexOfImageToBeUploaded = textEditor.getSelection()?.index ?? textEditor.getContentLength();

            const isSelectionAtHeader = indexOfImageToBeUploaded === 0;

            if (isSelectionAtHeader) {
                indexOfImageToBeUploaded = 1;
            }

            textEditor.insertImage({
                index: indexOfImageToBeUploaded,
                value: downloadUrl,
                source: TextEditorSource.User,
            });
        });

        textEditor.headerHandler((value) => {
            const range = textEditor.getSelection();

            const isFormattingTheTitle = range && range.index === 0;

            if (isFormattingTheTitle) {
                return;
            }

            textEditor.setSelectionHeading(value);
        });
    });
</script>

<div class="editor-container relative">
    <div bind:this={editorReference}></div>

    <button
            on:click={onPublishDialogButtonClick}
            type="button"
            class="absolute right-5 top-[9px] rounded bg-blue-600 px-4 py-2 text-xs text-white font-medium uppercase  shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-blue-900 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-blue-900 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none active:bg-blue-900 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
    >
        Publish
    </button>
</div>



<PublishBlogDialog
    bind:publishBlogDialog
    serverForm={data.form}
    {title}
    {content}
    {tags}
    {wordCount}
/>


