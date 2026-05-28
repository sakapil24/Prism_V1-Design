import * as React from 'react';
import { cn } from '../utils/cn';

export interface Comment {
  id: string | number;
  authorName: string;
  authorAvatar?: string;
  content: string;
  timestamp: string;
  replies?: Comment[];
}

export interface CommentThreadProps extends React.ComponentPropsWithoutRef<'div'> {
  comments: Comment[];
  onReplySubmit?: (commentId: string | number, replyText: string) => void;
}

export function CommentThread({
  comments,
  onReplySubmit,
  className,
  ...props
}: CommentThreadProps) {
  const [activeReplyId, setActiveReplyId] = React.useState<string | number | null>(null);
  const [replyText, setReplyText] = React.useState('');

  const handleReplyClick = (id: string | number) => {
    if (activeReplyId === id) {
      setActiveReplyId(null);
      setReplyText('');
    } else {
      setActiveReplyId(id);
      setReplyText('');
    }
  };

  const handleReplySubmit = (id: string | number) => {
    if (!replyText.trim()) return;
    onReplySubmit?.(id, replyText);
    setActiveReplyId(null);
    setReplyText('');
  };

  // Render a single comment and its replies recursively
  const renderComment = (comment: Comment, depth = 0) => {
    const hasReplies = comment.replies && comment.replies.length > 0;
    const isReplyActive = activeReplyId === comment.id;

    return (
      <div key={comment.id} className="flex flex-col gap-2 relative">
        <div className="flex gap-3 items-start group">
          {/* Avatar column */}
          <div className="relative shrink-0 z-10">
            {comment.authorAvatar ? (
              <img
                src={comment.authorAvatar}
                alt={comment.authorName}
                className="h-8 w-8 rounded-full object-cover border border-[var(--border-subtle)]"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-[var(--surface-secondary)] border border-[var(--border-default)] flex items-center justify-center text-xs font-[var(--font-semibold)] text-[var(--text-secondary)]">
                {comment.authorName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* Comment card content */}
          <div className="flex-1 flex flex-col bg-[var(--surface-raised)] border border-[var(--border-subtle)] rounded-[var(--radius-sm)] p-3 relative hover:shadow-[var(--shadow-sm)] transition-shadow duration-[var(--duration-fast)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[var(--text-sm)] font-[var(--font-semibold)] text-[var(--text-primary)]">
                  {comment.authorName}
                </span>
                <span className="text-[var(--text-xs)] text-[var(--text-muted)]">
                  {comment.timestamp}
                </span>
              </div>

              {/* Hover actions panel */}
              <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity duration-[var(--duration-fast)]">
                <button
                  type="button"
                  onClick={() => handleReplyClick(comment.id)}
                  className="px-2 py-0.5 text-[11px] font-medium text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:bg-[var(--surface-secondary)] rounded-sm transition-colors duration-[var(--duration-fast)]"
                >
                  Reply
                </button>
              </div>
            </div>

            <p className="text-[var(--text-sm)] text-[var(--text-secondary)] mt-1.5 leading-[var(--lh-body-s)] whitespace-pre-wrap">
              {comment.content}
            </p>
          </div>
        </div>

        {/* Dynamic Reply Input block */}
        {isReplyActive && (
          <div className="ml-11 flex flex-col gap-2 p-3 bg-[var(--surface-secondary)] rounded-[var(--radius-sm)] border border-[var(--border-subtle)]">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder={`Reply to ${comment.authorName}...`}
              className="w-full min-h-[60px] p-2 text-[var(--text-sm)] bg-white border border-[var(--border-default)] rounded-[var(--radius-sm)] outline-none focus:border-[var(--border-focus)] transition-colors resize-vertical"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setActiveReplyId(null)}
                className="px-2.5 py-1 text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-interactive)] rounded-sm transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleReplySubmit(comment.id)}
                className="px-2.5 py-1 text-xs font-medium bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-primary-hover)] rounded-sm transition-colors shadow-sm"
              >
                Send Reply
              </button>
            </div>
          </div>
        )}

        {/* Recursive Replies thread tree */}
        {hasReplies && (
          <div className="flex flex-col gap-3 ml-11 relative">
            {/* Guide line down to the replies */}
            <div className="absolute left-[-22px] top-[-10px] bottom-4 w-[1.5px] bg-[var(--border-subtle)]" />
            {comment.replies!.map((reply) => renderComment(reply, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={cn(
        'font-[family-name:var(--font-sans)] w-full flex flex-col gap-4',
        className
      )}
      {...props}
    >
      {comments.map((comment) => renderComment(comment, 0))}
    </div>
  );
}

CommentThread.displayName = 'CommentThread';
