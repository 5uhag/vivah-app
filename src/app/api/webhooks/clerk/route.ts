import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";
import { supabaseAdmin } from "@/lib/supabase";

type ClerkEvent = {
  type: string;
  data: {
    id: string;
    email_addresses: { email_address: string }[];
    first_name: string | null;
    last_name: string | null;
    image_url: string | null;
  };
};

export async function POST(req: Request) {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
  }

  const headerPayload = await headers();
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json({ error: "Missing svix headers" }, { status: 400 });
  }

  const payload = await req.text();

  let event: ClerkEvent;
  try {
    const wh = new Webhook(webhookSecret);
    event = wh.verify(payload, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as ClerkEvent;
  } catch {
    return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
  }

  if (event.type === "user.created") {
    const { id, email_addresses, first_name, last_name, image_url } = event.data;

    const fullName = [first_name, last_name].filter(Boolean).join(" ") || null;
    const email = email_addresses?.[0]?.email_address ?? null;

    if (!supabaseAdmin) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
    }

    const { error } = await supabaseAdmin
      .from("profiles")
      .insert({
        clerk_id: id,
        full_name: fullName,
        profile_photo: image_url,
        completion_score: 10,
        is_verified: false,
        is_premium: false,
        credits: 5,
        language: "en",
        is_hidden: false,
        online_status: false,
      });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: "Failed to create profile" }, { status: 500 });
    }

    console.log(`Profile created for user ${id} (${email})`);
  }

  if (event.type === "user.deleted") {
    const { id } = event.data;

    if (supabaseAdmin) {
      await supabaseAdmin
        .from("profiles")
        .delete()
        .eq("clerk_id", id);
    }

    console.log(`Profile deleted for user ${id}`);
  }

  return NextResponse.json({ received: true });
}
