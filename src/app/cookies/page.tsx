"use client";

import Image from "next/image";
import Link from "next/link";
import { Cookie } from "lucide-react";
import Navbar from "@/components/Navbar";

const COOKIE_TYPES = [
  {
    name: "Essential Cookies",
    required: true,
    desc: "These cookies are necessary for the platform to function. They enable core features like authentication, session management, and security. You cannot opt out of essential cookies as the site will not work without them.",
    examples: "Session token, CSRF protection, Clerk auth cookies",
  },
  {
    name: "Analytics Cookies",
    required: false,
    desc: "We use anonymized analytics cookies to understand how users interact with PyaarMatch — which pages are most visited, how long users spend on each section, and where users drop off in the sign-up flow. This data helps us improve the experience.",
    examples: "Page views, session duration, feature usage heatmaps",
  },
  {
    name: "Preference Cookies",
    required: false,
    desc: "These cookies remember your settings and preferences so you don't have to re-enter them each visit. This includes your language preference, filter settings in search, and notification preferences.",
    examples: "Language selection, search filters, theme preference",
  },
];

export default function CookiesPage() {

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="fixed inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1920&q=60"
          alt="Cookies background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-pink-950/40" />
      </div>

      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-12 w-full space-y-5">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "#E91E8C20" }}>
            <Cookie className="w-7 h-7" style={{ color: "#F8A4C8" }} />
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-2">Cookie Policy</h1>
          <p className="text-white/50 text-sm">Last updated: January 1, 2024</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/20 backdrop-blur-md p-6">
          <p className="text-white/70 text-sm leading-relaxed">
            PyaarMatch uses cookies and similar technologies to provide, improve, and protect our services. This policy explains what cookies we use, why we use them, and how you can control them.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/20 backdrop-blur-md p-6">
          <h2 className="text-white font-bold mb-3">What Are Cookies?</h2>
          <p className="text-white/70 text-sm leading-relaxed">
            Cookies are small text files stored on your device by your browser when you visit a website. They help websites remember information about your visit — like your login status, preferences, and browsing activity — making your next visit easier and more personalized.
          </p>
        </div>

        {COOKIE_TYPES.map((c) => (
          <div key={c.name} className="rounded-2xl border border-white/10 bg-white/20 backdrop-blur-md p-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-white font-bold">{c.name}</h2>
              <span
                className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                style={c.required ? { background: "#E91E8C20", color: "#F8A4C8" } : { background: "#22c55e20", color: "#22c55e" }}
              >
                {c.required ? "Required" : "Optional"}
              </span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-3">{c.desc}</p>
            <p className="text-white/40 text-xs"><span className="text-white/60">Examples:</span> {c.examples}</p>
          </div>
        ))}

        <div className="rounded-2xl border border-white/10 bg-white/20 backdrop-blur-md p-6">
          <h2 className="text-white font-bold mb-3">How to Opt Out</h2>
          <p className="text-white/70 text-sm leading-relaxed mb-3">
            You can control and delete cookies through your browser settings. Most browsers allow you to refuse cookies, delete existing cookies, or be notified when a cookie is set. Note that disabling essential cookies will prevent PyaarMatch from functioning properly.
          </p>
          <div className="space-y-2 text-white/60 text-sm">
            <p>• <strong className="text-white/80">Chrome:</strong> Settings → Privacy and Security → Cookies</p>
            <p>• <strong className="text-white/80">Firefox:</strong> Options → Privacy & Security → Cookies</p>
            <p>• <strong className="text-white/80">Safari:</strong> Preferences → Privacy → Manage Cookies</p>
            <p>• <strong className="text-white/80">Edge:</strong> Settings → Cookies and Site Permissions</p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/20 backdrop-blur-md p-6">
          <h2 className="text-white font-bold mb-3">Contact</h2>
          <p className="text-white/70 text-sm">For questions about our cookie policy, email us at <span style={{ color: "#F8A4C8" }}>privacy@pyaarmatch.com</span></p>
        </div>

        <div className="text-center pt-4 pb-8">
          <Link href="/" className="inline-block px-8 py-3 rounded-full text-white font-semibold transition hover:opacity-90" style={{ background: "#E91E8C" }}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
