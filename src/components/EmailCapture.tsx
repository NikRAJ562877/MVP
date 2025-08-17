"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubscriberSchema, type SubscriberInput } from "@/lib/validators";

export default function EmailCapture({
  variant,
  sessionId,
}: {
  variant: "A" | "B" | "C";
  sessionId: string;
}) {
  // Provide the form value type via generics
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SubscriberInput>({
    resolver: zodResolver(SubscriberSchema),
  });

  const onSubmit = async (data: SubscriberInput) => {
    const payload = { ...data, variant, session_id: sessionId };
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      await fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: sessionId,
          event: "email_submit",
          variant,
        }),
      });
      window.location.href = "/thank-you";
    }
  };

  return (
    <form id="email-capture" onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto">
      <label className="block text-sm mb-2">Email</label>
      <input
        className="w-full border rounded px-3 py-2"
        placeholder="you@domain.com"
        {...register("email")}
      />
      {errors.email && (
        <p className="text-red-500 text-sm mt-1">{String(errors.email.message)}</p>
      )}
      <input type="hidden" value="hero" {...register("source")} />
      <button disabled={isSubmitting} className="mt-4 rounded bg-black text-white px-4 py-2">
        {isSubmitting ? "Submitting..." : "Join the beta"}
      </button>
    </form>
  );
}
