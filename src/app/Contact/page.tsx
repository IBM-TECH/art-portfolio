import Link from "next/link";
import { ArrowLeft, Mail, MessageCircle, Send } from "lucide-react";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";

const digitalPresence = [
  {
    label: "Email",
    value: "sulaemonluqmon127@gmail.com",
    href: "mailto:sulaemonluqmon127@gmail.com",
    icon: Mail,
  },
  {
    label: "Discord",
    value: "Mile_temss",
    href: "https://discord.com/users/Mile_temss", // update if you get a real invite
    icon: MessageCircle,
  },
  {
    label: "Telegram",
    value: "Mile_temss",
    href: "https://t.me/Mile_temss",
    icon: Send,
  },
  {
    label: "Fiverr",
    value: "luqs_media",
    href: "https://fiverr.com/luqs_media",
    icon: null, // custom svg below
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#101113] text-white">
      <Header />

      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        {/* Badge */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Available for new engagements
          </span>
        </div>

        {/* Title */}
        <div className="mt-8 text-center">
          <h1 className="text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-6xl">
            Let&apos;s build something
            <br />
            that glows.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/45">
            Available for art direction, concept art commissions, and full
            visual identity engagements. Most replies within 24 hours.
          </p>
        </div>

        {/* Content */}
        <div className="mt-16 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left - message */}
          <div className="rounded-3xl border border-white/[0.07] bg-white/[0.03] p-8 backdrop-blur-xl">
            <div className="h-1 w-24 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500" />

            <p className="mt-8 text-sm leading-7 text-white/50">
              Send a project brief, a mood, or a half-formed idea — I&apos;ll
              come back with timeline, budget, and a starting direction within
              one business day.
            </p>

            <p className="mt-6 text-sm leading-7 text-white/50">
              Reach out by email, or ping me on Discord / Telegram / Fiverr —
              whichever is easiest for you.
            </p>

            {/* Simple contact form (mailto for now) */}
            <form
              action="mailto:sulaemonluqmon127@gmail.com"
              method="GET"
              className="mt-10 space-y-4"
            >
              <input
                type="text"
                name="subject"
                placeholder="Your name or project"
                className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-violet-400/40"
              />
              <textarea
                name="body"
                rows={5}
                placeholder="Tell me about your project..."
                className="w-full resize-none rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-violet-400/40"
              />
              <button
                type="submit"
                className="w-full rounded-2xl bg-violet-500 px-5 py-3.5 text-sm font-medium text-white transition hover:bg-violet-400"
              >
                Send message
              </button>
            </form>
          </div>

          {/* Right - Digital presence */}
          <div className="rounded-3xl border border-white/[0.07] bg-white/[0.03] p-8 backdrop-blur-xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-cyan-300/80">
              Digital presence
            </p>

            <div className="mt-6 space-y-3">
              {digitalPresence.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.03] px-4 py-4 transition hover:border-white/15 hover:bg-white/[0.05]"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06] text-white/70">
                      {Icon ? (
                        <Icon size={18} strokeWidth={1.8} />
                      ) : (
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M23.004 15.588a.995.995 0 1 0 .002-1.99.995.995 0 0 0-.002 1.99zm-.996-3.705h-.85c-.546 0-.84.41-.84 1.092v2.466h-1.61v-3.558h-.684c-.547 0-.84.41-.84 1.092v2.466h-1.61v-4.874h1.61v.74c.264-.574.626-.74 1.163-.74h1.972v.74c.264-.574.625-.74 1.162-.74h.527v1.316zm-6.786 1.501h-3.359c.088.546.43.858 1.006.858.43 0 .732-.175.83-.487l1.425.4c-.351.848-1.22 1.364-2.255 1.364-1.748 0-2.549-1.355-2.549-2.515 0-1.14.703-2.505 2.45-2.505 1.856 0 2.471 1.384 2.471 2.408 0 .224-.01.37-.02.477zm-1.562-.945c-.04-.42-.342-.81-.889-.81-.508 0-.81.225-.908.81h1.797zM7.508 15.44h1.416l1.767-4.874h-1.62l-.86 2.837-.878-2.837H5.72l1.787 4.874zm-6.6 0H2.51v-3.558h1.524v3.558h1.591v-4.874H2.51v-.302c0-.332.235-.536.606-.536h.918V8.412H2.85c-1.162 0-1.943.712-1.943 1.755v.4H0v1.316h.908v3.558z" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white/85">
                        {item.label}
                      </p>
                      <p className="text-xs text-white/40">{item.value}</p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}