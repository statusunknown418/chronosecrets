"use client";

import { cn } from "@/lib/utils";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { forwardRef } from "react";

const Tiptap = forwardRef<
  HTMLDivElement,
  {
    content?: string;
    onChange?: (e: unknown) => void;
  }
>(({ content, onChange, ...props }, ref) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    autofocus: true,
    editorProps: {
      attributes: {
        class: cn(
          "prose dark:prose-invert prose-sm min-w-full",
          "focus:outline-none min-h-full h-[200px]",
        ),
      },
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editable: !!onChange,
  });

  return (
    <EditorContent
      {...props}
      ref={ref}
      editor={editor}
      placeholder="Get ready to know something you may not like..."
      className={cn(
        !!onChange && "max-h-60 border border-input p-4",
        "min-h-[240px] overflow-scroll rounded-lg bg-background",
        "ring-ring focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-background focus:outline-none focus:ring-ring first:focus:outline-none",
      )}
    />
  );
});

Tiptap.displayName = "Tiptap";

export default Tiptap;
