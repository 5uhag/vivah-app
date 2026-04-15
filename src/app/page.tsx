"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Heart, Shield, MessageCircle, Search, CheckCircle, Globe, Star, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Feature = { icon: React.ElementType; title: string; desc: string; modalBody: string };

const features: Feature[] = [
  { icon: Shield, title: "100% Verified Profiles", desc: "Every profile is manually verified by our team for authenticity.", modalBody: "Every profile goes through manual verification. We check photos, identity and details before approval." },
  { icon: Search, title: "Smart Matchmaking", desc: "AI-powered matches based on your preferences, values, and lifestyle.", modalBody: "Our AI analyzes age, location, religion, profession and interests to suggest your most compatible matches daily." },
  { icon: MessageCircle, title: "Safe Messaging", desc: "Chat securely with matches. Your privacy is our priority.", modalBody: "Chat only with people who match you. Block, report and privacy controls built in." },
  { icon: Heart, title: "Icebreaker Messages", desc: "Break the ice with thoughtful prompts and interest expressions.", modalBody: "Not sure what to say first? Use our curated icebreaker prompts to start conversations naturally." },
  { icon: Globe, title: "Multi-language Support", desc: "Available in English and Hindi for a truly Indian experience.", modalBody: "Use PyaarMatch in English, Hindi or Kannada. More languages coming soon." },
  { icon: CheckCircle, title: "Premium Plans", desc: "Unlock unlimited interests, contact views, and priority listing.", modalBody: "Unlock unlimited interests, see who viewed you, priority listing and contact reveals with Premium." },
];

const stories = [
  { names: "Priya & Arjun", location: "Mumbai", quote: "We connected on PyaarMatch 💕 and knew instantly. Two years later, we are happily married!", year: "2023" },
  { names: "Kavita & Rahul", location: "Delhi", quote: "PyaarMatch 💕's smart matching brought us together. Our families couldn't be happier.", year: "2024" },
  { names: "Meera & Vikram", location: "Bangalore", quote: "From the first message to the mandap - PyaarMatch 💕 made every step beautiful.", year: "2024" },
];

export default function LandingPage() {
  const [activeFeature, setActiveFeature] = useState<Feature | null>(null);

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="fixed inset-0 -z-10">
        <Image src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1920&q=60" alt="Wedding background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-pink-950/40" />
      </div>

      <Navbar />

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-24 sm:py-32">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight max-w-4xl">
          Find Your Perfect Match with <span style={{ color: "#F8A4C8" }}>Pyaar</span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-white/80 max-w-2xl">
          India&apos;s most trusted matrimonial platform. Lakhs of verified profiles, advanced matching, and a journey that begins with a single click.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register" className="px-8 py-4 text-lg font-semibold text-white rounded-full shadow-lg transition hover:opacity-90" style={{ background: "#E91E8C" }}>
            Create Free Profile
          </Link>
          <Link href="/login" className="px-8 py-4 text-lg font-semibold text-white rounded-full shadow-lg transition hover:opacity-90 border border-white/30 hover:bg-white/10">
            Sign In
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-pink-950/40 border-y border-white/10">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-3 gap-6 text-center">
          {[{ value: "50,000+", label: "Profiles" }, { value: "10,000+", label: "Marriages" }, { value: "4.8★", label: "Rating" }].map((s) => (
            <div key={s.label}>
              <div className="text-3xl sm:text-4xl font-extrabold" style={{ color: "#F8A4C8" }}>{s.value}</div>
              <div className="mt-1 text-sm sm:text-base text-white/70">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-pink-950/40">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Why Choose <span style={{ color: "#F8A4C8" }}>PyaarMatch 💕</span>?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <button key={f.title} onClick={() => setActiveFeature(f)} className="rounded-2xl p-6 border border-white/10 bg-white/20 backdrop-blur-md hover:bg-white/30 transition text-left cursor-pointer group">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform" style={{ background: "#E91E8C22" }}>
                  <f.icon className="w-6 h-6" style={{ color: "#F8A4C8" }} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-white/60 text-sm">{f.desc}</p>
                <span className="mt-3 inline-block text-xs font-medium" style={{ color: "#F8A4C8" }}>Learn more →</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={!!activeFeature} onOpenChange={(open) => { if (!open) setActiveFeature(null); }}>
        <DialogContent className="border border-white/10 bg-pink-950/95 backdrop-blur-md text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white text-lg flex items-center gap-3">
              {activeFeature && (
                <span className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: "#E91E8C22" }}>
                  <activeFeature.icon className="w-5 h-5" style={{ color: "#F8A4C8" }} />
                </span>
              )}
              {activeFeature?.title}
            </DialogTitle>
          </DialogHeader>
          <p className="text-white/70 text-sm leading-relaxed mt-1">{activeFeature?.modalBody}</p>
          <div className="flex gap-3 mt-4">
            <Link href="/register" className="flex-1 text-center py-2.5 rounded-full text-white text-sm font-semibold transition hover:opacity-90" style={{ background: "#E91E8C" }} onClick={() => setActiveFeature(null)}>
              Get Started
            </Link>
            <button onClick={() => setActiveFeature(null)} className="px-4 py-2.5 rounded-full border border-white/20 text-white text-sm hover:bg-white/10 transition flex items-center gap-1.5">
              <X className="w-4 h-4" /> Close
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Stories */}
      <section className="py-20 px-4 bg-pink-950/40">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-3">Success <span style={{ color: "#F8A4C8" }}>Stories</span></h2>
          <p className="text-white/60 text-center mb-12">Real couples, real love stories</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {stories.map((s) => (
              <div key={s.names} className="rounded-2xl p-6 border border-white/10 bg-white/20 backdrop-blur-md">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm" style={{ background: "#E91E8C" }}>{s.names[0]}</div>
                  <div>
                    <div className="font-semibold text-white">{s.names}</div>
                    <div className="text-xs text-white/50">{s.location} · {s.year}</div>
                  </div>
                </div>
                <p className="text-white/70 text-sm italic">&ldquo;{s.quote}&rdquo;</p>
                <div className="mt-4 flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-4 h-4 fill-current" style={{ color: "#F8A4C8" }} />)}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/stories" className="px-6 py-3 rounded-full border border-white/30 text-white hover:bg-white/10 transition">View All Stories</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
