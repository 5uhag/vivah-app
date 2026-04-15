"use client";

import Image from "next/image";
import Link from "next/link";
import { Newspaper, Download, Mail, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";

const PRESS = [
  {
    outlet: "Economic Times",
    headline: "PyaarMatch crosses 10,000 marriages in first year, emerges as India's fastest-growing matrimonial platform",
    date: "March 2025",
    logo: "ET",
  },
  {
    outlet: "YourStory",
    headline: "How PyaarMatch is using AI to modernize traditional matchmaking for urban India",
    date: "February 2025",
    logo: "YS",
  },
  {
    outlet: "TechCrunch India",
    headline: "PyaarMatch raises seed round, plans to expand to 15 Indian languages by 2025",
    date: "January 2025",
    logo: "TC",
  },
  {
    outlet: "Hindu BusinessLine",
    headline: "Bangalore startup PyaarMatch bets on verified profiles and AI to win India's matrimony market",
    date: "December 2024",
    logo: "HB",
  },
  {
    outlet: "Inc42",
    headline: "PyaarMatch: The startup that's making online matrimony safer and more joyful for Indian families",
    date: "October 2024",
    logo: "I4",
  },
];

const KIT_ITEMS = [
  "PyaarMatch Logo Pack (SVG, PNG, dark/light variants)",
  "Brand Color Guide & Typography",
  "Founder Photos (high-res)",
  "Product Screenshots",
  "Company Fact Sheet",
  "Founder Bios",
];

export default function PressPage() {

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="fixed inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1920&q=60"
          alt="Press background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-pink-950/40" />
      </div>

      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-12 w-full space-y-10">

        {/* Hero */}
        <section className="text-center max-w-2xl mx-auto">
          <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "#E91E8C20" }}>
            <Newspaper className="w-7 h-7" style={{ color: "#F8A4C8" }} />
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-3">PyaarMatch in the Press</h1>
          <p className="text-white/60 text-sm leading-relaxed">
            Read what the media is saying about India&apos;s fastest-growing matrimonial platform.
          </p>
        </section>

        {/* Press Mentions */}
        <section className="space-y-4">
          {PRESS.map((p) => (
            <div key={p.headline} className="rounded-2xl border border-white/10 bg-white/20 backdrop-blur-md p-5 flex gap-4 items-start">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white text-sm shrink-0" style={{ background: "#E91E8C" }}>
                {p.logo}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white/50 text-xs mb-1">{p.outlet} · {p.date}</div>
                <p className="text-white font-medium text-sm leading-relaxed">{p.headline}</p>
              </div>
              <ExternalLink className="w-4 h-4 shrink-0 mt-1" style={{ color: "#F8A4C8" }} />
            </div>
          ))}
        </section>

        {/* Media Kit */}
        <section className="rounded-2xl border border-white/10 bg-white/20 backdrop-blur-md p-6">
          <h2 className="text-white font-bold text-lg mb-2">Media Kit</h2>
          <p className="text-white/60 text-sm mb-5">Download our media kit for logos, brand assets, and product screenshots for editorial use.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
            {KIT_ITEMS.map((item) => (
              <div key={item} className="rounded-xl bg-white/10 border border-white/10 px-3 py-2.5 text-white/70 text-xs">{item}</div>
            ))}
          </div>
          <button
            className="flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold text-sm transition hover:opacity-90"
            style={{ background: "#E91E8C" }}
            onClick={() => alert("Media kit download coming soon!")}
          >
            <Download className="w-4 h-4" /> Download Media Kit
          </button>
        </section>

        {/* Press Contact */}
        <section className="rounded-2xl border border-white/10 bg-white/20 backdrop-blur-md p-6 flex items-center gap-4">
          <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ background: "#E91E8C20" }}>
            <Mail className="w-5 h-5" style={{ color: "#F8A4C8" }} />
          </div>
          <div>
            <div className="text-white font-semibold">Press Contact</div>
            <div className="text-white/60 text-sm">For interviews, quotes, and media inquiries:</div>
            <div className="text-sm mt-0.5" style={{ color: "#F8A4C8" }}>press@pyaarmatch.com</div>
          </div>
        </section>

        <div className="text-center pb-8">
          <Link href="/" className="inline-block px-8 py-3 rounded-full text-white font-semibold transition hover:opacity-90 border border-white/30 hover:bg-white/10">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
