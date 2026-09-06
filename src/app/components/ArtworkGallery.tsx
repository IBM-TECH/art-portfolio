"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  Heart,
  MessageCircle,
  Share2,
  Search,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

import { artworks } from "@/data/artworks";
import { categories } from "@/data/categories";

export default function ArtworkGallery() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All Categories");

  const categoryRef = useRef<HTMLDivElement>(null);

  const filteredArtworks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return artworks.filter((artwork) => {
      const matchesCategory =
        selectedCategory === "All Categories" ||
        artwork.category.toLowerCase() ===
          selectedCategory.toLowerCase();

      if (!matchesCategory) {
        return false;
      }

      if (!query) {
        return true;
      }

      const searchableText = [
        artwork.title,
        artwork.description,
        artwork.category,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    });
  }, [searchQuery, selectedCategory]);

  const scrollCategories = () => {
    categoryRef.current?.scrollBy({
      left: 320,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="work"
      className="border-t border-white/[0.06] bg-[#101113] px-5 py-24 text-white sm:px-8 lg:px-10 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/30">
            Discover
          </p>

          <h2 className="mt-3 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
            Explore artwork
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/40">
            Discover original artwork, creative experiments and
            visual stories from Luqss Arts.
          </p>
        </div>

        {/* Search */}
        <div className="relative mt-8 max-w-xl">
          <Search
            size={18}
            strokeWidth={1.8}
            className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-white/35"
          />

          <input
            type="search"
            value={searchQuery}
            onChange={(event) =>
              setSearchQuery(event.target.value)
            }
            placeholder="Search artwork..."
            className="h-12 w-full rounded-2xl border border-white/[0.09] bg-white/[0.035] pl-11 pr-5 text-sm text-white outline-none backdrop-blur-2xl transition placeholder:text-white/25 focus:border-white/20 focus:bg-white/[0.06]"
          />
        </div>

        {/* Categories */}
        <div className="relative mt-8">

          <div
  ref={categoryRef}
    className="hide-scrollbar flex gap-2 overflow-x-auto scroll-smooth px-12"
  >
    {categories.map((category) => {
      const active = selectedCategory === category;

      return (
        <button
          key={category}
          type="button"
          onClick={() => setSelectedCategory(category)}
          aria-pressed={active}
          className={`shrink-0 rounded-full border px-4 py-2.5 text-xs font-medium backdrop-blur-xl transition ${
            active
              ? "border-white/15 bg-white/[0.1] text-white"
              : "border-white/[0.07] bg-white/[0.035] text-white/45 hover:border-white/15 hover:bg-white/[0.07] hover:text-white/80"
          }`}
        >
          {category}
        </button>
      );
    })}
  </div>

  {/* Left arrow */}
  <button
    type="button"
    aria-label="Previous categories"
    onClick={() => {
      categoryRef.current?.scrollBy({
        left: -320,
        behavior: "smooth",
      });
    }}
    className="absolute left-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#17191c]/95 text-white/60 shadow-xl backdrop-blur-xl transition hover:border-white/20 hover:bg-[#202226] hover:text-white"
  >
    <ArrowLeft size={17} strokeWidth={1.8} />
  </button>

  {/* Right arrow */}
  <button
    type="button"
    aria-label="Next categories"
    onClick={() => {
      categoryRef.current?.scrollBy({
        left: 320,
        behavior: "smooth",
      });
    }}
    className="absolute right-0 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#17191c]/95 text-white/60 shadow-xl backdrop-blur-xl transition hover:border-white/20 hover:bg-[#202226] hover:text-white"
  >
    <ArrowRight size={17} strokeWidth={1.8} />
  </button>
</div>

        {/* Gallery */}
        {filteredArtworks.length > 0 ? (
          <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3">
            {filteredArtworks.map((artwork) => (
              <article
                key={artwork.id}
                className="group mb-5 break-inside-avoid"
              >
                <Link
                  href={`/artwork/${artwork.id}`}
                  className="block"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] border border-white/[0.07] bg-white/[0.025] shadow-2xl backdrop-blur-xl transition duration-300 group-hover:border-white/[0.13]">

                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-medium text-white/15">
                        Artwork preview
                      </span>
                    </div>

                    {/* Hover actions */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-5 pt-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="flex items-center justify-between text-white">

                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1.5 text-xs text-white/80">
                            <Heart
                              size={17}
                              strokeWidth={1.8}
                            />
                            {artwork.loves}
                          </span>

                          <span className="flex items-center gap-1.5 text-xs text-white/80">
                            <MessageCircle
                              size={17}
                              strokeWidth={1.8}
                            />
                            {artwork.comments}
                          </span>
                        </div>

                        <span>
                          <Share2
                            size={17}
                            strokeWidth={1.8}
                          />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Artwork information */}
                  <div className="flex items-start justify-between gap-4 px-1 pt-4">
                    <div>
                      <h3 className="text-sm font-semibold text-white/90">
                        {artwork.title}
                      </h3>

                      <p className="mt-1 text-xs text-white/35">
                        {artwork.category}
                      </p>
                    </div>

<span className="text-xs text-white/25">
  Luqqss temmy
</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-[24px] border border-white/[0.08] bg-white/[0.025] px-6 py-20 text-center backdrop-blur-xl">
            <Search
              size={22}
              strokeWidth={1.5}
              className="mx-auto text-white/20"
            />

            <p className="mt-4 text-sm font-medium text-white/70">
              No artwork found
            </p>

            <p className="mt-2 text-xs text-white/35">
              Try another search term or category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
