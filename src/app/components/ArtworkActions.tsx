"use client";

import { Share2 } from "lucide-react";
import CommentModal from "@/app/components/CommentModal";

type ArtworkActionsProps = {
artworkId: string;
commentCount?: number;
};

export default function ArtworkActions({
artworkId,
commentCount = 0,
}: ArtworkActionsProps) {
return (
<div className="mt-6 flex items-center gap-3">
<CommentModal artworkId={artworkId} commentCount={commentCount} />

  <button
    type="button"
    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2.5 text-sm text-white/65 backdrop-blur-xl transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
  >
    <Share2 size={17} strokeWidth={1.8} />
    <span>Share</span>
  </button>
</div>


);
}