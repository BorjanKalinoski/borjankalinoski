import type { TextEditorHeading } from '$lib/text-editor/text-editor-heading';
import type { TextEditorSource } from '$lib/text-editor/text-editor-source';
import Quill, { type TextChangeHandler } from 'quill';
import Delta from 'quill-delta';
import ImageResize from 'quill-image-resize';

Quill.register('modules/imageResize', ImageResize);

type TextEditorType = 'default' | 'bubble';

export type TextEditorInitialState = {
  ops: Array<{ insert: string }>;
};

type TextEditorOptions = {
  editorReference: HTMLDivElement;
  initialState?: TextEditorInitialState;
  readOnly?: boolean;
  toolbarOptions?: unknown[];
  type: TextEditorType;
};

export class TextEditor {
  private readonly editor: Quill;

  public constructor({
    editorReference,
    initialState,
    type,
    toolbarOptions,
    readOnly = false,
  }: TextEditorOptions) {
    const isImageModuleEnabled =
      JSON.stringify(toolbarOptions)?.includes?.('image');

    this.editor = new Quill(editorReference, {
      modules: {
        toolbar: {
          container: toolbarOptions,
        },
        ...(isImageModuleEnabled && {
          imageResize: {},
        }),
      },
      readOnly,
      theme: type === 'default' ? 'snow' : 'bubble',
    });

    if (initialState) {
      this.editor?.setContents(new Delta(initialState));
    }
  }

  public setHeading({
    lineIndex,
    numberOfLines,
    value,
  }: {
    lineIndex: number;
    numberOfLines: number;
    value: TextEditorHeading;
  }) {
    this.editor?.formatLine(lineIndex, numberOfLines, 'header', value);
  }

  public getFormat({
    lineIndex,
    numberOfLines,
  }: {
    lineIndex: number;
    numberOfLines: number;
  }) {
    return this.editor?.getFormat(lineIndex, numberOfLines);
  }

  public getLine(lineIndex: number) {
    return this.editor?.getLeaf(lineIndex);
  }

  public getContent() {
    return this.editor?.getContents();
  }

  public getSelection() {
    return this.editor?.getSelection();
  }

  public getContentLength() {
    return this.editor?.getLength();
  }

  public setSelectionHeading(value: string) {
    this.editor?.format('header', value);
  }

  public onUploadImage(callback: (file: File | Error) => Promise<void>) {
    const toolbar = this.editor?.getModule('toolbar');

    toolbar.addHandler('image', async () => {
      const input = document.createElement('input');

      input.setAttribute('type', 'file');
      input.click();
      input.setAttribute('accept', 'image/*');

      input.onchange = async () => {
        const file = input.files?.[0];

        if (!file) {
          await callback(new Error('No file selected'));
          return;
        }

        try {
          await callback(file);
        } catch {
          /* empty */
        }

        input.remove();
      };
    });

    return null;
  }

  public insertImage({
    index,
    source,
    value,
  }: {
    index: number;
    source: TextEditorSource;
    value: string;
  }) {
    this.editor?.insertEmbed(index, 'image', value, source);
  }

  public onTextChange(textChangeCallback: TextChangeHandler) {
    this.editor?.on('text-change', textChangeCallback);
  }

  public headerHandler(callback: (value: string) => void) {
    const toolbar = this.editor?.getModule('toolbar');

    toolbar.addHandler('header', (value: string) => {
      callback(value);
    });
  }
}
