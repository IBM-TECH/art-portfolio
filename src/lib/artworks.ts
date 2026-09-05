import { supabase } from "@/lib/supabase";

export type Artwork = {
  id: string;
  title: string;
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
  description: string | null;
  category_id: string | null;
  image_url: string;
  published_at: string;
  created_at: string;
  category: {
    name: string;
  }[] | null;
};

function formatArtwork(artwork: SupabaseArtwork): Artwork {
  return {
    id: artwork.id,
    title: artwork.title,
    description: artwork.description,
    category_id: artwork.category_id,
    category: artwork.category?.[0]?.name ?? "Uncategorized",
    image_url: artwork.image_url,
    published_at: artwork.published_at,
    created_at: artwork.created_at,
  };
}

export async function getArtworks(): Promise<Artwork[]> {
  const { data, error } = await supabase
    .from("artworks")
    .select(`
      id,
      title,
      description,
      category_id,
      image_url,
      published_at,
      created_at,
      category:categories (
        name
      )
    `)
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Failed to load artworks:", error);
    return [];
  }

  return (data as SupabaseArtwork[]).map(formatArtwork);
}

export async function getArtworkById(
  id: string
): Promise<Artwork | null> {
  const { data, error } = await supabase
    .from("artworks")
    .select(`
      id,
      title,
      description,
      category_id,
      image_url,
      published_at,
      created_at,
      category:categories (
        name
      )
    `)
    .eq("id", id)
    .single();

  if (error) {
    console.error("Failed to load artwork:", error);
    return null;
  }

  return formatArtwork(data as SupabaseArtwork);
}
export async function getArtworkBySlug(
  slug: string
): Promise<Artwork | null> {
  const { data, error } = await supabase
    .from("artworks")
    .select(`
      id,
      slug,
      title,
      description,
      category_id,
      image_url,
      published_at,
      created_at,
      category:categories (
        name
      )
    `)
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Failed to load artwork:", error);
    return null;
  }

  return formatArtwork(data as SupabaseArtwork);
}
