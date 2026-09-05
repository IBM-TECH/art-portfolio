"use client";

import { useEffect, useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

type CommentModalProps = {
  artworkId: string;
  commentCount: number;
};

type Comment = {
  id: string;
  name: string;
  content: string;
};

export default function CommentModal({
  artworkId,
  commentCount,
}: CommentModalProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    if (!open) {
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!name.trim() || !comment.trim()) {
      return;
    }

    setComments((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        name: name.trim(),
        content: comment.trim(),
      },
    ]);

    setComment("");
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white/80 backdrop-blur-xl transition-all duration-200 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
      >
        <MessageCircle size={17} strokeWidth={1.7} />

        <span>Comment</span>

        <span className="text-white/35">
          {commentCount + comments.length}
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 backdrop-blur-md sm:items-center sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setOpen(false);
            }
          }}
        >
          <div className="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-[28px] border border-white/10 bg-[#17181b]/90 shadow-[0_30px_100px_rgba(0,0,0,0.65)] backdrop-blur-2xl sm:rounded-[28px]">
            <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4 sm:px-6">
              <div>
                <h2 className="text-base font-medium text-white">
                  Comments
                </h2>

                <p className="mt-0.5 text-xs text-white/40">
                  Join the conversation around this artwork.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close comments"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/50 transition hover:bg-white/[0.09] hover:text-white"
              >
                <X size={17} strokeWidth={1.7} />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6">
              {comments.length === 0 ? (
                <div className="flex min-h-[180px] items-center justify-center text-center">
                  <div>
                    <MessageCircle
                      size={28}
                      strokeWidth={1.4}
                      className="mx-auto text-white/20"
                    />

                    <p className="mt-3 text-sm text-white/50">
                      No comments yet.
                    </p>

                    <p className="mt-1 text-xs text-white/30">
                      Be the first to share your thoughts.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  {comments.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.07] text-xs font-medium text-white/70">
                        {item.name.charAt(0).toUpperCase()}
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-medium text-white/85">
                          {item.name}
                        </p>

                        <p className="mt-1 text-sm leading-6 text-white/55">
                          {item.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <form
              onSubmit={handleSubmit}
              className="border-t border-white/[0.08] bg-black/10 p-4 sm:p-5"
            >
              <div className="space-y-3">
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your name"
                  maxLength={60}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3 text-sm text-white outline-none backdrop-blur-xl placeholder:text-white/25 transition focus:border-white/20 focus:bg-white/[0.07]"
                />

                <div className="flex gap-2">
                  <input
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    placeholder="Write a comment..."
                    maxLength={500}
                    className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3 text-sm text-white outline-none backdrop-blur-xl placeholder:text-white/25 transition focus:border-white/20 focus:bg-white/[0.07]"
                  />

                  <button
                    type="submit"
                    disabled={!name.trim() || !comment.trim()}
                    aria-label="Post comment"
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.08] text-white transition hover:bg-white/[0.14] disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <Send size={17} strokeWidth={1.7} />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
