"use client";

import Image from "next/image";
import { Eye, Heart, MessageCircle, UserCheck, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";

const ACTIVITY = [
  { id: "1", type: "view", text: "Rohan Mehta viewed your profile", time: "5 min ago", icon: Eye, color: "#F8A4C8" },
  { id: "2", type: "interest", text: "You sent an interest to Ananya Reddy", time: "1 hr ago", icon: Heart, color: "#E91E8C" },
  { id: "3", type: "message", text: "New message from Meera Pillai", time: "2 hr ago", icon: MessageCircle, color: "#a855f7" },
  { id: "4", type: "match", text: "You matched with Pooja Nair 💕", time: "Yesterday", icon: UserCheck, color: "#22c55e" },
  { id: "5", type: "view", text: "Arjun Singh viewed your profile", time: "Yesterday", icon: Eye, color: "#F8A4C8" },
  { id: "6", type: "interest", text: "Karan Patel sent you an interest", time: "2 days ago", icon: Heart, color: "#E91E8C" },
  { id: "7", type: "message", text: "New message from Riya Kapoor", time: "2 days ago", icon: MessageCircle, color: "#a855f7" },
  { id: "8", type: "view", text: "Vikram Sharma viewed your profile", time: "3 days ago", icon: Eye, color: "#F8A4C8" },
];

export default function ActivityPage() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="fixed inset-0 -z-10">
        <Image src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1920&q=60" alt="bg" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-pink-950/40" />
      </div>

      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-8 w-full">
        <h1 className="text-white font-bold text-xl mb-5">Activity</h1>
        <div className="rounded-2xl border border-white/10 bg-white/20 backdrop-blur-md divide-y divide-white/10 overflow-hidden">
          {ACTIVITY.map((a) => (
            <div key={a.id} className="flex items-center gap-4 px-4 py-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: `${a.color}20` }}>
                <a.icon className="w-5 h-5" style={{ color: a.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm">{a.text}</p>
              </div>
              <div className="flex items-center gap-1 text-white/40 text-xs shrink-0">
                <Clock className="w-3 h-3" />{a.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
