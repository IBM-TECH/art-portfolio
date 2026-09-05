import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#101113] text-white">

      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#101113]/80 backdrop-blur-2xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10  text-sm font-bold text-white">
              L
            </div>

            <span className="text-sm font-semibold tracking-[-0.02em]">
              Luqss Arts
            </span>
          </Link>

          {/* Navigation links */}
          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="/"
              className="text-sm text-white transition-colors"
            >
              Home
            </Link>

            <Link
              href="/#work"
              className="text-sm text-white/45 transition-colors hover:text-white"
            >
              Work
            </Link>

            <Link
              href="/#about"
              className="text-sm text-white/45 transition-colors hover:text-white"
            >
              About
            </Link>

            <Link
              href="/#contact"
              className="text-sm text-white/45 transition-colors hover:text-white"
            >
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-violet-500/[0.07] blur-[140px]" />

        <div className="relative mx-auto max-w-7xl px-5 pb-24 pt-24 sm:px-8 lg:px-10 lg:pb-32 lg:pt-32">
          <div className="max-w-3xl">

            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/35">
              Digital art · Illustration · Visual storytelling
            </p>

            <h1 className="mt-6 text-6xl font-semibold tracking-[-0.06em] text-white sm:text-7xl lg:text-8xl">
              Luqss
              <br />
              Arts
            </h1>

            <p className="mt-7 max-w-xl border-l border-violet-400/50 pl-5 text-sm leading-7 text-white/45 sm:text-base">
              An art discovery and creative community for original
              artwork, character design, sequential art and visual
              stories.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="#work"
                className="inline-flex items-center gap-2 rounded-full bg-violet-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-violet-400"
              >
                Explore artwork
                <ArrowRight size={16} />
              </Link>

              <Link
                href="#contact"
                className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.035] px-5 py-3 text-sm text-white/70 backdrop-blur-xl transition hover:border-white/20 hover:bg-white/[0.035] hover:text-white"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Discover */}
      <section
        id="work"
        className="border-t border-white/[0.06]"
      >
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">

          <div className="flex flex-col gap-8">

            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/30">
                Discover
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
                Explore artwork
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-7 text-white/40">
                Discover original artwork, creative experiments and
                visual stories from Luqss Arts.
              </p>
            </div>

            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {[
  "All Categories",
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
]
.map((category, index) => (
                <button
                  key={category}
                  type="button"
                  className={`shrink-0 rounded-full border px-4 py-2 text-xs backdrop-blur-xl transition ${
                    index === 0
                      ? "border-white/15 bg-white/[0.09] text-white"
                      : "border-white/[0.07] bg-white/[0.025] text-white/40 hover:border-white/15 hover:bg-white/[0.06] hover:text-white/75"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Artwork grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="group overflow-hidden rounded-[24px] border border-white/[0.07] bg-white/[0.025] backdrop-blur-xl"
                >
                  <div className="aspect-[4/5] bg-white/[0.025]">
                    <div className="flex h-full items-center justify-center text-xs text-white/15">
                      Artwork preview
                    </div>
                  </div>

                  <div className="p-5">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/25">
                      Illustration
                    </p>

                    <h3 className="mt-2 text-sm font-medium text-white/85">
                      Recent artwork
                    </h3>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* About anchor */}
      <section
        id="about"
        className="border-t border-white/[0.06]"
      >
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10">
          <p className="text-[10px] uppercase tracking-[0.25em] text-white/30">
            About Luqss Arts
          </p>

          <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
            Digital art built around worlds, characters and stories.
          </h2>
        </div>
      </section>

      {/* FAQ */}
<section className="border-t border-white/[0.06]">
  <div className="mx-auto max-w-4xl px-5 py-24 sm:px-8 lg:px-10">

    <div className="mb-10">
      <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/30">
        FAQ
      </p>

      <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
        Frequently asked questions
      </h2>

      <p className="mt-3 max-w-xl text-sm leading-7 text-white/40">
        Everything you need to know about Luqss Arts, artwork,
        commissions and working together.
      </p>
    </div>

    <div className="space-y-3">

      <details className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] px-5 backdrop-blur-xl">
        <summary className="flex cursor-pointer list-none items-center justify-between py-5 text-sm font-medium text-white/80">
          Can I commission artwork from Luqss Arts?
          <span className="text-white/30 transition-transform group-open:rotate-45">
            +
          </span>
        </summary>

        <p className="pb-5 pr-8 text-sm leading-7 text-white/40">
          Yes. Luqss Arts works with clients on character design,
          illustrations, comic artwork and other visual projects.
        </p>
      </details>

      <details className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] px-5 backdrop-blur-xl">
        <summary className="flex cursor-pointer list-none items-center justify-between py-5 text-sm font-medium text-white/80">
          Can I use artwork displayed on the website?
          <span className="text-white/30 transition-transform group-open:rotate-45">
            +
          </span>
        </summary>

        <p className="pb-5 pr-8 text-sm leading-7 text-white/40">
          Artwork displayed on Luqss Arts is protected creative
          work. Please contact Luqss Arts before using, reproducing
          or distributing any artwork.
        </p>
      </details>

      <details className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] px-5 backdrop-blur-xl">
        <summary className="flex cursor-pointer list-none items-center justify-between py-5 text-sm font-medium text-white/80">
          What kind of projects does Luqss Arts accept?
          <span className="text-white/30 transition-transform group-open:rotate-45">
            +
          </span>
        </summary>

        <p className="pb-5 pr-8 text-sm leading-7 text-white/40">
          Projects can include character design, digital
          illustration, comics, concept art and visual storytelling.
        </p>
      </details>

      <details className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] px-5 backdrop-blur-xl">
        <summary className="flex cursor-pointer list-none items-center justify-between py-5 text-sm font-medium text-white/80">
          How can I contact Luqss Arts?
          <span className="text-white/30 transition-transform group-open:rotate-45">
            +
          </span>
        </summary>

        <p className="pb-5 pr-8 text-sm leading-7 text-white/40">
          You can reach Luqss Arts through the contact options
          provided in the footer.
        </p>
      </details>

      <details className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] px-5 backdrop-blur-xl">
        <summary className="flex cursor-pointer list-none items-center justify-between py-5 text-sm font-medium text-white/80">
          Can businesses work with Luqss Arts?
          <span className="text-white/30 transition-transform group-open:rotate-45">
            +
          </span>
        </summary>

        <p className="pb-5 pr-8 text-sm leading-7 text-white/40">
          Absolutely. Luqss Arts can work with individuals,
          creators, brands and businesses on suitable visual
          projects.
        </p>
      </details>

    </div>
  </div>
</section>


      {/* Footer */}
      <footer
        id="contact"
        className="border-t border-white/[0.06]"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">

          <div>
            <p className="text-sm font-semibold">
              Luqss Arts
            </p>

            <p className="mt-1 text-xs text-white/30">
              Art discovery · Creative community
            </p>
          </div>

          <div className="flex items-center gap-5 text-sm text-white/40">
            <span className="transition hover:text-white">
              Discord
            </span>

            <span className="transition hover:text-white">
              Email
            </span>

            <span className="transition hover:text-white">
              Fiverr
            </span>

            <span className="transition hover:text-white">
              Telegram
            </span>
          </div>
        </div>
      </footer>

    </main>
  );
}
