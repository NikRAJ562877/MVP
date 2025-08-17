"use client";
const examples = [
  {
    title: "Indie iOS Developer",
    requests: [
      "Looking for 10 beta testers",
      "Open to contract collab",
      "Intro to fintech PMs",
    ],
  },
  {
    title: "Brand Designer",
    requests: [
      "Seeking 2 portfolio clients",
      "Feedback on brand system",
      "Intro to SaaS founders",
    ],
  },
  {
    title: "Community Manager",
    requests: [
      "Podcast guest slots",
      "Intros to newsletter creators",
      "Pilot partnership leads",
    ],
  },
];

export default function ExampleCards({
  variant,
  sessionId,
}: {
  variant: "A" | "B" | "C";
  sessionId: string;
}) {
  const click = () => {
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: sessionId, event: "example_click", variant }),
    });
  };
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {examples.map((ex, i) => (
        <button
          key={i}
          onClick={click}
          className="rounded-lg border p-4 text-left hover:shadow"
        >
          <div className="font-medium">{ex.title}</div>
          <ul className="mt-2 text-sm text-neutral-700">
            {ex.requests.map((r, j) => (
              <li key={j}>• {r}</li>
            ))}
          </ul>
        </button>
      ))}
    </div>
  );
}
