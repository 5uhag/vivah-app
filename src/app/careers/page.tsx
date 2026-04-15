"use client";

import Image from "next/image";
import Link from "next/link";
import { Briefcase, Heart, Zap, Users, Globe, Coffee } from "lucide-react";
import Navbar from "@/components/Navbar";

const JOBS = [
  {
    title: "Senior Full-Stack Engineer",
    team: "Engineering",
    location: "Bangalore (Hybrid)",
    type: "Full-time",
    desc: "Build and scale features used by millions of users across India. You'll own entire features from design to deployment, working with Next.js, TypeScript, Supabase, and our AI matching engine.",
    skills: ["TypeScript", "Next.js", "PostgreSQL", "System Design"],
  },
  {
    title: "Product Designer (UX/UI)",
    team: "Design",
    location: "Bangalore / Remote",
    type: "Full-time",
    desc: "Shape the experience of India's most loved matrimonial platform. You'll conduct user research, design flows for mobile and web, and collaborate daily with engineers to ship pixel-perfect UI.",
    skills: ["Figma", "User Research", "Mobile Design", "Design Systems"],
  },
  {
    title: "Trust & Safety Analyst",
    team: "Safety",
    location: "Bangalore",
    type: "Full-time",
    desc: "Join our 24/7 safety team to review reports, investigate fake profiles, and protect our community. You'll work with AI moderation tools and have real impact on user safety every single day.",
    skills: ["Attention to Detail", "Investigation", "Communication", "Empathy"],
  },
];

const CULTURE = [
  { icon: Heart, title: "Mission-Driven", desc: "Every line of code helps real people find love. That's not a cliché here — it's something we feel every day." },
  { icon: Zap, title: "Move Fast", desc: "We ship weekly. Ideas go from Figma to production in days, not months. Bureaucracy has no home here." },
  { icon: Users, title: "Inclusive Team", desc: "Our team reflects the diversity of India — 12 states, 8 languages, one shared goal." },
  { icon: Globe, title: "Remote-Friendly", desc: "Most roles are hybrid or remote. We care about output, not where you sit." },
  { icon: Coffee, title: "Great Perks", desc: "Competitive salary, ESOPs, health insurance, learning budget, and unlimited chai." },
];

export default function CareersPage() {

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="fixed inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=60"
          alt="Careers background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-pink-950/40" />
      </div>

      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-12 w-full space-y-12">

        {/* Hero */}
        <section className="text-center max-w-2xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold text-white mb-5" style={{ background: "#E91E8C" }}>
            We&apos;re Hiring! 🎉
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4">
            Build the Future of <span style={{ color: "#F8A4C8" }}>Love in India</span>
          </h1>
          <p className="text-white/70 leading-relaxed">
            Join a passionate team on a mission to help every Indian find their perfect life partner. We are growing fast and looking for exceptional people who care deeply about their craft.
          </p>
        </section>

        {/* Culture */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Why PyaarMatch?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CULTURE.map((c) => (
              <div key={c.title} className="rounded-2xl border border-white/10 bg-white/20 backdrop-blur-md p-5 flex gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: "#E91E8C20" }}>
                  <c.icon className="w-5 h-5" style={{ color: "#F8A4C8" }} />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm mb-1">{c.title}</h3>
                  <p className="text-white/60 text-xs leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Jobs */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Open Positions</h2>
          <div className="space-y-5">
            {JOBS.map((job) => (
              <div key={job.title} className="rounded-2xl border border-white/10 bg-white/20 backdrop-blur-md p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                  <div>
                    <h3 className="text-white font-bold text-lg">{job.title}</h3>
                    <div className="flex flex-wrap gap-2 mt-1.5">
                      <span className="text-xs px-2.5 py-0.5 rounded-full text-white/70" style={{ background: "#E91E8C20", border: "1px solid #E91E8C40" }}>{job.team}</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full text-white/70 border border-white/20">{job.location}</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full text-white/70 border border-white/20">{job.type}</span>
                    </div>
                  </div>
                  <button className="px-5 py-2 rounded-full text-white text-sm font-semibold transition hover:opacity-90 shrink-0" style={{ background: "#E91E8C" }}>
                    Apply Now
                  </button>
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-3">{job.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((s) => (
                    <span key={s} className="text-xs px-2 py-1 rounded-lg text-white/60" style={{ background: "#ffffff10" }}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="rounded-2xl border border-white/10 bg-white/20 backdrop-blur-md p-8 text-center">
          <Briefcase className="w-8 h-8 mx-auto mb-3" style={{ color: "#F8A4C8" }} />
          <h2 className="text-white font-bold text-lg mb-2">Don&apos;t see your role?</h2>
          <p className="text-white/60 text-sm mb-5">We&apos;re always looking for exceptional people. Send your resume and we&apos;ll reach out when we have the right opportunity.</p>
          <a
            href="mailto:careers@pyaarmatch.com"
            className="inline-block px-8 py-3 rounded-full text-white font-semibold transition hover:opacity-90"
            style={{ background: "#E91E8C" }}
          >
            careers@pyaarmatch.com
          </a>
        </div>

        <div className="text-center pb-8">
          <Link href="/" className="inline-block px-8 py-3 rounded-full text-white font-semibold transition hover:opacity-90 border border-white/30 hover:bg-white/10">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
