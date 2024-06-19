import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import EditorToolbar from "./toolbar/EditorToolbar";

interface EditorProps {
  content: string;
  onChange: (value: string) => void;
}

function Editor({ content, onChange }: EditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return <></>;

  return (
    <div className="border">
      <EditorToolbar editor={editor} />
      <div className="editor">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

export default Editor;
