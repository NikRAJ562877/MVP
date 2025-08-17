import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { SubscriberSchema } from "@/lib/validators";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = SubscriberSchema.parse(body);

    const { data, error } = await supabaseServer
      .from("subscribers")
      .insert({ email: parsed.email, source: parsed.source ?? null })
      .select("id")
      .single();

    if (error) throw error;

    // Link future featured submissions to this subscriber
    const c = await cookies();
    c.set("subscriber_id", data.id, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "lax",
    });

    return NextResponse.json({ ok: true, id: data.id });
} catch (e: unknown) {
    const message =
      e instanceof Error ? e.message : typeof e === "string" ? e : "Unexpected error";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}