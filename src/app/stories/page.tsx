"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Camera, Send } from "lucide-react";
import Navbar from "@/components/Navbar";

const STORIES = [
  {
    id: "1",
    couple: "Priya & Arjun",
    location: "Mumbai",
    married: "March 2024",
    photo: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=600&q=60",
    story: "We matched on PyaarMatch 💕 and our first conversation lasted 6 hours. Within a year we were married in the most beautiful ceremony. Forever grateful!",
  },
  {
    id: "2",
    couple: "Kavita & Rahul",
    location: "Delhi",
    married: "January 2024",
    photo: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=60",
    story: "I was skeptical about online matchmaking but Rahul's icebreaker message made me smile instantly. Our families met within 3 months, and we got married 6 months later.",
  },
  {
    id: "3",
    couple: "Meera & Vikram",
    location: "Bangalore",
    married: "November 2023",
    photo: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&w=600&q=60",
    story: "From the first message to the mandap — PyaarMatch made every step beautiful. We share the same values and the same love for Carnatic music. Truly a match made by AI and blessed by God.",
  },
  {
    id: "4",
    couple: "Sneha & Karan",
    location: "Pune",
    married: "August 2023",
    photo: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=60",
    story: "We were both doctors and matched because of our shared passion for helping others. Two months of chatting, one proposal under the stars, and forever after. Thank you PyaarMatch!",
  },
];

function StoryDialog({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setOpen(false); setSubmitted(false); }, 1800);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="border border-white/10 bg-pink-950/95 backdrop-blur-md text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white text-lg">Share Your Love Story 💕</DialogTitle>
        </DialogHeader>
        {submitted ? (
          <div className="py-8 text-center">
            <div className="text-4xl mb-3">💕</div>
            <p className="text-white font-semibold">Story submitted!</p>
            <p className="text-white/60 text-sm mt-1">We&apos;ll review and publish it shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-white/70 text-sm mb-1.5 block">Your Name</Label>
                <Input required placeholder="e.g. Priya" className="bg-white/20 border-white/20 text-white placeholder:text-white/40" />
              </div>
              <div>
                <Label className="text-white/70 text-sm mb-1.5 block">Partner&apos;s Name</Label>
                <Input required placeholder="e.g. Arjun" className="bg-white/20 border-white/20 text-white placeholder:text-white/40" />
              </div>
            </div>
            <div>
              <Label className="text-white/70 text-sm mb-1.5 block">Your Story</Label>
              <Textarea
                required
                placeholder="Tell us how you met and fell in love..."
                rows={4}
                className="bg-white/20 border-white/20 text-white placeholder:text-white/40 resize-none"
              />
            </div>
            <div>
              <Label className="text-white/70 text-sm mb-1.5 block">Wedding Photo</Label>
              <label className="flex flex-col items-center justify-center w-full h-24 rounded-xl border border-dashed border-white/20 bg-white/10 cursor-pointer hover:bg-white/20 transition">
                <Camera className="w-6 h-6 text-white/40 mb-1" />
                <span className="text-white/40 text-xs">Click to upload</span>
                <input type="file" accept="image/*" className="sr-only" />
              </label>
            </div>
            <button type="submit" className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-white font-medium transition hover:opacity-90" style={{ background: "#E91E8C" }}>
              <Send className="w-4 h-4" /> Submit Story
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default function StoriesPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="fixed inset-0 -z-10">
        <Image src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1920&q=60" alt="bg" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-pink-950/40" />
      </div>

      <Navbar />
      <StoryDialog open={open} setOpen={setOpen} />

      {/* Hero */}
      <section className="py-16 px-4 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-3">
          Love Stories That <span style={{ color: "#F8A4C8" }}>Began Here</span> 💕
        </h1>
        <p className="text-white/60 max-w-xl mx-auto">Real couples. Real love. Every match is a new beginning.</p>
        <button
          onClick={() => setOpen(true)}
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium transition hover:opacity-90"
          style={{ background: "#E91E8C" }}
        >
          <Heart className="w-4 h-4" /> Share Your Story
        </button>
      </section>

      {/* Stories Grid */}
      <div className="max-w-5xl mx-auto px-4 pb-16 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {STORIES.map((s) => (
            <div key={s.id} className="rounded-2xl border border-white/10 bg-white/20 backdrop-blur-md overflow-hidden">
              <div className="relative h-52">
                <Image src={s.photo} alt={s.couple} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <div className="text-white font-bold text-lg">{s.couple}</div>
                  <div className="text-white/60 text-xs">{s.location} · Married {s.married}</div>
                </div>
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#E91E8C" }}>
                  <Heart className="w-4 h-4 text-white fill-white" />
                </div>
              </div>
              <div className="p-5">
                <p className="text-white/70 text-sm leading-relaxed italic">&ldquo;{s.story}&rdquo;</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-white/50 text-sm mb-4">Have a love story to share?</p>
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium transition hover:opacity-90"
            style={{ background: "#E91E8C" }}
          >
            <Heart className="w-4 h-4" /> Submit Your Story
          </button>
        </div>
      </div>
    </div>
  );
}
