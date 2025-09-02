// src/Tiptap.tsx
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { BulletList, OrderedList } from "@tiptap/extension-list";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "./../node_modules/@tiptap/extension-text-align/src/index";
import { UploadPanel } from "./components/Editor/UploadPanel";
import { Toolbar } from "./components/Toolbar/Toolbar";

type EditorOutput = {
  html: string;
  json: string;
};

interface RichTextEditorProps {
  content: EditorOutput;
  onChange: (content: EditorOutput) => void;
}

const Tiptap = ({ content, onChange }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        link: false,
      }),
      Image,
      UploadPanel,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: "noopener noreferrer nofollow",
          target: "_blank",
          class: "text-blue-600 underline",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "bullet-list",
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "ordered-list",
        },
      }),
      Highlight.configure({
        HTMLAttributes: {
          class: "highlight",
        },
      }),
    ], // define your extension array
    content: content.html, // initial content
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none border-0 p-4 min-h-[250px] max-h-[500px] bg-white overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500",
      },
    },
    onUpdate: ({ editor }) => {
      onChange({
        html: editor.getHTML(),
        json: JSON.stringify(editor.getJSON()),
      });
    },
  });

  return (
    <div className="w-full max-w-3xl mx-auto pt-8">
      <h1 className="text-2xl font-medium text-black/70 pb-4">
        Rich Text Editor
      </h1>
      <section className="shadow-md rounded-b-md overflow-hidden">
        <Toolbar editor={editor} />
        <EditorContent editor={editor} />
      </section>
    </div>
  );
};

export default Tiptap;
