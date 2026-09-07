"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getArtworks, type Artwork } from "@/lib/artworks";

export default function RecentWorks() {
  const [works, setWorks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getArtworks();
      // Show the 3 most recent
      setWorks(data.slice(0, 3));
      setLoading(false);
    }
    load();
  }, []);

  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] bg-[#101113] px-6 py-24 text-white lg:px-10 lg:py-32">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 overflow-hidden opacity-40">
        <div className="absolute -bottom-32 left-1/2 h-72 w-[140%] -translate-x-1/2 animate-[wave_9s_ease-in-out_infinite] rounded-[50%] bg-violet-500/[0.07] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/35">
            Fresh work
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-[-0.04em] text-white sm:text-5xl">
            Recent works
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-white/45">
            A look at the latest artwork published by Luqqss temmy.
          </p>
        </div>

        {loading ? (
          <div className="mt-16 text-center text-sm text-white/40">
            Loading...
          </div>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {works.map((artwork) => (
              <article key={artwork.id} className="group">
                <Link
                  href={`/artwork/${(artwork as any).slug}`}
                  className="block"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] backdrop-blur-xl transition duration-300 group-hover:border-white/[0.14]">
                    {artwork.image_url ? (
                      <img
                        src={artwork.image_url}
                        alt={artwork.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-medium text-white/15">
                          Artwork preview
                        </span>
                      </div>
                    )}

                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-6 pt-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <p className="text-xs font-medium text-white/80">
                        {artwork.category}
                      </p>
                    </div>
                  </div>
                </Link>

                <div className="pt-4">
                  <h3 className="text-sm font-semibold text-white/90">
                    {artwork.title}
                  </h3>
                  <p className="mt-1 text-xs text-white/35">
                    {artwork.category}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}