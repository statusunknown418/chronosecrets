"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { forwardRef } from "react";

const Tiptap = forwardRef<
  HTMLDivElement,
  {
    content?: string;
    onChange: (e: unknown) => void;
  }
>(({ content, onChange }, ref) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    autofocus: true,
    editorProps: {
      attributes: {
        class: "prose dark:prose-invert prose-sm p-4 focus:outline-none min-h-[300px]",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <section className="flex flex-col gap-4">
      <EditorContent
        ref={ref}
        editor={editor}
        placeholder="Get ready to know something you may not like..."
        className="h-[300px] overflow-scroll rounded-lg border border-input bg-background ring-ring focus:outline-none focus:ring-1 first:focus:outline-none"
      />

      <p className="text-sm text-muted-foreground">
        The editor supports markdown syntax!
      </p>
    </section>
  );
});

Tiptap.displayName = "Tiptap";

export default Tiptap;
