"use client";
import { useEffect } from "react";

export default function CookieBootstrap({
onReady,
}: {
onReady: (v: "A" | "B" | "C", s: string) => void;
}) {
useEffect(() => {
let cancelled = false;
(async () => {
const res = await fetch("/api/bootstrap", { method: "POST" });
if (!res.ok) {
console.error("Bootstrap route error:", res.status);
return;
}
const j = await res.json();
if (!cancelled) onReady(j.variant as "A" | "B" | "C", j.session_id as string);
})();
return () => {
cancelled = true;
};
}, [onReady]);

return null;
}