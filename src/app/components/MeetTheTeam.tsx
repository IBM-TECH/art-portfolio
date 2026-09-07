"use client";

import { useState } from "react";

const MOCK_MEMBERS = [
  "ademuyiwa Korex",
];

export default function MeetTheTeam() {
  const [showMembers, setShowMembers] = useState(false);

  return (
    <section className="border-t border-white/[0.06] bg-[#101113] px-6 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/30">
            The people
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
            Meet the team
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/40">
            The creative minds behind every piece of artwork.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {/* Luqqss Temmy */}
          <div className="rounded-3xl border border-white/[0.07] bg-white/[0.03] p-8 transition hover:border-white/[0.12]">
            <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left">
              <div className="relative shrink-0">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#101113] text-xl font-bold text-white">
                  LT
                </div>
                <div
                  className="pointer-events-none absolute inset-0 rounded-full"
                  style={{
                    padding: "2px",
                    background: "linear-gradient(135deg, #ef4444, #3b82f6)",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                />
              </div>

              <div className="mt-5 sm:ml-6 sm:mt-0">
                <h3 className="text-lg font-semibold text-white">
                  Luqqss Temmy
                </h3>
                <p className="mt-1 text-sm text-violet-300">
                  Lead Artist & Creative Director
                </p>
                <p className="mt-4 text-sm leading-7 text-white/45">
                  Specialist in 2D & 3D character design with a passion for
                  bold, expressive visuals. Every piece is crafted with
                  precision and soul — bringing your ideas to life.
                </p>
              </div>
            </div>
          </div>

          {/* Team Member */}
          <button
            type="button"
            onClick={() => setShowMembers((v) => !v)}
            className="rounded-3xl border border-white/[0.07] bg-white/[0.03] p-8 text-left transition hover:border-white/[0.12]"
          >
            <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left">
              <div className="relative shrink-0">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#101113] text-xl font-bold text-white">
                  TM
                </div>
                <div
                  className="pointer-events-none absolute inset-0 rounded-full"
                  style={{
                    padding: "2px",
                    background:
                      "linear-gradient(135deg, #3b82f6, #22c55e, #a855f7)",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                />
              </div>

              <div className="mt-5 sm:ml-6 sm:mt-0">
                <h3 className="text-lg font-semibold text-white">
                  Team Member
                </h3>
                <p className="mt-1 text-sm text-cyan-300">
                  Art Production & Commissions
                </p>
                <p className="mt-4 text-sm leading-7 text-white/45">
                  Dedicated to delivering high-quality commission work with
                  fast turnaround. Close collaboration with every client to
                  ensure the final result exceeds expectations.
                </p>
                <p className="mt-4 text-xs text-white/30">
                  Click to view team members →
                </p>
              </div>
            </div>
          </button>
        </div>

        {showMembers && (
          <div className="mt-8 rounded-3xl border border-white/[0.07] bg-white/[0.03] p-6">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-white/30">
              Team members
            </p>
            <div className="flex flex-wrap gap-3">
              {MOCK_MEMBERS.map((name) => (
                <span
                  key={name}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/70"
                >
                  {name}
                </span>
              ))}
            </div>
            <p className="mt-4 text-xs text-white/25">
              Mock names — replace later with real team names.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}