import type { NodeViewProps } from "@tiptap/react";
import { NodeViewWrapper } from "@tiptap/react";
import { useCallback, useState } from "react";

const uploadToImgbb = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbbKey}`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();
  return data.data.url;
};

export default function UploadPanelComponent({ editor }: NodeViewProps) {
  const [loading, setLoading] = useState(false);
  const handleUpload = useCallback(
    async (file: File) => {
      setLoading(true);
      const url = await uploadToImgbb(file);
      if (url) {
        setLoading(false);
        editor
          .chain()
          .focus()
          .deleteNode("uploadPanel") // remove the panel
          .setImage({ src: url }) // insert image
          .run();
      }
    },
    [editor]
  );

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) handleUpload(e.target.files[0]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files[0]) handleUpload(e.dataTransfer.files[0]);
  };

  return (
    <NodeViewWrapper
      as="div"
      className="border-2 border-dashed border-gray-400 rounded-md p-6 text-center text-gray-500"
      onDrop={handleDrop}
      onDragOver={(e: Event) => e.preventDefault()}
    >
      {loading ? (
        <p className="animate-pulse">Uploading. Please wait...</p>
      ) : (
        <>
          <div className="inline-flex items-center gap-1.5">
            <p className="hidden sm:block">Drag & drop an image here, or </p>
            <label
              htmlFor="file"
              className="underline underline-offset-1 cursor-pointer select-none"
            >
              Click to upload
            </label>
          </div>
          <span className="block text-sm font-medium select-none">
            [ Note: Small images are uploaded faster ]
          </span>
        </>
      )}

      <input
        id="file"
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="mt-2 hidden"
      />
    </NodeViewWrapper>
  );
}
