import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import UploadPanelComponent from "./UploadPanelComponent";

export const UploadPanel = Node.create({
  name: "uploadPanel",

  group: "block",
  atom: true,

  parseHTML() {
    return [{ tag: "upload-panel" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["upload-panel", mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(UploadPanelComponent);
  },
});
