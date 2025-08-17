import { z } from "zod";

export const SubscriberSchema = z.object({
  email: z.string().email(),
  source: z.string().optional(),
  variant: z.enum(["A", "B", "C"]).optional(),
  session_id: z.string().optional(),
});

export const FeaturedSchema = z.object({
  subscriber_id: z.string().uuid().optional(),
  name: z.string().min(2),
  role: z.string().min(2),
  primary_request: z.string().min(5),
  secondary_request: z
    .array(z.enum(["hiring", "intros", "feedback", "collab", "sales"]))
    .min(1)
    .max(3),
  audience_channels: z
    .array(z.enum(["x", "linkedin", "discord", "newsletter"]))
    .min(1),
  portfolio_url: z.string().url().optional(),
  consent_share_metrics: z.boolean(),
  variant: z.enum(["A", "B", "C"]).optional(),
  session_id: z.string().optional(),
});

export const EventSchema = z.object({
  session_id: z.string(),
  event: z.enum([
    "page_view",
    "hero_click",
    "email_submit",
    "form_start",
    "form_complete",
    "example_click",
  ]),
  variant: z.enum(["A", "B", "C"]).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export type SubscriberInput = z.infer<typeof SubscriberSchema>;
export type FeaturedInput = z.infer<typeof FeaturedSchema>;
export type EventInput = z.infer<typeof EventSchema>;
