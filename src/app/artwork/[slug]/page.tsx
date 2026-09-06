import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { artworks } from "@/data/artworks";
import ReactionBar from "@/app/components/ReactionBar";
import ArtworkActions from "@/app/components/ArtworkActions";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ArtworkPage({ params }: Props) {
  const { slug } = await params;

  const artwork = artworks.find((item) => item.id === slug);

  if (!artwork) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#101113] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#101113]/85 backdrop-blur-2xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-white"
          >
            <ArrowLeft size={16} strokeWidth={1.8} />
            Back to gallery
          </Link>

          <span className="text-sm font-semibold tracking-[-0.01em]">
            Luqqss temmy
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Artwork Image */}
          <div className="overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.025]">
            <div className="relative aspect-[4/5] w-full">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm text-white/20">
                  Artwork preview
                </span>
              </div>
            </div>
          </div>

          {/* Artwork Info */}
          <div className="flex flex-col">
            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/35">
              {artwork.category}
            </p>

            <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              {artwork.title}
            </h1>

            <p className="mt-5 text-sm leading-7 text-white/50">
              {artwork.description}
            </p>

            <div className="mt-8">
<ReactionBar
  artworkId={artwork.id}
  loveCount={artwork.loves}
  likeCount={artwork.likes}
  wowCount={artwork.appreciates}
/>
            </div>

            <ArtworkActions
              artworkId={artwork.id}
              commentCount={artwork.comments}
            />

            <div className="mt-10 border-t border-white/[0.06] pt-8">
              <p className="text-xs text-white/30">
                Created by Luqqss temmy
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}