import { cookies } from "next/headers";

export async function readVariantCookie(): Promise<"A" | "B" | "C" | undefined> {
const c = await cookies();
const v = c.get("ab_variant")?.value;
if (v === "A" || v === "B" || v === "C") return v;
return undefined;
}

export async function readSessionCookie(): Promise<string | undefined> {
const c = await cookies();
return c.get("session_id")?.value;
}