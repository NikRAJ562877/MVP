"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FeaturedSchema, type FeaturedInput } from "@/lib/validators";
import { useEffect, useState } from "react";

const secondary = ["hiring", "intros", "feedback", "collab", "sales"] as const;
const channels = ["x", "linkedin", "discord", "newsletter"] as const;

export default function FeaturedForm({
  variant,
  sessionId,
}: {
  variant: "A" | "B" | "C";
  sessionId: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FeaturedInput>({
    resolver: zodResolver(FeaturedSchema),
  });

  const [started, setStarted] = useState(false);

  useEffect(() => {
    const onStart = () => {
      if (!started) {
        setStarted(true);
        fetch("/api/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ session_id: sessionId, event: "form_start", variant }),
        });
      }
    };
    const form = document.getElementById("featured-form");
    form?.addEventListener("focusin", onStart);
    return () => form?.removeEventListener("focusin", onStart);
  }, [started, sessionId, variant]);

  const onSubmit = async (data: FeaturedInput) => {
    const res = await fetch("/api/featured", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, variant, session_id: sessionId }),
    });
  
    if (res.ok) {
      await fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, event: "form_complete", variant }),
      });
      // Redirect to success page instead of alert
      window.location.href = "/featured/success";
    } else {
      const j = await res.json().catch(() => ({}));
      alert(`Submission failed: ${j?.error ?? res.statusText}`);
    }
  };

  return (
    <form id="featured-form" onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
      <div>
        <label className="block text-sm mb-1">Name</label>
        <input className="w-full border rounded px-3 py-2" {...register("name")} />
        {errors.name && <p className="text-red-500 text-sm">{String(errors.name.message)}</p>}
      </div>
      <div>
        <label className="block text-sm mb-1">Role</label>
        <input className="w-full border rounded px-3 py-2" {...register("role")} />
        {errors.role && <p className="text-red-500 text-sm">{String(errors.role.message)}</p>}
      </div>
      <div>
        <label className="block text-sm mb-1">Primary request</label>
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Looking for 10 beta testers"
          {...register("primary_request")}
        />
        {errors.primary_request && (
          <p className="text-red-500 text-sm">{String(errors.primary_request.message)}</p>
        )}
      </div>
      <div>
        <label className="block text-sm mb-1">Secondary requests (choose up to 3)</label>
        <div className="grid grid-cols-2 gap-2">
          {secondary.map((s) => (
            <label key={s} className="flex items-center gap-2 border rounded px-3 py-2">
              <input type="checkbox" value={s} {...register("secondary_request")} />
              <span>{s}</span>
            </label>
          ))}
        </div>
        {errors.secondary_request && (
          <p className="text-red-500 text-sm">{String(errors.secondary_request.message)}</p>
        )}
      </div>
      <div>
        <label className="block text-sm mb-1">Audience channels</label>
        <div className="grid grid-cols-2 gap-2">
          {channels.map((c) => (
            <label key={c} className="flex items-center gap-2 border rounded px-3 py-2">
              <input type="checkbox" value={c} {...register("audience_channels")} />
              <span>{c}</span>
            </label>
          ))}
        </div>
        {errors.audience_channels && (
          <p className="text-red-500 text-sm">{String(errors.audience_channels.message)}</p>
        )}
      </div>
      <div>
        <label className="block text-sm mb-1">Portfolio/LinkedIn URL (optional)</label>
        <input className="w-full border rounded px-3 py-2" {...register("portfolio_url")} />
        {errors.portfolio_url && (
          <p className="text-red-500 text-sm">{String(errors.portfolio_url.message)}</p>
        )}
      </div>
      <div className="flex items-center gap-2">
        <input type="checkbox" {...register("consent_share_metrics")} />
        <span>Willing to share metrics and feedback</span>
      </div>
      <button disabled={isSubmitting} className="rounded bg-black text-white px-4 py-2">
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
