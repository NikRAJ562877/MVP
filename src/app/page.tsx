import { readVariantCookie, readSessionCookie } from "@/lib/ab";
import ClientRoot from "@/components/ClientRoot";

export default async function Page() {
  const variant = await readVariantCookie();
  const sessionId = await readSessionCookie();
  return (
    <main className="min-h-screen">
      <ClientRoot initialVariant={variant} initialSessionId={sessionId} />
    </main>
  );
}
