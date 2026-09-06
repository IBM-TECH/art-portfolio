import Header from "./components/header";
import Footer from "./components/footer";
import ArtworkGallery from "./components/ArtworkGallery";
import RecentWorks from "./components/RecentWorks";
import FAQ from "./components/FAQ";



export default function Home() {
  return (
    <main className="min-h-screen bg-[#101113] text-white">
      <div className="aurora-bg" />
      <Header />


      {/* Hero */}
      <section className="relative overflow-hidden bg-[#101113]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-[-180px] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-violet-500/[0.07] blur-[120px]" />

          <div className="absolute right-[-100px] top-[30%] h-[300px] w-[300px] rounded-full bg-cyan-400/[0.04] blur-[100px]" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-7xl items-center px-6 py-24 lg:px-10 lg:py-32">
          <div className="max-w-4xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/30">
              Digital art · Illustration · Visual storytelling
            </p>

        <h1 className="mt-6 text-6xl font-semibold tracking-[-0.06em] text-white sm:text-7xl lg:text-9xl">
  Luqqss
  <br />
  temmy
</h1>

            <p className="mt-8 max-w-xl border-l border-violet-400/40 pl-5 text-sm leading-7 text-white/40 sm:text-base">
              An art discovery and creative community for original
              artwork, character design, sequential art and visual
              stories.
            </p>
          </div>
        </div>
      </section>

      {/* Artwork discovery */}
      <ArtworkGallery />

      {/* Recent works */}
      <RecentWorks />

      {/* About */}
<section
  id="about"
  className="border-t border-white/[0.06] bg-[#101113] px-6 py-24 lg:px-10 lg:py-32"
>
  <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
    <div>
      <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/30">
        About Luqqss temmy
      </p>

      <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
        Digital Illustrator & Comic Artist
      </h2>

      <p className="mt-5 max-w-2xl border-l border-cyan-400/50 pl-5 text-base leading-7 text-cyan-300/90">
        Specializing in character design, sequential art, and vibrant digital storytelling.
      </p>

      <div className="mt-8 max-w-2xl space-y-5 text-sm leading-7 text-white/45">
        <p>
          I'm Luqqss Temmy — a concept artist and art director alongside a team with eight years of building worlds that feel inhabited. My work sits at the seam between hand-painted illustration and procedural 3D, leaning hard into neon, atmosphere, and the quiet architecture of imagined cities.
        </p>

        <p>
          I've shipped art for AAA games, indie passion projects, music videos, two feature films I can't talk about yet, and a small library of brand systems for companies who wanted to look like the future. I run a small remote team and take on a maximum of four director-level engagements per year.
        </p>

        <p>
          When I'm not painting, on a long run, or arguing with my cat about the correct temperature of the studio.
        </p>
      </div>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-2 gap-3">
      {[
        ["8+", "YEARS EXP"],
        ["100+", "PROJECTS"],
        ["20+", "CLIENTS"],
        ["2+", "AWARDS"],
      ].map(([number, label]) => (
        <div
          key={label}
          className="rounded-3xl border border-white/[0.07] bg-white/[0.03] p-6"
        >
          <p className="text-4xl font-semibold tracking-[-0.05em] text-white">
            {number}
          </p>
          <p className="mt-2 text-[10px] font-medium tracking-[0.2em] text-white/30">
            {label}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Contact */}
      <section
        id="contact"
        className="border-t border-white/[0.06] bg-[#101113] px-6 py-24 lg:px-10 lg:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/30">
            Contact
          </p>

          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
            Let's connect.
          </h2>

<p className="mt-4 max-w-xl text-sm leading-7 text-white/40">
  Have a project, commission or creative idea? Reach
  out to Luqqss temmy and let's talk.
</p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ />

      <Footer />
    </main>
  );
}
