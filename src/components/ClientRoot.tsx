"use client";
import { useCallback, useMemo, useState } from "react";
import CookieBootstrap from "@/components/CookieBootstrap";
import Hero from "@/components/Hero";
import ExampleCards from "@/components/ExampleCards";
import EmailCapture from "@/components/EmailCapture";

export default function ClientRoot({
  initialVariant,
  initialSessionId,
}: {
  initialVariant?: "A" | "B" | "C";
  initialSessionId?: string;
}) {
  const [variant, setVariant] = useState<"A" | "B" | "C" | undefined>(initialVariant);
  const [sessionId, setSessionId] = useState<string | undefined>(initialSessionId);

  const ready = useMemo(() => Boolean(variant && sessionId), [variant, sessionId]);

  const onReady = useCallback((v: "A" | "B" | "C", s: string) => {
    // Only fill if missing to avoid flicker
    setVariant((prev) => prev ?? v);
    setSessionId((prev) => prev ?? s);
  }, []);

  return (
    <>
      {(!variant || !sessionId) && <CookieBootstrap onReady={onReady} />}

      {ready ? (
        <>
          <Hero variant={variant!} sessionId={sessionId!} />
          <section className="max-w-5xl mx-auto px-4 py-8">
            <ExampleCards variant={variant!} sessionId={sessionId!} />
            <div className="mt-10">
              <EmailCapture variant={variant!} sessionId={sessionId!} />
            </div>
          </section>
        </>
      ) : (
        <section className="max-w-5xl mx-auto px-4 py-20">
          <div className="h-8 w-2/3 bg-neutral-200 rounded mb-3" />
          <div className="h-4 w-1/2 bg-neutral-200 rounded mb-6" />
          <div className="grid md:grid-cols-3 gap-4">
            <div className="h-32 bg-neutral-200 rounded" />
            <div className="h-32 bg-neutral-200 rounded" />
            <div className="h-32 bg-neutral-200 rounded" />
          </div>
        </section>
      )}
    </>
  );
}
