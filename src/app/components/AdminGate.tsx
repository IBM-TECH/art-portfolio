"use client";

import { useEffect, useState } from "react";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "luqqss2026";

export default function AdminGate({ children }: { children: React.ReactNode }) {
  const [ok, setOk] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const unlocked = sessionStorage.getItem("admin_unlocked");
      if (unlocked === "true") setOk(true);
    }
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_unlocked", "true");
      setOk(true);
      setError("");
    } else {
      setError("Wrong password");
    }
  }

  if (ok) return <>{children}</>;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#101113] px-5 text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-3xl border border-white/[0.07] bg-white/[0.03] p-8"
      >
        <h1 className="text-xl font-semibold">Admin access</h1>
        <p className="mt-2 text-sm text-white/40">
          Enter the password to manage artworks.
        </p>

        <input
          type="password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Password"
          className="mt-6 w-full rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-violet-400/40"
        />

        {error && <p className="mt-3 text-sm text-red-300">{error}</p>}

        <button
          type="submit"
          className="mt-5 w-full rounded-2xl bg-violet-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-violet-400"
        >
          Unlock
        </button>
      </form>
    </main>
  );
}