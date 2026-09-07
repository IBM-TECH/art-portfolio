"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { getVisitorId } from "@/lib/visitor";

type Props = {
  artworkId: string;
};

export default function RatingForm({ artworkId }: Props) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    if (!name.trim()) {
      setMessage({ type: "error", text: "Please enter your name." });
      return;
    }
    if (rating < 1) {
      setMessage({ type: "error", text: "Please select a star rating." });
      return;
    }

    setLoading(true);

    try {
      const visitorId = getVisitorId();

      const { error } = await supabase.from("ratings").insert({
        artwork_id: artworkId,
        visitor_id: visitorId,
        name: name.trim(),
        rating,
        review: review.trim() || null,
      });

      if (error) throw new Error(error.message);

      setMessage({ type: "success", text: "Thanks for your rating!" });
      setName("");
      setRating(0);
      setReview("");
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err.message || "Could not submit rating.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 rounded-3xl border border-white/[0.07] bg-white/[0.03] p-6"
    >
      <h3 className="text-sm font-medium text-white/80">Rate this artwork</h3>

      {/* Stars */}
      <div className="mt-4 flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setRating(value)}
            onMouseEnter={() => setHover(value)}
            onMouseLeave={() => setHover(0)}
            className="p-0.5 transition"
            aria-label={`${value} star${value > 1 ? "s" : ""}`}
          >
            <Star
              size={22}
              strokeWidth={1.6}
              className={
                value <= (hover || rating)
                  ? "fill-amber-400 text-amber-400"
                  : "text-white/25"
              }
            />
          </button>
        ))}
      </div>

      <div className="mt-5 space-y-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-violet-400/40"
        />

        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Optional short review..."
          rows={3}
          className="w-full resize-none rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-violet-400/40"
        />
      </div>

      {message && (
        <div
          className={`mt-4 rounded-2xl px-4 py-3 text-sm ${
            message.type === "success"
              ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
              : "border border-red-500/30 bg-red-500/10 text-red-300"
          }`}
        >
          {message.text}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-5 w-full rounded-2xl bg-violet-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-violet-400 disabled:opacity-60"
      >
        {loading ? "Submitting..." : "Submit rating"}
      </button>
    </form>
  );
}