"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Mail, MapPin, Phone, Send, Instagram, Twitter, Linkedin, Facebook } from "lucide-react";
import { useUser, SignOutButton } from "@clerk/nextjs";

export default function ContactPage() {
  const { isSignedIn } = useUser();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="fixed inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=1920&q=60"
          alt="Contact background"
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
            <span className="text-white font-semibold">Contact Us</span>
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

      <div className="max-w-4xl mx-auto px-4 py-12 w-full">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-white mb-2">Get in Touch 💕</h1>
          <p className="text-white/60 text-sm">We&apos;d love to hear from you. Our team responds within 24 hours.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-6">
          {/* Contact Form */}
          <div className="sm:col-span-3 rounded-2xl border border-white/10 bg-white/20 backdrop-blur-md p-6">
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: "#22c55e20" }}>
                  <Send className="w-7 h-7" style={{ color: "#22c55e" }} />
                </div>
                <h2 className="text-white font-bold text-lg mb-2">Message Sent!</h2>
                <p className="text-white/60 text-sm mb-6">We&apos;ve received your message and will get back to you within 24 hours.</p>
                <button onClick={() => setSent(false)} className="px-6 py-2.5 rounded-full text-white text-sm font-semibold transition hover:opacity-90" style={{ background: "#E91E8C" }}>
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-white font-bold mb-4">Send us a Message</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/70 text-xs mb-1.5 block">Full Name *</label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/30 text-sm focus:outline-none focus:border-pink-400"
                      placeholder="Priya Sharma"
                    />
                  </div>
                  <div>
                    <label className="text-white/70 text-xs mb-1.5 block">Email *</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/30 text-sm focus:outline-none focus:border-pink-400"
                      placeholder="priya@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-white/70 text-xs mb-1.5 block">Subject *</label>
                  <input
                    required
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/30 text-sm focus:outline-none focus:border-pink-400"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label className="text-white/70 text-xs mb-1.5 block">Message *</label>
                  <textarea
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/30 text-sm focus:outline-none focus:border-pink-400 resize-none"
                    placeholder="Tell us about your question or feedback..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-full text-white font-semibold text-sm transition hover:opacity-90 flex items-center justify-center gap-2"
                  style={{ background: "#E91E8C" }}
                >
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="sm:col-span-2 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/20 backdrop-blur-md p-5 space-y-4">
              <h2 className="text-white font-bold">Contact Info</h2>
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#F8A4C8" }} />
                <div>
                  <div className="text-white/50 text-xs">General</div>
                  <div className="text-white/80 text-sm">support@pyaarmatch.com</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#F8A4C8" }} />
                <div>
                  <div className="text-white/50 text-xs">Press</div>
                  <div className="text-white/80 text-sm">press@pyaarmatch.com</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#F8A4C8" }} />
                <div>
                  <div className="text-white/50 text-xs">Phone</div>
                  <div className="text-white/80 text-sm">+91 80 4567 8900</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#F8A4C8" }} />
                <div>
                  <div className="text-white/50 text-xs">Office</div>
                  <div className="text-white/80 text-sm">12th Floor, Prestige Tech Park,<br />Marathahalli, Bangalore — 560103</div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="rounded-2xl border border-white/10 bg-white/20 backdrop-blur-md p-5">
              <h2 className="text-white font-bold mb-4">Follow Us</h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Instagram, label: "Instagram", handle: "@pyaarmatch" },
                  { icon: Twitter, label: "Twitter / X", handle: "@pyaarmatch" },
                  { icon: Linkedin, label: "LinkedIn", handle: "PyaarMatch" },
                  { icon: Facebook, label: "Facebook", handle: "PyaarMatch" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-2 text-white/60 text-xs">
                    <s.icon className="w-4 h-4 shrink-0" style={{ color: "#F8A4C8" }} />
                    <span>{s.handle}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/20 backdrop-blur-md p-5">
              <div className="text-white/50 text-xs mb-1">Response Time</div>
              <div className="text-white font-semibold">Within 24 hours</div>
              <div className="text-white/50 text-xs mt-2">Mon–Sat, 9 AM – 9 PM IST</div>
            </div>
          </div>
        </div>

        <div className="text-center mt-10 pb-8">
          <Link href="/" className="inline-block px-8 py-3 rounded-full text-white font-semibold transition hover:opacity-90 border border-white/30 hover:bg-white/10">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
