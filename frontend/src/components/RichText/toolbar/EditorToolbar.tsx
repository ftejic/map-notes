import { Toggle } from "@/components/ui/toggle";
import { Editor } from "@tiptap/react";
import { BoldIcon, ItalicIcon, ListIcon, ListOrderedIcon, MinusIcon, QuoteIcon, StrikethroughIcon } from "lucide-react";
import FormatType from "./FormatType";

interface EditorToolbarProps {
  editor: Editor;
}

function EditorToolbar({ editor }: EditorToolbarProps) {
  return (
    <div className="flex flex-col gap-1 min-[425px]:flex-row p-2 border-b">
      <div className="flex gap-1">
        <Toggle
          size="sm"
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          pressed={editor.isActive("bold")}
        >
          <BoldIcon className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          pressed={editor.isActive("italic")}
        >
          <ItalicIcon className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          onPressedChange={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          pressed={editor.isActive("strike")}>
          <StrikethroughIcon className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
          pressed={editor.isActive("bulletList")}>
          <ListIcon className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
          pressed={editor.isActive("orderedList")}>
          <ListOrderedIcon className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
          pressed={editor.isActive("blockquote")}>
          <QuoteIcon className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          className="mr-1"
          onPressedChange={() => editor.chain().focus().setHorizontalRule().run()}>
          <MinusIcon className="h-4 w-4" />
        </Toggle>
      </div>

      <div>
        <FormatType editor={editor}/>
      </div>
    </div>
  );
}

export default EditorToolbar;
