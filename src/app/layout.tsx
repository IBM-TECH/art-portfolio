import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Luqss Arts",
  description: "Digital art, illustration and visual storytelling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#101113] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
