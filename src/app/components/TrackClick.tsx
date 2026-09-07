"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { getVisitorId } from "@/lib/visitor";

export default function TrackClick({ artworkId }: { artworkId: string }) {
  useEffect(() => {
    async function track() {
      const visitorId = getVisitorId();
      await supabase.from("clicks").insert({
        artwork_id: artworkId,
        visitor_id: visitorId,
      });
    }
    track();
  }, [artworkId]);

  return null;
}