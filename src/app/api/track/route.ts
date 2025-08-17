import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { EventSchema } from "@/lib/validators";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = EventSchema.parse(body);

    const { error } = await supabaseServer.from("events").insert({
      session_id: parsed.session_id,
      event: parsed.event,
      variant: parsed.variant ?? null,
      metadata: parsed.metadata ?? {},
    });

    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    const message =
      e instanceof Error
        ? e.message
        : typeof e === "string"
        ? e
        : "Unexpected error";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
