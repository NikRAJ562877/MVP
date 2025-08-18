import { supabaseServer } from "@/lib/supabaseServer";
import { isAdminAuthorized } from "@/lib/admin";

type SubscriberRow = {
  id: string;
  email: string;
  source: string | null;
  created_at: string;
};

type FeaturedRow = {
  id: string;
  subscriber_id: string | null;
  name: string;
  role: string;
  primary_request: string;
  secondary_request: string[] | null;
  audience_channels: string[] | null;
  created_at: string;
};

type EventRow = {
  id: string;
  session_id: string;
  event:
    | "page_view"
    | "hero_click"
    | "email_submit"
    | "form_start"
    | "form_complete"
    | "example_click";
  variant: "A" | "B" | "C" | null;
  created_at: string;
};

// CRITICAL: Next 15 passes searchParams as a Promise in Server Components
export default async function AdminPage(props: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await props.searchParams;

  const usp = new URLSearchParams();
  for (const [k, v] of Object.entries(sp)) {
    if (typeof v === "string") usp.set(k, v);
    else if (Array.isArray(v)) for (const val of v) usp.append(k, val);
  }

  if (!isAdminAuthorized(usp)) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-semibold">Admin</h1>
        <p className="mt-2 text-red-600">
          Unauthorized. Append ?token=YOUR_TOKEN to the URL.
        </p>
      </main>
    );
  }

  const { data: subscribers } = await supabaseServer
    .from("subscribers")
    .select("id,email,source,created_at")
    .order("created_at", { ascending: false })
    .limit(50)
    .returns<SubscriberRow[]>();

  const { data: featured } = await supabaseServer
    .from("featured_applications")
    .select(
      "id,subscriber_id,name,role,primary_request,secondary_request,audience_channels,created_at"
    )
    .order("created_at", { ascending: false })
    .limit(50)
    .returns<FeaturedRow[]>();

  const { data: events } = await supabaseServer
    .from("events")
    .select("id,session_id,event,variant,created_at")
    .order("created_at", { ascending: false })
    .limit(100)
    .returns<EventRow[]>();

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold">Admin</h1>

      <section className="mt-8">
        <h2 className="text-xl font-medium">Subscribers (latest 50)</h2>
        <div className="overflow-x-auto mt-3 border rounded">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50">
              <tr>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Source</th>
                <th className="p-2 text-left">ID</th>
                <th className="p-2 text-left">Created</th>
              </tr>
            </thead>
            <tbody>
              {(subscribers ?? []).map((s) => (
                <tr key={s.id} className="border-t">
                  <td className="p-2">{s.email}</td>
                  <td className="p-2">{s.source ?? "-"}</td>
                  <td className="p-2">{s.id}</td>
                  <td className="p-2">
                    {new Date(s.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-medium">Featured Applications (latest 50)</h2>
        <div className="overflow-x-auto mt-3 border rounded">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50">
              <tr>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Role</th>
                <th className="p-2 text-left">Primary request</th>
                <th className="p-2 text-left">Secondary</th>
                <th className="p-2 text-left">Channels</th>
                <th className="p-2 text-left">Subscriber ID</th>
                <th className="p-2 text-left">Created</th>
              </tr>
            </thead>
            <tbody>
              {(featured ?? []).map((f) => (
                <tr key={f.id} className="border-t">
                  <td className="p-2">{f.name}</td>
                  <td className="p-2">{f.role}</td>
                  <td className="p-2">{f.primary_request}</td>
                  <td className="p-2">
                    {(f.secondary_request ?? []).join(", ")}
                  </td>
                  <td className="p-2">
                    {(f.audience_channels ?? []).join(", ")}
                  </td>
                  <td className="p-2">{f.subscriber_id ?? "-"}</td>
                  <td className="p-2">
                    {new Date(f.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-medium">Events (latest 100)</h2>
        <div className="overflow-x-auto mt-3 border rounded">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50">
              <tr>
                <th className="p-2 text-left">Event</th>
                <th className="p-2 text-left">Variant</th>
                <th className="p-2 text-left">Session</th>
                <th className="p-2 text-left">Created</th>
              </tr>
            </thead>
            <tbody>
              {(events ?? []).map((e) => (
                <tr key={e.id} className="border-t">
                  <td className="p-2">{e.event}</td>
                  <td className="p-2">{e.variant ?? "-"}</td>
                  <td className="p-2">{e.session_id}</td>
                  <td className="p-2">
                    {new Date(e.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
