import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import EditorToolbar from "./toolbar/EditorToolbar";

interface EditorProps {
  content: string;
  onChange: (value: string) => void;
}

const Editor = React.forwardRef(({ content, onChange }: EditorProps, ref: React.Ref<any>) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Function to reset editor content
  const resetContent = () => {
    if (editor) {
      editor.commands.setContent(content); // Reset content to initial value
    }
  };

  // Expose the resetContent function to the parent component
  React.useImperativeHandle(
    ref,
    () => ({
      resetContent: resetContent
    }),
    [editor]
  );

  if (!editor) return <></>;

  return (
    <div className="border">
      <EditorToolbar editor={editor} />
      <div className="editor">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
});

export default Editor;
