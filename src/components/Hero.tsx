"use client";
import { useEffect } from "react";
 
export default function Hero({
  variant,
  sessionId,
}: {
  variant: "A" | "B" | "C";
  sessionId: string;
}) {
  const copy =
    {
      A: {
        h: "Turn your profile into action.",
        s: "Surface your current asks on a card and get intros in days—not weeks.",
      },
      B: {
        h: "Profiles with  .",
        s: "Add clear requests to your card and attract the right people faster.",
      },
      C: {
        h: "Let your network work for you.",
        s: "Card profiles + audience requests = more relevant intros.",
      },
    }[variant];

  useEffect(() => {
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: sessionId, event: "page_view", variant }),
    });
  }, [sessionId, variant]);

  const onHeroClick = () => {
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: sessionId, event: "hero_click", variant }),
    });
    document.getElementById("email-capture")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="bg-gradient-to-b from-black to-neutral-900 text-white">
      <div className="max-w-5xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-semibold">{copy.h}</h1>
        <p className="mt-5 text-lg text-neutral-300">{copy.s}</p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            onClick={onHeroClick}
            className="inline-flex items-center rounded-md bg-white text-black px-5 py-3"
          >
            Join the beta
          </button>

          
        </div>
      </div>
    </section>
  );
}
