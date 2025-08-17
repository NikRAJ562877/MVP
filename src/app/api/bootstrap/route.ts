import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";

export async function POST() {
const c = await cookies();

let variant = c.get("ab_variant")?.value as "A" | "B" | "C" | undefined;
if (!variant) {
variant = (["A", "B", "C"] as const)[Math.floor(Math.random() * 3)];
c.set("ab_variant", variant, {
httpOnly: false,
path: "/",
maxAge: 60 * 60 * 24 * 30,
sameSite: "lax",
});
}

let sessionId = c.get("session_id")?.value;
if (!sessionId) {
sessionId = randomUUID();
c.set("session_id", sessionId, {
httpOnly: false,
path: "/",
maxAge: 60 * 60 * 24 * 7,
sameSite: "lax",
});
}

return NextResponse.json({ ok: true, variant, session_id: sessionId });
}

