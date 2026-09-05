"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Upload } from "lucide-react";

const categories = [
"Art Nouveau",
"Art for T-Shirt Design",
"Concept Art",
"Character Design",
"Comic Book",
"Cover",
"Furry Art",
"Pixel Art",
"Pokémon Art",
"VTuber / PNGTuber",
"VRChat",
];

export default function AdminPage() {
const [title, setTitle] = useState("");
const [category, setCategory] = useState(categories[0]);
const [description, setDescription] = useState("");
const [imagePreview, setImagePreview] = useState<string | null>(null);

function handleImageChange(
event: React.ChangeEvent<HTMLInputElement>,
) {
const file = event.target.files?.[0];

if (!file) return;

const previewUrl = URL.createObjectURL(file);
setImagePreview(previewUrl);


}

function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
event.preventDefault();

console.log({
  title,
  category,
  description,
});


}

return (
<main className="min-h-screen bg-[#101113] text-white">
<div className="mx-auto max-w-5xl px-5 py-10 sm:px-8 lg:px-10">
<Link href="/" className="inline-flex items-center gap-2 text-sm text-white/40 transition hover:text-white" >
<ArrowLeft size={16} />
Back to website
</Link>

    <div className="mt-12">
      <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/30">
        Luqss Arts
      </p>

      <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em]">
        Artwork dashboard
      </h1>

      <p className="mt-3 max-w-xl text-sm leading-7 text-white/40">
        Upload and manage artwork for the Luqss Arts portfolio.
      </p>
    </div>

    <form
      onSubmit={handleSubmit}
      className="glass mt-10 rounded-3xl p-6 sm:p-8"
    >
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
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
              onChange={(event) => setTitle(event.target.value)}
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
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="mt-3 w-full rounded-2xl border border-white/[0.08] bg-[#18191c] px-4 py-3 text-sm text-white outline-none focus:border-violet-400/40"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
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
              onChange={(event) =>
                setDescription(event.target.value)
              }
              placeholder="Tell viewers about this artwork..."
              rows={7}
              className="mt-3 w-full resize-none rounded-2xl border border-white/[0.08] bg-white/[0.035] px-4 py-3 text-sm text-white outline-none placeholder:text-white/20 focus:border-violet-400/40"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-violet-500 px-5 py-3.5 text-sm font-medium text-white transition hover:bg-violet-400"
          >
            Publish artwork
          </button>
        </div>
      </div>
    </form>
  </div>
</main>


);
}