import Link from "next/link";

export default function FeaturedSuccess() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-20 text-center">
      <h1 className="text-3xl font-semibold">Thanks—submission received.</h1>
      <p className="mt-3 text-neutral-600">
        We’ll review your profile and reach out as we open the beta. You’ll get notified when your card is ready.
      </p>

      <div className="mt-8 space-x-3">
        <Link href="/" className="inline-flex items-center rounded border px-4 py-2">
          Back to home
        </Link>
        <Link
          href="/featured"
          className="inline-flex items-center rounded bg-black text-white px-4 py-2"
        >
          Edit another submission
        </Link>
      </div>
    </main>
  );
}
