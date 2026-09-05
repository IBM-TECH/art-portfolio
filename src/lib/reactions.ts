import { supabase } from "@/lib/supabase";

export type ReactionCounts = {
  love: number;
  like: number;
  wow: number;
};

export async function getReactionCounts(
  artworkId: string
): Promise<ReactionCounts> {
  const { data, error } = await supabase
    .from("reactions")
    .select("reaction_type")
    .eq("artwork_id", artworkId);

  if (error) {
    console.error("Failed to load reaction counts:", error);

    return {
      love: 0,
      like: 0,
      wow: 0,
    };
  }

  const counts: ReactionCounts = {
    love: 0,
    like: 0,
    wow: 0,
  };

  for (const reaction of data ?? []) {
    if (reaction.reaction_type === "love") {
      counts.love++;
    } else if (reaction.reaction_type === "like") {
      counts.like++;
    } else if (reaction.reaction_type === "wow") {
      counts.wow++;
    }
  }

  return counts;
}
