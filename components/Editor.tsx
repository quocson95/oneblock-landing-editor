'use client';
// You can use this code in a separate component that's imported in your pages.
import { AdmonitionDirectiveDescriptor, BoldItalicUnderlineToggles, ChangeCodeMirrorLanguage, codeMirrorPlugin, CodeToggle, ConditionalContents, diffSourcePlugin, DiffSourceToggleWrapper, DirectiveDescriptor, directivesPlugin, frontmatterPlugin, GenericDirectiveEditor, imagePlugin, InsertCodeBlock, InsertFrontmatter, InsertImage, InsertSandpack, InsertTable, InsertThematicBreak, KitchenSinkToolbar, linkDialogPlugin, ListsToggle, ShowSandpackInfo, tablePlugin, UndoRedo, type CodeBlockEditorDescriptor, type SandpackConfig } from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import React from 'react';
import { MDXEditor , codeBlockPlugin, headingsPlugin, listsPlugin, 
  linkPlugin, quotePlugin, markdownShortcutPlugin, 
  useCodeBlockEditorContext,
  toolbarPlugin,
  sandpackPlugin,
  thematicBreakPlugin,
 }  from '@mdxeditor/editor';
import {imageUpload,imagePreview} from './Upload';

const simpleSandpackConfig: SandpackConfig = {
  defaultPreset: 'react',
  presets: [
    {
      label: 'React',
      name: 'react',
      meta: 'live react',
      sandpackTemplate: 'react',
      sandpackTheme: 'light',
      snippetFileName: '/App.js',
      snippetLanguage: 'jsx',
      initialSnippetContent: ``
    },
  ]
}


const simpleToolbarPlug =  toolbarPlugin({
  // toolbarClassName: 'my-classname',
  toolbarContents: () => (
    <>
    <DiffSourceToggleWrapper >
     <ConditionalContents
          options={[
              { when: (editor) => editor?.editorType === 'codeblock', contents: () => <ChangeCodeMirrorLanguage /> },
              { when: (editor) => editor?.editorType === 'sandpack', contents: () => <ShowSandpackInfo /> },
              { fallback: () => ( <> 
              <InsertCodeBlock />
              <InsertSandpack />
            </>) }
            ]}
        />
      <UndoRedo />
      <BoldItalicUnderlineToggles />
      <InsertImage/>
      <InsertTable/>
      <InsertThematicBreak/>
      <ListsToggle/>

      
        </DiffSourceToggleWrapper>

    </>
  )
})


const CalloutDirectiveDescriptor: DirectiveDescriptor = {
  name: 'callout',
  testNode(node) {
    return node.name === 'callout'
  },
  // set some attribute names to have the editor display a property editor popup.
  attributes: [],
  // used by the generic editor to determine whether or not to render a nested editor.
  hasChildren: true,
  Editor: GenericDirectiveEditor
}


const Editor = () => {
    return <MDXEditor      
      // onChange={console.log}
      markdown={`Hello [world](https://virtuoso.dev/)
        | foo | bar |
| --- | --- |
| baz | bim |


---
slug: hello-world
---

this is a cool markdown

:::note
foo
:::

:::tip
Some **content** with _Markdown_ syntax. Check [this component](https://virtuoso.dev/).
:::

:::info
Some **content** with _Markdown_ syntax. 
:::

:::caution
Some **content** with _Markdown_ syntax.
:::

:::danger
Some **content** with _Markdown_ syntax.
:::

`}
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        tablePlugin(),
        markdownShortcutPlugin(),
        simpleToolbarPlug,
        codeBlockPlugin({defaultCodeBlockLanguage:'js'}),
        sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
        codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS' } }),        
        directivesPlugin({directiveDescriptors: [AdmonitionDirectiveDescriptor]}),
        diffSourcePlugin({
          diffMarkdown: 'An older version',
          viewMode: 'rich-text',
          readOnlyDiff: true
        }),
        imagePlugin({
          imageUploadHandler: imageUpload,
          imagePreviewHandler: imagePreview,
          imageAutocompleteSuggestions: ['https://picsum.photos/200/300', 'https://picsum.photos/200'],
        }),
      ]}
    />
}

export default Editor
