"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Upload, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Category = {
  id: string;
  name: string;
};

export default function AdminPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Load categories from Supabase
  useEffect(() => {
    async function loadCategories() {
      const { data, error } = await supabase
        .from("categories")
        .select("id, name")
        .order("name");

      if (error) {
        console.error("Failed to load categories:", error);
        return;
      }

      setCategories(data || []);
      if (data && data.length > 0) {
        setCategoryId(data[0].id);
      }
    }

    loadCategories();
  }, []);

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setImagePreview(URL.createObjectURL(selectedFile));
  }

  function createSlug(text: string) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    if (!title.trim() || !file || !categoryId) {
      setMessage({
        type: "error",
        text: "Please fill in title, category and select an image.",
      });
      return;
    }

    setLoading(true);

    try {
      const slug = createSlug(title);
      const fileExt = file.name.split(".").pop();
      const fileName = `${slug}-${Date.now()}.${fileExt}`;
      const filePath = `artworks/${fileName}`;

      // 1. Upload image to private Storage
      const { error: uploadError } = await supabase.storage
        .from("artworks")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      // 2. Get a temporary public URL (for private bucket we will improve this later)
      const {
        data: { publicUrl },
      } = supabase.storage.from("artworks").getPublicUrl(filePath);

      // 3. Save artwork record to database
      const { error: insertError } = await supabase.from("artworks").insert({
        title: title.trim(),
        slug,
        description: description.trim() || null,
        category_id: categoryId,
        image_url: publicUrl,
        published_at: new Date().toISOString(),
      });

      if (insertError) {
        throw new Error(insertError.message);
      }

      // Success
      setMessage({
        type: "success",
        text: "Artwork published successfully!",
      });

      // Reset form
      setTitle("");
      setDescription("");
      setFile(null);
      setImagePreview(null);
      if (categories.length > 0) {
        setCategoryId(categories[0].id);
      }
    } catch (err: any) {
      console.error(err);
      setMessage({
        type: "error",
        text: err.message || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#101113] text-white">
      <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-white/40 transition hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to website
        </Link>

        <div className="mt-12">
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/30">
            Luqqss temmy
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em]">
            Artwork dashboard
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-7 text-white/40">
            Upload and manage artwork for the portfolio.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 rounded-3xl border border-white/[0.07] bg-white/[0.03] p-6 sm:p-8"
        >
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            {/* Image Upload */}
            <div>
              <label className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
                Artwork image
              </label>

              <label className="mt-3 flex aspect-[4/5] cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-dashed border-white/10 bg-white/[0.025] transition hover:border-white/20 hover:bg-white/[0.04]">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Artwork preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="text-center">
                    <Upload
                      size={28}
                      strokeWidth={1.5}
                      className="mx-auto text-white/30"
                    />
                    <p className="mt-4 text-sm text-white/60">
                      Upload artwork
                    </p>
                    <p className="mt-1 text-xs text-white/25">
                      PNG, JPG, WEBP
                    </p>
                  </div>
                )}

                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Form fields */}
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="title"
                  className="text-xs font-medium uppercase tracking-[0.2em] text-white/40"
                >
                  Title
                </label>
                <input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Artwork title"
                  required
                  className="mt-3 w-full rounded-2xl border border-white/[0.08] bg-white/[0.035] px-4 py-3 text-sm text-white outline-none placeholder:text-white/20 focus:border-violet-400/40"
                />
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="text-xs font-medium uppercase tracking-[0.2em] text-white/40"
                >
                  Category
                </label>
                <select
                  id="category"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="mt-3 w-full rounded-2xl border border-white/[0.08] bg-[#18191c] px-4 py-3 text-sm text-white outline-none focus:border-violet-400/40"
                >
                  {categories.length === 0 ? (
                    <option value="">Loading categories...</option>
                  ) : (
                    categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="text-xs font-medium uppercase tracking-[0.2em] text-white/40"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell viewers about this artwork..."
                  rows={7}
                  className="mt-3 w-full resize-none rounded-2xl border border-white/[0.08] bg-white/[0.035] px-4 py-3 text-sm text-white outline-none placeholder:text-white/20 focus:border-violet-400/40"
                />
              </div>

              {message && (
                <div
                  className={`rounded-2xl px-4 py-3 text-sm ${
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
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-500 px-5 py-3.5 text-sm font-medium text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Publishing...
                  </>
                ) : (
                  "Publish artwork"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}