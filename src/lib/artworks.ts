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

export async function getArtworks(): Promise<Artwork[]> {
  const { data, error } = await supabase
    .from("artworks")
    .select("*")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Failed to load artworks:", error);
    return [];
  }

  // Load categories separately
  const { data: categories } = await supabase
    .from("categories")
    .select("id, name");

  const categoryMap = new Map(
    (categories || []).map((c) => [c.id, c.name])
  );

  return (data || []).map((item) => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    description: item.description,
    category_id: item.category_id,
    category: categoryMap.get(item.category_id) || "Uncategorized",
    image_url: item.image_url,
    published_at: item.published_at,
    created_at: item.created_at,
  }));
}

export async function getArtworkBySlug(
  slug: string
): Promise<Artwork | null> {
  const { data, error } = await supabase
    .from("artworks")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("Failed to load artwork:", error);
    return null;
  }

  if (!data) {
    return null;
  }

  let categoryName = "Uncategorized";

  if (data.category_id) {
    const { data: category } = await supabase
      .from("categories")
      .select("name")
      .eq("id", data.category_id)
      .maybeSingle();

    if (category?.name) {
      categoryName = category.name;
    }
  }

  return {
    id: data.id,
    title: data.title,
    slug: data.slug,
    description: data.description,
    category_id: data.category_id,
    category: categoryName,
    image_url: data.image_url,
    published_at: data.published_at,
    created_at: data.created_at,
  };
}