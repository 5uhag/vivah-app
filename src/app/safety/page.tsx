"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Shield, AlertTriangle, Eye, Phone, Lock, Flag } from "lucide-react";
import { useUser, SignOutButton } from "@clerk/nextjs";

const TIPS = [
  { icon: Eye, title: "Verify Before You Trust", tip: "Always verify a person's identity before sharing personal contact information. Look for the verified badge on profiles — it means our team has confirmed their identity document." },
  { icon: Lock, title: "Protect Your Personal Info", tip: "Never share your home address, workplace location, financial details, or government ID numbers with matches. Keep conversations on the PyaarMatch platform until you are comfortable." },
  { icon: Phone, title: "Video Call First", tip: "Before agreeing to meet in person, do a video call. This confirms the person looks like their profile photos and helps you feel more comfortable. PyaarMatch's in-app video feature keeps your number private." },
  { icon: AlertTriangle, title: "Watch for Red Flags", tip: "Be cautious if someone: asks for money or gifts, refuses to video call, claims to be abroad but wants to meet urgently, pressures you to move to WhatsApp immediately, or has inconsistencies in their story." },
  { icon: Shield, title: "Meet Safely", tip: "For first meetings, choose a public place with other people around. Tell a trusted family member or friend where you are going and who you are meeting. Do not get into a private vehicle with someone you just met." },
  { icon: Flag, title: "Report Suspicious Activity", tip: "If something feels wrong, trust your instincts and report the profile immediately. Use the three-dot menu on any profile to report. Our safety team reviews all reports within 24 hours." },
];

const TRUST_BADGES = [
  { label: "Manual Verification", sub: "Every profile reviewed by our team" },
  { label: "AI Fraud Detection", sub: "Real-time monitoring for fake behavior" },
  { label: "24/7 Safety Team", sub: "Always available to investigate reports" },
  { label: "Encrypted Messaging", sub: "End-to-end encrypted chat" },
];

export default function SafetyPage() {
  const { isSignedIn } = useUser();

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="fixed inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1504270997636-07ddfbd48945?auto=format&fit=crop&w=1920&q=60"
          alt="Safety background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-pink-950/40" />
      </div>

      <nav className="sticky top-0 z-50 bg-pink-950/40 backdrop-blur-md border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-white/70 hover:text-white transition"><ArrowLeft className="w-5 h-5" /></Link>
            <span className="text-white font-semibold">Safety Tips</span>
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

      <div className="max-w-4xl mx-auto px-4 py-12 w-full space-y-10">
        <div className="text-center max-w-2xl mx-auto">
          <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "#E91E8C20" }}>
            <Shield className="w-7 h-7" style={{ color: "#F8A4C8" }} />
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-3">Your Safety is Our Priority</h1>
          <p className="text-white/60 text-sm leading-relaxed">
            PyaarMatch is committed to creating a safe environment for everyone. Here are tips to help you stay safe while finding your match.
          </p>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {TRUST_BADGES.map((b) => (
            <div key={b.label} className="rounded-2xl border border-white/10 bg-white/20 backdrop-blur-md p-4 text-center">
              <div className="w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2" style={{ background: "#22c55e20" }}>
                <Shield className="w-4 h-4" style={{ color: "#22c55e" }} />
              </div>
              <div className="text-white font-semibold text-xs mb-0.5">{b.label}</div>
              <div className="text-white/50 text-xs">{b.sub}</div>
            </div>
          ))}
        </div>

        {/* Safety Tips */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Safety Tips for Online Matrimony</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {TIPS.map((t) => (
              <div key={t.title} className="rounded-2xl border border-white/10 bg-white/20 backdrop-blur-md p-6 flex gap-4">
                <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ background: "#E91E8C20" }}>
                  <t.icon className="w-5 h-5" style={{ color: "#F8A4C8" }} />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">{t.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{t.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reporting Guide */}
        <div className="rounded-2xl border border-white/10 bg-white/20 backdrop-blur-md p-6">
          <h2 className="text-white font-bold text-lg mb-4">How to Report a Profile</h2>
          <ol className="space-y-3">
            {[
              "Open the profile you want to report",
              "Tap the three-dot (⋮) menu in the top right corner of the profile",
              "Select 'Report Profile' from the dropdown",
              "Choose the reason: Fake Profile, Harassment, Spam, Inappropriate Content, or Other",
              "Add optional details to help our team investigate",
              "Tap Submit — our safety team will review within 24 hours",
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5" style={{ background: "#E91E8C" }}>{i + 1}</span>
                <span className="text-white/70 text-sm">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Emergency */}
        <div className="rounded-2xl border border-white/10 bg-white/20 backdrop-blur-md p-6 flex items-center gap-4">
          <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ background: "#ef444420" }}>
            <AlertTriangle className="w-5 h-5" style={{ color: "#ef4444" }} />
          </div>
          <div>
            <div className="text-white font-semibold">Emergency Safety Contact</div>
            <div className="text-white/60 text-sm">If you feel unsafe or threatened, contact local police (100) immediately. For platform safety emergencies: safety@pyaarmatch.com</div>
          </div>
        </div>

        <div className="text-center pb-8">
          <Link href="/" className="inline-block px-8 py-3 rounded-full text-white font-semibold transition hover:opacity-90" style={{ background: "#E91E8C" }}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
