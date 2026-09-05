"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What kind of creative work does Luqss Arts create?",
    answer:
      "Luqss Arts focuses on original digital artwork, illustration, character and concept work, and other visual creative projects.",
  },
  {
    question: "Can I commission a custom artwork?",
    answer:
      "Yes. You can get in touch with Luqss Arts to discuss custom artwork, creative commissions, collaborations, or project-based work.",
  },
  {
    question: "Can I use artwork from the website?",
    answer:
      "Artwork displayed on Luqss Arts belongs to the artist unless otherwise stated. Please contact Luqss Arts before using, reproducing, modifying, or distributing any artwork.",
  },
  {
    question: "How can I request a project or collaboration?",
    answer:
      "Use the Contact section or one of the available contact channels in the footer to start a conversation about a project or collaboration.",
  },
  {
    question: "Can I share an artwork?",
    answer:
      "Yes. Artwork pages can be shared with others. Sharing the artwork page is encouraged, but downloading, reproducing, or redistributing the artwork itself without permission is not allowed.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
     className="border-t border-white/[0.06] bg-[#101113] text-white"
    >
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-12 lg:grid-cols-[0.55fr_1.45fr] lg:gap-20">
          {/* Heading */}
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/40">
              FAQ
            </p>

            <h2 className="mt-3 text-4xl font-bold tracking-[-0.04em] sm:text-5xl">
              Questions,
              <br />
              answered.
            </h2>

            <p className="mt-5 max-w-xs text-sm leading-6 text-white/45">
              A few things you may want to know before exploring or working
              with Luqss Arts.
            </p>
          </div>

          {/* Questions */}
          <div className="border-t border-white/[0.06]">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={faq.question}
                  className="border-b border-white/[0.06]"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenIndex(isOpen ? null : index)
                    }
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="text-sm font-medium sm:text-base">
                      {faq.question}
                    </span>

                    <ChevronDown
                      size={19}
                      strokeWidth={1.7}
                      className={`shrink-0 text-white/40 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`grid transition-all duration-300 ${
                      isOpen
                        ? "grid-rows-[1fr] pb-6"
                        : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pr-8 text-sm leading-7 text-white/50">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
