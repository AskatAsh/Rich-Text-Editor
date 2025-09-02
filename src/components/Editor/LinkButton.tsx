import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { Editor } from "@tiptap/react";
import { LinkIcon } from "lucide-react";
import { useEffect, useState } from "react";

type LinkButtonProps = {
  editor: Editor;
  isActive: boolean | undefined;
};

export function LinkButton({ editor, isActive }: LinkButtonProps) {
  const [url, setUrl] = useState("");
  const [open, setOpen] = useState(false);

  // Prefill url if selection is already a link
  useEffect(() => {
    if (open && isActive && editor) {
      const prevUrl = editor.getAttributes("link")?.href ?? "";
      setUrl(prevUrl);
    }
  }, [open, isActive, editor]);

  const insertOrUpdateLink = () => {
    if (!editor) return;
    if (!url) return;

    editor.chain().focus().setLink({ href: url, target: "_blank" }).run();

    setOpen(false);
  };

  const removeLink = () => {
    if (!editor) return;

    editor.chain().focus().unsetLink().run();
    setUrl("");
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={isActive ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setOpen(true)}
          className={cn("hover:bg-slate-200 cursor-pointer h-9", {
            "bg-slate-200": isActive,
          })}
        >
          <LinkIcon className="size-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-72 space-y-2">
        <Input
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <div className="flex gap-2">
          <Button
            className="flex-1 cursor-pointer"
            onClick={insertOrUpdateLink}
            disabled={!url}
          >
            {isActive ? "Update" : "Insert"}
          </Button>
          {isActive && (
            <Button
              className="flex-1"
              variant="destructive"
              onClick={removeLink}
            >
              Unlink
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
