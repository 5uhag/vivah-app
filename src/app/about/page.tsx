"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Target, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";

const TEAM = [
  { name: "Priya Sharma", role: "CEO & Co-Founder", initials: "PS" },
  { name: "Arjun Mehta", role: "CTO & Co-Founder", initials: "AM" },
  { name: "Meera Pillai", role: "Head of Trust & Safety", initials: "MP" },
  { name: "Rohan Das", role: "Head of Product", initials: "RD" },
  { name: "Kavya Joshi", role: "Head of Marketing", initials: "KJ" },
  { name: "Sanjay Gupta", role: "Lead Engineer", initials: "SG" },
];

export default function AboutPage() {

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="fixed inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=60"
          alt="About background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-pink-950/40" />
      </div>

      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-12 w-full space-y-14">

        {/* Hero */}
        <section className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-5">
            About <span style={{ color: "#F8A4C8" }}>PyaarMatch 💕</span>
          </h1>
          <p className="text-white/70 text-lg leading-relaxed">
            India&apos;s most trusted matrimonial platform, built to make finding a life partner simple, safe, and joyful for every Indian family.
          </p>
        </section>

        {/* Mission */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            { icon: Target, title: "Our Mission", desc: "To connect every Indian with their ideal life partner through technology, trust, and care." },
            { icon: Heart, title: "Our Vision", desc: "A world where every person finds love without barriers — of language, region, or tradition." },
            { icon: Sparkles, title: "Our Promise", desc: "100% verified profiles, zero fake accounts, and a safety team that never sleeps." },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/10 bg-white/20 backdrop-blur-md p-6">
              <div className="w-11 h-11 rounded-full flex items-center justify-center mb-4" style={{ background: "#E91E8C20" }}>
                <item.icon className="w-5 h-5" style={{ color: "#F8A4C8" }} />
              </div>
              <h3 className="text-white font-semibold mb-2">{item.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </section>

        {/* Story */}
        <section className="rounded-2xl border border-white/10 bg-white/20 backdrop-blur-md p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Our Story</h2>
          <p className="text-white/70 text-sm leading-relaxed mb-4">
            PyaarMatch was founded in 2024 by Priya Sharma and Arjun Mehta — two engineers who saw firsthand how stressful and unsafe online matrimony had become for their friends and family. They believed that technology, when used with empathy, could transform the experience entirely.
          </p>
          <p className="text-white/70 text-sm leading-relaxed mb-4">
            Starting with just 500 verified profiles in Bangalore, PyaarMatch grew rapidly through word of mouth. Within the first year, over 10,000 marriages were facilitated across India. Today, with 50,000+ profiles and users in every Indian state, PyaarMatch stands as the most trusted matrimonial platform in the country.
          </p>
          <p className="text-white/70 text-sm leading-relaxed">
            We combine the warmth of traditional matchmaking with the intelligence of modern AI — respecting culture while embracing progress.
          </p>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { value: "50,000+", label: "Verified Profiles" },
            { value: "10,000+", label: "Marriages" },
            { value: "4.8★", label: "App Rating" },
            { value: "15+", label: "Languages" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-white/10 bg-white/20 backdrop-blur-md p-5 text-center">
              <div className="text-3xl font-extrabold mb-1" style={{ color: "#F8A4C8" }}>{s.value}</div>
              <div className="text-white/60 text-sm">{s.label}</div>
            </div>
          ))}
        </section>

        {/* Team */}
        <section>
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Meet the <span style={{ color: "#F8A4C8" }}>Team</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
            {TEAM.map((t) => (
              <div key={t.name} className="rounded-2xl border border-white/10 bg-white/20 backdrop-blur-md p-5 text-center">
                <div className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-white text-lg mx-auto mb-3" style={{ background: "#E91E8C" }}>
                  {t.initials}
                </div>
                <div className="text-white font-semibold text-sm">{t.name}</div>
                <div className="text-white/50 text-xs mt-0.5">{t.role}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center pb-8">
          <Link
            href="/register"
            className="inline-block px-8 py-4 rounded-full text-white font-semibold text-lg transition hover:opacity-90"
            style={{ background: "#E91E8C" }}
          >
            Join PyaarMatch Free 💕
          </Link>
        </div>

      </div>
    </div>
  );
}
