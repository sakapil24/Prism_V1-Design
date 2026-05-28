/**
 * CRM Design System Example — RichTextEditor
 *
 * Tiptap-based rich text editor with formatting toolbar.
 */

import * as React from 'react';
import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { cn } from '../utils/cn';

/* ─── Toolbar Button ─────────────────────────────────────────────────── */

interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}

function ToolbarButton({ onClick, isActive, disabled, title, children }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'inline-flex h-7 w-7 items-center justify-center rounded-[var(--radius-md)]',
        'text-[var(--icon-default)] transition-colors duration-[var(--duration-fast)]',
        'hover:bg-[var(--surface-hover)]',
        'disabled:opacity-40 disabled:pointer-events-none',
        isActive && 'bg-[var(--surface-selected)] text-[var(--text-primary)]'
      )}
    >
      {children}
    </button>
  );
}

/* ─── Toolbar ────────────────────────────────────────────────────────── */

function EditorToolbar({ editor }: { editor: Editor }) {
  return (
    <div className="flex items-center gap-0.5 border-b border-[var(--border-subtle)] px-2 py-1.5 flex-wrap">
      {/* Text formatting */}
      <ToolbarButton
        title="Bold"
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive('bold')}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M3.5 2.333h4.083c1.38 0 2.5 1.12 2.5 2.5 0 .88-.457 1.656-1.146 2.1.917.46 1.546 1.41 1.546 2.5 0 1.55-1.254 2.8-2.8 2.8H3.5V2.333zm4.233 3.967c.642 0 1.167-.525 1.167-1.167s-.525-1.167-1.167-1.167H5.367v2.334h2.366zm.05 4.367c.733 0 1.334-.6 1.334-1.334 0-.733-.6-1.333-1.334-1.333H5.367V10.667h2.416z"/></svg>
      </ToolbarButton>
      <ToolbarButton
        title="Italic"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive('italic')}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M5.833 2.333h4.667v1.334H8.943L6.79 10.333H8.75v1.334H4.083v-1.334h1.558l2.152-6.666H5.833V2.333z"/></svg>
      </ToolbarButton>
      <ToolbarButton
        title="Strikethrough"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        isActive={editor.isActive('strike')}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M2.333 7.583h9.334V6.417H2.333v1.166zm2.334-4.083v2.333h2.916V3.5h2.917V3.5H4.667zm0 7h2.916V8.167H4.667V10.5z"/></svg>
      </ToolbarButton>

      <div className="mx-1 h-4 w-px bg-[var(--border-subtle)]" />

      {/* Headings */}
      <ToolbarButton
        title="Heading 1"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        isActive={editor.isActive('heading', { level: 1 })}
      >
        <span className="text-[11px] font-bold">H1</span>
      </ToolbarButton>
      <ToolbarButton
        title="Heading 2"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={editor.isActive('heading', { level: 2 })}
      >
        <span className="text-[11px] font-bold">H2</span>
      </ToolbarButton>
      <ToolbarButton
        title="Heading 3"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        isActive={editor.isActive('heading', { level: 3 })}
      >
        <span className="text-[11px] font-bold">H3</span>
      </ToolbarButton>

      <div className="mx-1 h-4 w-px bg-[var(--border-subtle)]" />

      {/* Lists */}
      <ToolbarButton
        title="Bullet List"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive('bulletList')}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><circle cx="2.5" cy="3.5" r="1"/><rect x="5" y="3" width="7" height="1" rx="0.5"/><circle cx="2.5" cy="7" r="1"/><rect x="5" y="6.5" width="7" height="1" rx="0.5"/><circle cx="2.5" cy="10.5" r="1"/><rect x="5" y="10" width="7" height="1" rx="0.5"/></svg>
      </ToolbarButton>
      <ToolbarButton
        title="Ordered List"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive('orderedList')}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><text x="1.5" y="4.5" fontSize="4" fontWeight="bold">1</text><rect x="5" y="3" width="7" height="1" rx="0.5"/><text x="1.5" y="8" fontSize="4" fontWeight="bold">2</text><rect x="5" y="6.5" width="7" height="1" rx="0.5"/><text x="1.5" y="11.5" fontSize="4" fontWeight="bold">3</text><rect x="5" y="10" width="7" height="1" rx="0.5"/></svg>
      </ToolbarButton>

      <div className="mx-1 h-4 w-px bg-[var(--border-subtle)]" />

      {/* Block */}
      <ToolbarButton
        title="Blockquote"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editor.isActive('blockquote')}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M3 3.5C3 3.22386 3.22386 3 3.5 3H6.5C6.77614 3 7 3.22386 7 3.5V6.5C7 6.77614 6.77614 7 6.5 7H5L3.5 9.5V7H3.5C3.22386 7 3 6.77614 3 6.5V3.5ZM7.5 3.5C7.5 3.22386 7.72386 3 8 3H11C11.2761 3 11.5 3.22386 11.5 3.5V6.5C11.5 6.77614 11.2761 7 11 7H9.5L8 9.5V7H8C7.72386 7 7.5 6.77614 7.5 6.5V3.5Z"/></svg>
      </ToolbarButton>
      <ToolbarButton
        title="Code Block"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        isActive={editor.isActive('codeBlock')}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 4L2 7l2.5 3M9.5 4L12 7l-2.5 3M8 2.5L6 11.5"/></svg>
      </ToolbarButton>

      <div className="mx-1 h-4 w-px bg-[var(--border-subtle)]" />

      {/* Undo/Redo */}
      <ToolbarButton
        title="Undo"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"><path d="M3 5h5.5a3 3 0 0 1 0 6H8M3 5l2.5-2.5M3 5l2.5 2.5"/></svg>
      </ToolbarButton>
      <ToolbarButton
        title="Redo"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5H5.5a3 3 0 0 0 0 6H6M11 5L8.5 2.5M11 5L8.5 7.5"/></svg>
      </ToolbarButton>
    </div>
  );
}

/* ─── RichTextEditor ─────────────────────────────────────────────────── */

export interface RichTextEditorProps {
  content?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
  editable?: boolean;
  className?: string;
}

function RichTextEditor({
  content = '',
  onChange,
  placeholder = 'Start writing...',
  editable = true,
  className,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder }),
    ],
    content,
    editable,
    onUpdate: ({ editor: e }) => {
      onChange?.(e.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div
      className={cn(
        'rounded-[var(--radius-xl)] border border-[var(--border-default)] bg-[var(--surface-page)] overflow-hidden',
        'transition-[border-color,box-shadow] duration-[var(--duration-moderate)]',
        'focus-within:border-[var(--border-focus)] focus-within:shadow-[var(--shadow-focus-ring)]',
        !editable && 'border-transparent',
        className
      )}
    >
      {editable && <EditorToolbar editor={editor} />}
      <EditorContent
        editor={editor}
        className={cn('tiptap-content px-3 py-2 min-h-[120px]', !editable && 'px-0 py-0 min-h-0')}
      />
    </div>
  );
}

RichTextEditor.displayName = 'RichTextEditor';

export { RichTextEditor };
