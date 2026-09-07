"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Upload,
  Loader2,
  Pencil,
  Trash2,
  Plus,
  BarChart3,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { getArtworks, type Artwork } from "@/lib/artworks";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type Category = {
  id: string;
  name: string;
};

type View = "list" | "upload" | "ranking";

export default function AdminPage() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<View>("list");

  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  async function loadData() {
    setLoading(true);
    const [artworksData, categoriesRes] = await Promise.all([
      getArtworks(),
      supabase.from("categories").select("id, name").order("name"),
    ]);

    setArtworks(artworksData);
    setCategories(categoriesRes.data || []);

    if (categoriesRes.data && categoriesRes.data.length > 0 && !categoryId) {
      setCategoryId(categoriesRes.data[0].id);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files;
    if (!selected || selected.length === 0) return;

    const list = Array.from(selected).slice(0, 15);
    setFiles(list);
    setImagePreviews(list.map((f) => URL.createObjectURL(f)));
  }

  function createSlug(text: string) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function resetForm() {
    setTitle("");
    setDescription("");
    setFiles([]);
    setImagePreviews([]);
    setEditingId(null);
    setMessage(null);
    if (categories.length > 0) {
      setCategoryId(categories[0].id);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    if (!categoryId) {
      setMessage({ type: "error", text: "Category is required." });
      return;
    }

    // Edit single artwork
    if (editingId) {
      if (!title.trim()) {
        setMessage({ type: "error", text: "Title is required." });
        return;
      }

      setUploading(true);
      try {
        const slug = createSlug(title);
        const updateData: any = {
          title: title.trim(),
          slug,
          description: description.trim() || null,
          category_id: categoryId,
        };

        if (files.length === 1) {
          const file = files[0];
          const fileExt = file.name.split(".").pop();
          const fileName = `${slug}-${Date.now()}.${fileExt}`;
          const filePath = `artworks/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from("artworks")
            .upload(filePath, file, { cacheControl: "3600", upsert: false });

          if (uploadError) throw new Error(uploadError.message);

          const {
            data: { publicUrl },
          } = supabase.storage.from("artworks").getPublicUrl(filePath);

          updateData.image_url = publicUrl;
        }

        const { error } = await supabase
          .from("artworks")
          .update(updateData)
          .eq("id", editingId);

        if (error) throw new Error(error.message);

        setMessage({ type: "success", text: "Artwork updated successfully!" });
        resetForm();
        setView("list");
        await loadData();
      } catch (err: any) {
        setMessage({ type: "error", text: err.message || "Update failed." });
      } finally {
        setUploading(false);
      }
      return;
    }

    // Multi / new upload
    if (files.length === 0) {
      setMessage({ type: "error", text: "Please select at least one image." });
      return;
    }

    setUploading(true);

    try {
      let successCount = 0;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const baseName =
          files.length === 1 && title.trim()
            ? title.trim()
            : file.name.replace(/\.[^/.]+$/, "") || `Artwork ${i + 1}`;

        const slug = createSlug(baseName) + "-" + Date.now() + "-" + i;
        const fileExt = file.name.split(".").pop();
        const fileName = `${slug}.${fileExt}`;
        const filePath = `artworks/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("artworks")
          .upload(filePath, file, { cacheControl: "3600", upsert: false });

        if (uploadError) {
          console.error(uploadError);
          continue;
        }

        const {
          data: { publicUrl },
        } = supabase.storage.from("artworks").getPublicUrl(filePath);

        const { error: insertError } = await supabase.from("artworks").insert({
          title: baseName,
          slug,
          description:
            files.length === 1 ? description.trim() || null : null,
          category_id: categoryId,
          image_url: publicUrl,
          published_at: new Date().toISOString(),
        });

        if (!insertError) successCount++;
      }

      setMessage({
        type: "success",
        text: `${successCount} artwork${successCount > 1 ? "s" : ""} published successfully!`,
      });

      resetForm();
      setView("list");
      await loadData();
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err.message || "Something went wrong.",
      });
    } finally {
      setUploading(false);
    }
  }

  function startEdit(artwork: Artwork) {
    setEditingId(artwork.id);
    setTitle(artwork.title);
    setDescription(artwork.description || "");
    setCategoryId(artwork.category_id || "");
    setImagePreviews(artwork.image_url ? [artwork.image_url] : []);
    setFiles([]);
    setMessage(null);
    setView("upload");
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this artwork?")) return;

    const { error } = await supabase.from("artworks").delete().eq("id", id);
    if (error) {
      alert("Failed to delete: " + error.message);
      return;
    }
    await loadData();
  }

  return (
    <main className="min-h-screen bg-[#101113] text-white">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-white/40 transition hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to website
        </Link>

        <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/30">
              Luqqss temmy
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em]">
              Artwork dashboard
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-7 text-white/40">
              Upload, edit and manage your artworks.
            </p>
          </div>

          {view === "list" && (
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setView("ranking")}
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-white/80 transition hover:bg-white/[0.08] hover:text-white"
              >
                <BarChart3 size={18} />
                See Ranking
              </button>

              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setView("upload");
                }}
                className="inline-flex items-center gap-2 rounded-2xl bg-violet-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-violet-400"
              >
                <Plus size={18} />
                Upload new artwork
              </button>
            </div>
          )}
        </div>

        {/* UPLOAD VIEW */}
        {view === "upload" && (
          <form
            onSubmit={handleSubmit}
            className="mt-10 rounded-3xl border border-white/[0.07] bg-white/[0.03] p-6 sm:p-8"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-medium">
                {editingId ? "Edit artwork" : "Upload artwork"}
              </h2>
              <button
                type="button"
                onClick={() => {
                  setView("list");
                  resetForm();
                }}
                className="text-sm text-white/40 hover:text-white"
              >
                ← Back to artworks
              </button>
            </div>

            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              {/* Images */}
              <div>
                <label className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
                  Artwork image{files.length > 1 ? "s" : ""} (max 15)
                </label>

                <label className="mt-3 flex min-h-[280px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-white/10 bg-white/[0.025] p-4 transition hover:border-white/20">
                  {imagePreviews.length > 0 ? (
                    <div className="grid w-full grid-cols-3 gap-2 sm:grid-cols-4">
                      {imagePreviews.map((src, i) => (
                        <div
                          key={i}
                          className="aspect-square overflow-hidden rounded-xl border border-white/10"
                        >
                          <img
                            src={src}
                            alt={`Preview ${i + 1}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload size={28} className="mx-auto text-white/30" />
                      <p className="mt-4 text-sm text-white/60">
                        Upload one or multiple artworks
                      </p>
                      <p className="mt-1 text-xs text-white/25">
                        PNG, JPG, WEBP · Max 15
                      </p>
                    </div>
                  )}

                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>

                {files.length > 0 && (
                  <p className="mt-2 text-xs text-white/40">
                    {files.length} image{files.length > 1 ? "s" : ""} selected
                  </p>
                )}
              </div>

              {/* Fields */}
              <div className="space-y-6">
                {/* Category always visible */}
                <div>
                  <label className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
                    Category *
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="mt-3 w-full rounded-2xl border border-white/[0.08] bg-[#18191c] px-4 py-3 text-sm text-white outline-none focus:border-violet-400/40"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Title & Description only when 0 or 1 image */}
                {files.length <= 1 && (
                  <>
                    <div>
                      <label className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
                        Title
                      </label>
                      <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Artwork title"
                        className="mt-3 w-full rounded-2xl border border-white/[0.08] bg-white/[0.035] px-4 py-3 text-sm text-white outline-none placeholder:text-white/20 focus:border-violet-400/40"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
                        Description
                      </label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Tell viewers about this artwork..."
                        rows={5}
                        className="mt-3 w-full resize-none rounded-2xl border border-white/[0.08] bg-white/[0.035] px-4 py-3 text-sm text-white outline-none placeholder:text-white/20 focus:border-violet-400/40"
                      />
                    </div>
                  </>
                )}

                {files.length > 1 && (
                  <p className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/45">
                    Multiple images selected. Title & description are hidden.
                    All images will be published under the selected category.
                  </p>
                )}

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
                  disabled={uploading}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-500 px-5 py-3.5 text-sm font-medium text-white transition hover:bg-violet-400 disabled:opacity-60"
                >
                  {uploading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Uploading...
                    </>
                  ) : editingId ? (
                    "Update artwork"
                  ) : files.length > 1 ? (
                    `Publish ${files.length} artworks`
                  ) : (
                    "Publish artwork"
                  )}
                </button>
              </div>
            </div>
          </form>
        )}

        {/* LIST VIEW */}
        {view === "list" && (
          <div className="mt-14">
            <h2 className="text-lg font-medium">All artworks</h2>

            {loading ? (
              <p className="mt-8 text-sm text-white/40">Loading...</p>
            ) : artworks.length === 0 ? (
              <p className="mt-8 text-sm text-white/40">
                No artworks yet. Upload your first one.
              </p>
            ) : (
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {artworks.map((artwork) => (
                  <div
                    key={artwork.id}
                    className="overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.03] transition hover:border-white/[0.12]"
                  >
                    <div className="aspect-[3/4] w-full overflow-hidden">
                      {artwork.image_url ? (
                        <img
                          src={artwork.image_url}
                          alt={artwork.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-white/20">
                          No image
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      <h3 className="text-base font-medium text-white/90">
                        {artwork.title}
                      </h3>
                      <p className="mt-1 text-sm text-white/40">
                        {artwork.category}
                      </p>

                      <div className="mt-5 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => startEdit(artwork)}
                          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white/70 transition hover:bg-white/[0.08] hover:text-white"
                        >
                          <Pencil size={15} />
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(artwork.id)}
                          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2.5 text-sm text-red-300 transition hover:bg-red-500/20"
                        >
                          <Trash2 size={15} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* RANKING VIEW - keep your existing RankingSection if you still have it */}
        {view === "ranking" && (
          <div className="mt-14">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-lg font-medium">Rankings</h2>
              <button
                type="button"
                onClick={() => setView("list")}
                className="text-sm text-white/40 hover:text-white"
              >
                ← Back to artworks
              </button>
            </div>
            <p className="text-sm text-white/40">
              Ranking chart is available. (Use your previous RankingSection if needed.)
            </p>
          </div>
        )}
      </div>
    </main>
  );
}