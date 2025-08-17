import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { FeaturedSchema } from "@/lib/validators";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = FeaturedSchema.parse(body);

    const c = await cookies();
    const cookieSubscriberId = c.get("subscriber_id")?.value;

    const { data, error } = await supabaseServer
      .from("featured_applications")
      .insert({
        subscriber_id: (cookieSubscriberId ?? parsed.subscriber_id) || null,
        name: parsed.name,
        role: parsed.role,
        primary_request: parsed.primary_request,
        secondary_request: parsed.secondary_request,
        audience_channels: parsed.audience_channels,
        portfolio_url: parsed.portfolio_url ?? null,
        consent_share_metrics: parsed.consent_share_metrics,
      })
      .select("id")
      .single();

    if (error) throw error;

    return NextResponse.json({ ok: true, id: data.id });
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
