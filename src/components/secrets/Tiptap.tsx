"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const Tiptap = ({ content }: { content?: string }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    autofocus: true,
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-sm sm:prose-base p-4 focus:outline-none min-h-[300px]",
      },
    },
  });

  return (
    <section className="flex flex-col gap-4">
      <EditorContent
        placeholder="Get ready to know something you may not like..."
        editor={editor}
        className="h-[300px] overflow-scroll rounded-lg border border-input bg-background ring-ring focus:outline-none focus:ring-1 first:focus:outline-none"
      />

      <p className="text-sm text-muted-foreground">
        The editor supports markdown syntax!
      </p>
    </section>
  );
};

export default Tiptap;
