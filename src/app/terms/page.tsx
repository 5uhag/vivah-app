"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { useUser, SignOutButton } from "@clerk/nextjs";

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    body: "By creating an account or using PyaarMatch, you agree to be bound by these Terms of Service. If you do not agree, please do not use our platform. We reserve the right to update these terms at any time with notice to registered users.",
  },
  {
    title: "2. Eligibility",
    body: "You must be at least 18 years of age to use PyaarMatch. By registering, you confirm that you are of legal age and that the information you provide is accurate and truthful. PyaarMatch is intended for matrimonial purposes only.",
  },
  {
    title: "3. Account Rules",
    body: "You are responsible for maintaining the confidentiality of your account credentials. You must not share your account with others, create multiple accounts, or impersonate another person. Each user may hold only one active account.",
  },
  {
    title: "4. Prohibited Content",
    body: "You must not post false information, misleading photos, or fraudulent profiles. Harassment, hate speech, explicit content, spam, solicitation for money, and any illegal activity are strictly prohibited and will result in immediate account termination.",
  },
  {
    title: "5. Messaging Rules",
    body: "Messages sent through PyaarMatch must be respectful and relevant to matrimonial intent. Unsolicited bulk messages, abusive language, and attempts to move conversations to external platforms for harmful purposes violate our community guidelines.",
  },
  {
    title: "6. Premium Services",
    body: "Premium subscriptions are billed monthly or annually as selected. Payments are non-refundable unless required by law. PyaarMatch reserves the right to modify pricing with 30 days notice. Subscriptions renew automatically unless cancelled.",
  },
  {
    title: "7. Intellectual Property",
    body: "All content on PyaarMatch — including the logo, design, algorithms, and written content — is the property of PyaarMatch Technologies Pvt. Ltd. You may not reproduce, modify, or distribute our content without prior written permission.",
  },
  {
    title: "8. Termination",
    body: "PyaarMatch may suspend or terminate your account at any time for violations of these terms, fraudulent activity, or any behavior deemed harmful to other users or the platform. You may delete your account at any time from Settings.",
  },
  {
    title: "9. Limitation of Liability",
    body: "PyaarMatch facilitates connections between users but does not guarantee marriage outcomes. We are not liable for the actions, behavior, or misrepresentations of any user. Use your judgment and exercise caution when meeting people online.",
  },
  {
    title: "10. Governing Law",
    body: "These terms are governed by the laws of India. Any disputes shall be resolved in the courts of Bangalore, Karnataka. By using PyaarMatch, you consent to the exclusive jurisdiction of these courts.",
  },
];

export default function TermsPage() {
  const { isSignedIn } = useUser();

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="fixed inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=1920&q=60"
          alt="Terms background"
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
            <span className="text-white font-semibold">Terms of Service</span>
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
            <FileText className="w-7 h-7" style={{ color: "#F8A4C8" }} />
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-2">Terms of Service</h1>
          <p className="text-white/50 text-sm">Last updated: January 1, 2024</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/20 backdrop-blur-md p-6 mb-6">
          <p className="text-white/70 text-sm leading-relaxed">
            Please read these Terms of Service carefully before using PyaarMatch. These terms constitute a legally binding agreement between you and PyaarMatch Technologies Pvt. Ltd.
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
