"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Rating = {
  id: string;
  name: string;
  rating: number;
  review: string | null;
  created_at: string;
};

export default function RatingsList({ artworkId }: { artworkId: string }) {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("ratings")
        .select("id, name, rating, review, created_at")
        .eq("artwork_id", artworkId)
        .order("created_at", { ascending: false });

      setRatings(data || []);
      setLoading(false);
    }
    load();
  }, [artworkId]);

  if (loading) {
    return <p className="mt-6 text-sm text-white/40">Loading ratings...</p>;
  }

  if (ratings.length === 0) {
    return (
      <p className="mt-6 text-sm text-white/35">
        No ratings yet. Be the first to rate this artwork.
      </p>
    );
  }

  const average =
    ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;

  return (
    <div className="mt-10">
      <div className="flex items-center gap-3">
        <h3 className="text-sm font-medium text-white/80">Ratings</h3>
        <div className="flex items-center gap-1 text-amber-400">
          <Star size={16} className="fill-amber-400" />
          <span className="text-sm font-medium">{average.toFixed(1)}</span>
        </div>
        <span className="text-xs text-white/35">
          ({ratings.length} rating{ratings.length > 1 ? "s" : ""})
        </span>
      </div>

      <div className="mt-5 space-y-4">
        {ratings.map((r) => (
          <div
            key={r.id}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-white/85">{r.name}</p>
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((v) => (
                  <Star
                    key={v}
                    size={14}
                    className={
                      v <= r.rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-white/20"
                    }
                  />
                ))}
              </div>
            </div>
            {r.review && (
              <p className="mt-2 text-sm leading-6 text-white/45">{r.review}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}