"use client";

import { useEffect, useState } from "react";
import { Heart, ThumbsUp, Sparkles } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { getVisitorId } from "@/lib/visitor";

type ReactionType = "love" | "like" | "appreciate";

type ReactionBarProps = {
  artworkId: string;
  loveCount?: number;
  likeCount?: number;
  wowCount?: number; // kept for backward compatibility
};

const reactions = [
  {
    type: "love" as const,
    label: "Love",
    icon: Heart,
  },
  {
    type: "like" as const,
    label: "Like",
    icon: ThumbsUp,
  },
  {
    type: "appreciate" as const,
    label: "Appreciate",
    icon: Sparkles,
  },
];

export default function ReactionBar({
  artworkId,
  loveCount = 0,
  likeCount = 0,
  wowCount = 0,
}: ReactionBarProps) {
  const [selected, setSelected] = useState<ReactionType | null>(null);
  const [counts, setCounts] = useState({
    love: loveCount,
    like: likeCount,
    appreciate: wowCount,
  });
  const [saving, setSaving] = useState(false);

  // Load real counts from Supabase
  useEffect(() => {
    async function loadCounts() {
      const { data, error } = await supabase
        .from("reactions")
        .select("reaction_type, visitor_id")
        .eq("artwork_id", artworkId);

      if (error) {
        console.error("Failed to load reactions:", error);
        return;
      }

      const next = { love: 0, like: 0, appreciate: 0 };
      const visitorId = getVisitorId();

      (data || []).forEach((row: any) => {
        if (row.reaction_type === "love") next.love += 1;
        if (row.reaction_type === "like") next.like += 1;
        if (
          row.reaction_type === "appreciate" ||
          row.reaction_type === "wow"
        ) {
          next.appreciate += 1;
        }

        if (visitorId && row.visitor_id === visitorId) {
          if (
            row.reaction_type === "love" ||
            row.reaction_type === "like" ||
            row.reaction_type === "appreciate" ||
            row.reaction_type === "wow"
          ) {
            setSelected(
              row.reaction_type === "wow"
                ? "appreciate"
                : (row.reaction_type as ReactionType)
            );
          }
        }
      });

      setCounts(next);
    }

    loadCounts();
  }, [artworkId]);

  const handleReaction = async (type: ReactionType) => {
    if (saving || selected !== null) return;

    setSaving(true);

    const visitorId = getVisitorId();
    if (!visitorId) {
      setSaving(false);
      return;
    }

    const { error } = await supabase.from("reactions").insert({
      artwork_id: artworkId,
      visitor_id: visitorId,
      reaction_type: type,
    });

    if (error) {
      // already reacted
      if (error.code === "23505") {
        setSelected(type);
      } else {
        console.error("Failed to save reaction:", error);
      }
      setSaving(false);
      return;
    }

    setSelected(type);
    setCounts((current) => ({
      ...current,
      [type]: current[type] + 1,
    }));
    setSaving(false);
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {reactions.map((reaction) => {
        const Icon = reaction.icon;
        const active = selected === reaction.type;

        let activeStyles = "";
        if (reaction.type === "love") {
          activeStyles = "border-red-400/30 bg-red-500/15 text-red-400";
        } else if (reaction.type === "like") {
          activeStyles = "border-blue-400/30 bg-blue-500/15 text-blue-400";
        } else {
          activeStyles =
            "border-emerald-400/30 bg-emerald-500/15 text-emerald-300";
        }

        return (
          <button
            key={reaction.type}
            type="button"
            disabled={saving || selected !== null}
            onClick={() => handleReaction(reaction.type)}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm backdrop-blur-xl transition-all duration-200 ${
              active
                ? activeStyles
                : "border-white/10 bg-white/[0.04] text-white/65 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
            } disabled:cursor-default`}
          >
            <Icon
              size={17}
              strokeWidth={1.7}
              className={
                active && reaction.type === "love" ? "fill-current" : ""
              }
            />
            <span>{reaction.label}</span>
            <span className={active ? "opacity-70" : "text-white/30"}>
              {counts[reaction.type]}
            </span>
          </button>
        );
      })}
    </div>
  );
}