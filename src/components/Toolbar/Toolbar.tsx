import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useEditorState, type Editor } from "@tiptap/react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Highlighter,
  ImagePlus,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo,
  Strikethrough,
  Underline,
  Undo,
} from "lucide-react";
import { LinkButton } from "../Editor/LinkButton";
import { Toggle } from "../ui/toggle";

interface ToolbarProps {
  editor: Editor | null;
}

export const Toolbar = ({ editor }: ToolbarProps) => {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      // Marks
      isBold: ctx.editor?.isActive("bold") ?? false,
      canBold: ctx.editor?.can().chain().toggleBold().run() ?? false,
      isItalic: ctx.editor?.isActive("italic") ?? false,
      canItalic: ctx.editor?.can().chain().toggleItalic().run() ?? false,
      isUnderline: ctx.editor?.isActive("underline") ?? false,
      canUnderline: ctx.editor?.can().chain().toggleUnderline().run() ?? false,
      isStrike: ctx.editor?.isActive("strike") ?? false,
      canStrike: ctx.editor?.can().chain().toggleStrike().run() ?? false,
      isHighlight: ctx.editor?.isActive("highlight") ?? false,
      canHighlight: ctx.editor?.can().chain().toggleHighlight().run() ?? false,

      // link
      isLink: ctx.editor?.isActive("link") ?? false,

      // Headings
      isHeading1: ctx.editor?.isActive("heading", { level: 1 }) ?? false,
      isHeading2: ctx.editor?.isActive("heading", { level: 2 }) ?? false,
      isHeading3: ctx.editor?.isActive("heading", { level: 3 }) ?? false,
      isHeading4: ctx.editor?.isActive("heading", { level: 4 }) ?? false,

      // Lists
      isBulletList: ctx.editor?.isActive("bulletList") ?? false,
      isOrderedList: ctx.editor?.isActive("orderedList") ?? false,

      // Blocks
      isBlockquote: ctx.editor?.isActive("blockquote") ?? false,
      isUploadPanel: ctx.editor?.isActive("uploadPanel") ?? false,

      // Text align
      isAlignLeft: ctx.editor?.isActive({ textAlign: "left" }) ?? false,
      isAlignCenter: ctx.editor?.isActive({ textAlign: "center" }) ?? false,
      isAlignRight: ctx.editor?.isActive({ textAlign: "right" }) ?? false,

      // History
      canUndo: ctx.editor?.can().chain().undo().run() ?? false,
      canRedo: ctx.editor?.can().chain().redo().run() ?? false,
    }),
  });

  if (!editor) return null;

  const Options = [
    // History
    {
      icon: <Undo className="size-4" />,
      disabled: !editorState?.canUndo,
      onClick: () => editor.chain().focus().undo().run(),
    },
    {
      icon: <Redo className="size-4" />,
      disabled: !editorState?.canRedo,
      onClick: () => editor.chain().focus().redo().run(),
    },

    // Marks
    {
      icon: <Bold className="size-4" />,
      active: editorState?.isBold,
      disabled: !editorState?.canBold,
      onClick: () => editor.chain().focus().toggleBold().run(),
    },
    {
      icon: <Italic className="size-4" />,
      active: editorState?.isItalic,
      disabled: !editorState?.canItalic,
      onClick: () => editor.chain().focus().toggleItalic().run(),
    },
    {
      icon: <Underline className="size-4" />,
      active: editorState?.isUnderline,
      disabled: !editorState?.canUnderline,
      onClick: () => editor.chain().focus().toggleUnderline().run(),
    },
    {
      icon: <Strikethrough className="size-4" />,
      active: editorState?.isStrike,
      disabled: !editorState?.canStrike,
      onClick: () => editor.chain().focus().toggleStrike().run(),
    },
    {
      icon: <Highlighter className="size-4" />,
      active: editorState?.isHighlight,
      disabled: !editorState?.canHighlight,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
    },

    // Blockquote
    {
      icon: <Quote className="size-4" />,
      active: editorState?.isBlockquote,
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
    },

    // Alignment
    {
      icon: <AlignLeft className="size-4" />,
      active: editorState?.isAlignLeft,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
    },
    {
      icon: <AlignCenter className="size-4" />,
      active: editorState?.isAlignCenter,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
    },
    {
      icon: <AlignRight className="size-4" />,
      active: editorState?.isAlignRight,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
    },

    // Lists
    {
      icon: <List className="size-4" />,
      active: editorState?.isBulletList,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
    },
    {
      icon: <ListOrdered className="size-4" />,
      active: editorState?.isOrderedList,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
    },

    // image upload
    {
      icon: <ImagePlus className="size-4" />,
      active: editorState?.isUploadPanel,
      onClick: () =>
        editor?.chain().focus().insertContent({ type: "uploadPanel" }).run(),
    },
  ];

  const HeadingOptions = [
    {
      label: "Heading-1",
      icon: <Heading1 className="size-4" />,
      active: editorState?.isHeading1,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    },
    {
      label: "Heading-2",
      icon: <Heading2 className="size-4" />,
      active: editorState?.isHeading2,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      label: "Heading-3",
      icon: <Heading3 className="size-4" />,
      active: editorState?.isHeading3,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    },
    {
      label: "Heading-4",
      icon: <Heading4 className="size-4" />,
      active: editorState?.isHeading4,
      onClick: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
    },
  ];

  const handleHeadingsChange = (value: string) => {
    console.log(value);
    switch (value) {
      case "Heading-1":
        editor.chain().focus().toggleHeading({ level: 1 }).run();
        break;
      case "Heading-2":
        editor.chain().focus().toggleHeading({ level: 2 }).run();
        break;
      case "Heading-3":
        editor.chain().focus().toggleHeading({ level: 3 }).run();
        break;
      case "Heading-4":
        editor.chain().focus().toggleHeading({ level: 4 }).run();
        break;
    }
  };

  return (
    <div className="border rounded-t-md p-1 bg-slate-50 flex flex-wrap gap-1 z-50">
      {Options.map((option, index) => {
        // console.log(option);
        return (
          <Toggle
            key={index}
            pressed={option.active}
            disabled={option.disabled}
            onPressedChange={option.onClick}
            className={cn("hover:bg-slate-200 cursor-pointer", {
              "data-[state=on]:bg-slate-200": option.active,
            })}
            size="sm"
          >
            {option.icon}
          </Toggle>
        );
      })}

      {/* link apply */}
      <LinkButton editor={editor} isActive={editorState?.isLink} />

      {/* heading selection */}
      <Select
        value={
          editorState?.isHeading1
            ? "Heading-1"
            : editorState?.isHeading1
            ? "Heading-2"
            : editorState?.isHeading3
            ? "Heading-3"
            : editorState?.isHeading4
            ? "Heading-4"
            : ""
        }
        onValueChange={(value) => handleHeadingsChange(value)}
      >
        <SelectTrigger
          title="Heading"
          size="sm"
          className={cn(
            "cursor-pointer w-12 focus:outline-0 p-1 gap-0.5 justify-center outline-0 shadow-none",
            {
              "bg-slate-200":
                editorState?.isHeading1 ||
                editorState?.isHeading1 ||
                editorState?.isHeading3 ||
                editorState?.isHeading4,
            }
          )}
        >
          <SelectValue placeholder={<Heading />} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Headings</SelectLabel>
            {HeadingOptions.map((heading) => (
              <SelectItem
                key={heading.label}
                value={heading.label}
                title={heading.label}
                className={cn("hover:bg-slate-200 cursor-pointer", {
                  "data-[state=on]:bg-slate-200": heading.active,
                })}
              >
                {heading.icon}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
