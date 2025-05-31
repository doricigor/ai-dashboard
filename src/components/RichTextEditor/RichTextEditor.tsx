import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import Blockquote from "@tiptap/extension-blockquote";
import { Button, EditorContainer, Toolbar } from "./RichTextEditor.styled";
import { useEffect } from "react";
import { colors } from "../../styles/colors";

interface Props {
  content: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
}

export default function RichTextEditor({ content, onChange, readOnly }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        blockquote: false,
      }),
      Underline,
      Heading.configure({ levels: [1, 2, 3] }),
      Blockquote,
    ],
    content,
    editable: !readOnly,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) return null;

  return (
    <div>
      {!readOnly ? (
        <Toolbar>
          <Button
            onClick={() => editor.chain().focus().toggleBold().run()}
            $active={editor.isActive("bold")}
          >
            B
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            $active={editor.isActive("italic")}
          >
            I
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            $active={editor.isActive("underline")}
          >
            U
          </Button>
          <Button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            $active={editor.isActive("heading", { level: 2 })}
          >
            H2
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            $active={editor.isActive("bulletList")}
          >
            • List
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            $active={editor.isActive("orderedList")}
          >
            1. List
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            $active={editor.isActive("blockquote")}
          >
            ❝
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            $active={editor.isActive("codeBlock")}
          >
            {"</>"}
          </Button>
          <Button
            onClick={() =>
              editor.chain().focus().clearNodes().unsetAllMarks().run()
            }
          >
            Clear
          </Button>
        </Toolbar>
      ) : (
        <div
          style={{
            height: "40px",
            borderBottom: `1px solid  ${colors.border}`,
          }}
        />
      )}

      <EditorContainer>
        <EditorContent editor={editor} />
      </EditorContainer>
    </div>
  );
}
