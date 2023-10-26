import { NewSecretParams } from "@/lib/db/schema";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { MantineProvider } from "@mantine/core";
import { Link, RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

export function MantineEditor() {
  const formContext = useFormContext<NewSecretParams>();
  const [parent] = useAutoAnimate();

  const editor = useEditor({
    content: formContext.getValues("content") || "",
    extensions: [StarterKit, Link],
    onUpdate: ({ editor }) => {
      if (editor.getText().length < 3) {
        formContext.setValue("content", editor.getText(), { shouldValidate: true });
      } else {
        formContext.setValue("content", editor.getHTML(), { shouldValidate: true });
      }
    },
  });

  return (
    <MantineProvider>
      <FormField
        control={formContext.control}
        name="content"
        render={({ field }) => (
          <FormItem ref={parent}>
            <FormLabel>Content</FormLabel>

            <FormControl>
              <RichTextEditor
                unstyled
                ref={field.ref}
                editor={editor}
                className="prose prose-sm rounded-lg border px-4 dark:prose-invert focus-within:outline-none focus-within:ring focus-within:ring-ring focus:ring focus:ring-ring"
              >
                <RichTextEditor.Content />
              </RichTextEditor>
            </FormControl>

            <FormDescription>This editor supports markdown syntax!</FormDescription>

            <FormMessage />
          </FormItem>
        )}
      />
    </MantineProvider>
  );
}
