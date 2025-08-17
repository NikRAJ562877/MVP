import FeaturedForm from "@/components/FeaturedForm";
import { readVariantCookie, readSessionCookie } from "@/lib/ab";

export default async function FeaturedPage() {
  const variant = await readVariantCookie();
  const sessionId = await readSessionCookie();

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold">Become a featured beta profile</h1>
      <p className="text-neutral-600 mt-2">
        Tell us your current requests and where your audience is.
      </p>

       <FeaturedForm
        variant={(variant ?? "A") as "A" | "B" | "C"}
        sessionId={sessionId ?? ""}
      />
    </main>
  );
}
