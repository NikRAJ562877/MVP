import Link from "next/link";

export default function ThankYou() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-20 text-center">
      <h1 className="text-3xl font-semibold">You’re on the list.</h1>
      <p className="mt-3 text-neutral-600">
        Thanks for joining the beta. Next: apply to be a featured profile so we can prioritize your intro requests.
      </p>

      <div className="mt-8">
        <Link
          href="/featured"
          className="inline-flex items-center rounded bg-black text-white px-4 py-2"
        >
          Become a featured profile
        </Link>
      </div>

      <p className="mt-6 text-sm text-neutral-500">
        Takes ~60 seconds. You can update your requests later.
      </p>
    </main>
  );
}
