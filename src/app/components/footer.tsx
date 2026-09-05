import {
  Mail,
  MessageCircle,
  Send,
  BriefcaseBusiness,
} from "lucide-react";

const socialLinks = [
  {
    label: "Discord",
    href: "#",
    icon: MessageCircle,
  },
  {
    label: "Email",
    href: "mailto:",
    icon: Mail,
  },
  {
    label: "Fiverr",
    href: "#",
    icon: BriefcaseBusiness,
  },
  {
    label: "Telegram",
    href: "#",
    icon: Send,
  },
];

export default function Footer() {
  return (
<footer className="border-t border-white/[0.06] bg-[#101113] text-white">      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          {/* Footer left */}
          <div>
            <p className="text-sm font-bold tracking-[-0.01em]">
              Luqss Arts
            </p>

            <p className="mt-2 text-xs text-white/30">
              © 2026 Luqss Arts. All rights reserved.
            </p>
          </div>

          {/* Footer right */}
          <nav
            aria-label="Social links"
            className="flex flex-wrap items-center gap-x-6 gap-y-4"
          >
            {socialLinks.map((social) => {
              const Icon = social.icon;

              return (
                <a
                  key={social.label}
                  href={social.href}
                  className="group inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
                >
                  <Icon
                    size={16}
                    strokeWidth={1.8}
                    className="transition-transform group-hover:-translate-y-0.5"
                  />

                  <span>{social.label}</span>
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </footer>
  );
}
