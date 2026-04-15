"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ChevronDown, ChevronUp, HelpCircle, Mail, MessageCircle } from "lucide-react";
import { useUser, SignOutButton } from "@clerk/nextjs";

const FAQS = [
  { q: "How do I create a profile?", a: "Click 'Create Free Profile', sign up with your email, and complete the 5-step onboarding wizard. You can add photos, personal details, career info, and partner preferences." },
  { q: "How does the AI matching work?", a: "Our AI analyzes your age, religion, location, profession, education, and preferences to rank compatible profiles. Profiles with 90%+ compatibility are marked as 'AI Suggested'." },
  { q: "How are profiles verified?", a: "Every profile is manually reviewed by our safety team. We verify photos against ID documents (Aadhaar, PAN, Passport, or Voter ID) before approving a profile." },
  { q: "Can I hide my profile temporarily?", a: "Yes. Go to Settings → Privacy → Profile Visibility and toggle 'Hide my profile'. Your profile will not appear in search results until you re-enable it." },
  { q: "How do I send an interest?", a: "Visit any profile and click the 'Send Interest' button. You can add an optional icebreaker message. The recipient will receive a notification and can accept or decline." },
  { q: "What is a Premium plan?", a: "Premium (₹999/month) gives you unlimited interests, contact reveals, priority listing in search results, and the ability to see who viewed your profile. Gold (₹1999/month) adds advanced AI filters." },
  { q: "How do I report a fake profile?", a: "Open the profile, click the three-dot menu, and select 'Report Profile'. Our safety team reviews all reports within 24 hours and acts on verified violations." },
  { q: "Can I delete my account?", a: "Yes. Go to Settings → Danger Zone → Delete Account. This permanently deletes all your data, messages, and profile within 30 days." },
  { q: "Is my contact information safe?", a: "Your phone number and email are never shown publicly. They are only revealed when both parties accept each other's interest AND you have a contact reveal credit or Premium plan." },
  { q: "What languages is PyaarMatch available in?", a: "Currently English, Hindi, and Kannada. Tamil, Telugu, Malayalam, Bengali, Gujarati, Marathi, and Punjabi are coming soon." },
];

export default function HelpPage() {
  const { isSignedIn } = useUser();
  const [open, setOpen] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="fixed inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1920&q=60"
          alt="Help background"
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
            <span className="text-white font-semibold">Help Center</span>
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

      <div className="max-w-3xl mx-auto px-4 py-12 w-full space-y-8">
        <div className="text-center">
          <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "#E91E8C20" }}>
            <HelpCircle className="w-7 h-7" style={{ color: "#F8A4C8" }} />
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-2">Help Center</h1>
          <p className="text-white/60 text-sm">Find answers to common questions about PyaarMatch</p>
        </div>

        {/* FAQ */}
        <div className="rounded-2xl border border-white/10 bg-white/20 backdrop-blur-md overflow-hidden">
          {FAQS.map((faq, i) => (
            <div key={i} className={i > 0 ? "border-t border-white/10" : ""}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/10 transition"
              >
                <span className="text-white font-medium text-sm pr-4">{faq.q}</span>
                {open === i ? (
                  <ChevronUp className="w-4 h-4 shrink-0" style={{ color: "#F8A4C8" }} />
                ) : (
                  <ChevronDown className="w-4 h-4 shrink-0 text-white/40" />
                )}
              </button>
              {open === i && (
                <div className="px-6 pb-4">
                  <p className="text-white/70 text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="rounded-2xl border border-white/10 bg-white/20 backdrop-blur-md p-6">
          <div className="flex items-center gap-3 mb-5">
            <MessageCircle className="w-5 h-5" style={{ color: "#F8A4C8" }} />
            <h2 className="text-white font-bold">Still need help? Contact us</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-white/70 text-xs mb-1.5 block">Your Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/30 text-sm focus:outline-none focus:border-pink-400"
                placeholder="Priya Sharma"
              />
            </div>
            <div>
              <label className="text-white/70 text-xs mb-1.5 block">Email Address</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/30 text-sm focus:outline-none focus:border-pink-400"
                placeholder="priya@email.com"
              />
            </div>
            <div>
              <label className="text-white/70 text-xs mb-1.5 block">Message</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={4}
                className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/30 text-sm focus:outline-none focus:border-pink-400 resize-none"
                placeholder="Describe your issue or question..."
              />
            </div>
            <button
              className="w-full py-3 rounded-full text-white font-semibold text-sm transition hover:opacity-90"
              style={{ background: "#E91E8C" }}
              onClick={() => { setForm({ name: "", email: "", message: "" }); alert("Message sent! We'll reply within 24 hours."); }}
            >
              Send Message
            </button>
          </div>
        </div>

        {/* Support Email */}
        <div className="rounded-2xl border border-white/10 bg-white/20 backdrop-blur-md p-6 flex items-center gap-4">
          <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ background: "#E91E8C20" }}>
            <Mail className="w-5 h-5" style={{ color: "#F8A4C8" }} />
          </div>
          <div>
            <div className="text-white font-semibold text-sm">Support Email</div>
            <div className="text-white/60 text-sm">support@pyaarmatch.com — we respond within 24 hours</div>
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
