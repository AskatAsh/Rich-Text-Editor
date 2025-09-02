// src/Tiptap.tsx
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import { BulletList, OrderedList } from "@tiptap/extension-list";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "./../node_modules/@tiptap/extension-text-align/src/index";
import { UploadPanel } from "./components/Editor/UploadPanel";
import { Toolbar } from "./components/Toolbar/Toolbar";
import { ScrollArea, ScrollBar } from "./components/ui/scroll-area";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const Tiptap = ({ content, onChange }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
      }),
      Image,
      UploadPanel,
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
    content: content, // initial content
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none border-0 p-4 min-h-[250px] bg-white",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="w-full max-w-3xl mx-auto pt-8">
      <h1 className="text-2xl font-medium text-black/70 pb-4">
        Rich Text Editor
      </h1>
      <section className="shadow-md rounded-b-md overflow-hidden">
        <Toolbar editor={editor} />
        <ScrollArea className="h-[500px] border border-gray-200 border-t-0">
          <EditorContent editor={editor} />
          <ScrollBar />
        </ScrollArea>
      </section>
    </div>
  );
};

export default Tiptap;
