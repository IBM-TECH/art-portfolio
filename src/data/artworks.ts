import { supabase } from "@/lib/supabase";

export type Artwork = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  category_id: string | null;
  category: string;
  image_url: string;
  published_at: string;
  created_at: string;
};
type SupabaseArtwork = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  category_id: string | null;
  image_url: string;
  published_at: string;
  created_at: string;
  category: {
    name: string;
  } | null;   // ← changed from array to object
};

function formatArtwork(artwork: SupabaseArtwork): Artwork {
  return {
    id: artwork.id,
    title: artwork.title,
    slug: artwork.slug,
    description: artwork.description,
    category_id: artwork.category_id,
    category: artwork.category?.name ?? "Uncategorized",  // ← fixed
    image_url: artwork.image_url,
    published_at: artwork.published_at,
    created_at: artwork.created_at,
  };
}