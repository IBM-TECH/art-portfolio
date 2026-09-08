"use client";

import { useEffect, useState } from "react";

const ADMIN_EMAIL = (
  process.env.NEXT_PUBLIC_ADMIN_EMAIL || "sulaemonluqmon127@gmail.com"
).toLowerCase();

const ADMIN_PASSWORD =
  process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "luqqss2026";

const DEVICE_KEY = "luqqss_admin_device_certified";

export default function AdminGate({ children }: { children: React.ReactNode }) {
  const [ok, setOk] = useState(false);
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const certified = localStorage.getItem(DEVICE_KEY);
    if (certified === "true") {
      setOk(true);
    }
    setChecking(false);
  }, []);

async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setError("");

  try {
    const res = await fetch("/api/admin/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        password,
      }),
    });

    const data = await res.json();

    if (!res.ok || !data.ok) {
      setError(data.message || "Invalid email or password.");
      return;
    }

    localStorage.setItem(DEVICE_KEY, "true");
    setOk(true);
  } catch {
    setError("Could not verify. Try again.");
  }
}

  function revokeDevice() {
    localStorage.removeItem(DEVICE_KEY);
    setOk(false);
    setEmail("");
    setPassword("");
  }

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#101113] text-white">
        <p className="text-sm text-white/40">Checking device...</p>
      </main>
    );
  }

  if (ok) {
    return (
      <div className="relative">
        <button
          type="button"
          onClick={revokeDevice}
          className="fixed bottom-4 right-4 z-50 rounded-full border border-white/10 bg-[#18191c]/90 px-3 py-1.5 text-[11px] text-white/40 backdrop-blur hover:text-white"
        >
          Lock admin on this device
        </button>
        {children}
      </div>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#101113] px-5 text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-3xl border border-white/[0.07] bg-white/[0.03] p-8"
      >
        <h1 className="text-xl font-semibold">Admin verification</h1>
        <p className="mt-2 text-sm text-white/40">
          One-time device certification. After this, this browser stays unlocked
          until you lock it.
        </p>

        <label className="mt-6 block text-xs uppercase tracking-[0.2em] text-white/35">
          Admin email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@email.com"
          required
          className="mt-2 w-full rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-violet-400/40"
        />

        <label className="mt-4 block text-xs uppercase tracking-[0.2em] text-white/35">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="mt-2 w-full rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-violet-400/40"
        />

        {error && <p className="mt-3 text-sm text-red-300">{error}</p>}

        <button
          type="submit"
          className="mt-6 w-full rounded-2xl bg-violet-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-violet-400"
        >
          Verify this device
        </button>

        <p className="mt-4 text-center text-[11px] text-white/25">
          Free local device certification · No paid SMS/email service
        </p>
      </form>
    </main>
  );
}