"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";
import { useUser, SignOutButton } from "@clerk/nextjs";

const SECTIONS = [
  {
    title: "1. Data We Collect",
    body: "We collect information you provide directly: name, date of birth, gender, religion, caste, profession, education, location, phone number, and profile photos. We also collect usage data such as pages visited, search queries, and match interactions to improve our service.",
  },
  {
    title: "2. How We Use Your Data",
    body: "Your data is used to create and display your profile to compatible matches, power our AI matchmaking algorithm, send you match suggestions and notifications, verify your identity, and improve platform safety. We never use your data for third-party advertising.",
  },
  {
    title: "3. Data Sharing",
    body: "We do not sell your personal information. We share data only with: (a) other users as part of your profile display, (b) trusted service providers under strict confidentiality agreements (e.g., cloud storage, email delivery), and (c) law enforcement when legally required.",
  },
  {
    title: "4. Cookies",
    body: "We use essential cookies for authentication and session management, and anonymized analytics cookies to understand how users interact with our platform. We do not use third-party advertising cookies. You can manage cookie preferences in your browser settings.",
  },
  {
    title: "5. Data Retention",
    body: "Your data is retained for as long as your account is active. Upon account deletion, personal data is permanently removed within 30 days. Anonymized aggregate data may be retained indefinitely for analytics purposes.",
  },
  {
    title: "6. Your Rights",
    body: "You have the right to access, correct, or delete your personal data at any time. You can export your data or request deletion from Settings → Danger Zone. For any data requests, contact us at privacy@pyaarmatch.com.",
  },
  {
    title: "7. Security",
    body: "All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We conduct regular security audits and penetration testing. Our infrastructure is hosted on SOC 2 compliant cloud providers.",
  },
  {
    title: "8. Contact",
    body: "For privacy-related queries, contact our Data Protection Officer at privacy@pyaarmatch.com or write to: PyaarMatch Privacy Team, Bangalore, Karnataka, India — 560001.",
  },
];

export default function PrivacyPage() {
  const { isSignedIn } = useUser();

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="fixed inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1920&q=60"
          alt="Privacy background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-pink-950/40" />
      </div>

      <nav className="sticky top-0 z-50 bg-pink-950/40 backdrop-blur-md border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-white/70 hover:text-white transition"><ArrowLeft className="w-5 h-5" /></Link>
            <span className="text-white font-semibold">Privacy Policy</span>
          </div>
          <div className="flex gap-3 items-center">
            {isSignedIn ? (
              <>
                <Link href="/search" className="px-4 py-1.5 text-sm text-white border border-white/30 rounded-full hover:bg-white/10 transition">Search 💕</Link>
                <Link href="/profile/edit" className="px-4 py-1.5 text-sm text-white border border-white/30 rounded-full hover:bg-white/10 transition">My Profile</Link>
                <SignOutButton><button className="px-4 py-1.5 text-sm text-white rounded-full hover:opacity-90 transition" style={{ background: "#E91E8C" }}>Sign Out</button></SignOutButton>
              </>
            ) : (
              <>
                <Link href="/register" className="px-4 py-1.5 text-sm text-white border border-white/30 rounded-full hover:bg-white/10 transition">Create Free Profile</Link>
                <Link href="/login" className="px-4 py-1.5 text-sm text-white rounded-full hover:opacity-90 transition" style={{ background: "#E91E8C" }}>Sign In</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-12 w-full space-y-5">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "#E91E8C20" }}>
            <Shield className="w-7 h-7" style={{ color: "#F8A4C8" }} />
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-2">Privacy Policy</h1>
          <p className="text-white/50 text-sm">Last updated: January 1, 2024</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/20 backdrop-blur-md p-6 mb-6">
          <p className="text-white/70 text-sm leading-relaxed">
            PyaarMatch is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information when you use our matrimonial platform. By using PyaarMatch, you agree to this policy.
          </p>
        </div>

        {SECTIONS.map((s) => (
          <div key={s.title} className="rounded-2xl border border-white/10 bg-white/20 backdrop-blur-md p-6">
            <h2 className="text-white font-bold mb-3">{s.title}</h2>
            <p className="text-white/70 text-sm leading-relaxed">{s.body}</p>
          </div>
        ))}

        <div className="text-center pt-4 pb-8">
          <Link href="/" className="inline-block px-8 py-3 rounded-full text-white font-semibold transition hover:opacity-90" style={{ background: "#E91E8C" }}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
