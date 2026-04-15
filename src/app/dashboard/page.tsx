"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Heart,
  MessageCircle,
  Eye,
  Bell,
  Search,
  MapPin,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const STATS = [
  { label: "Profile Views", value: "128", change: "+12 today", icon: Eye, color: "#E91E8C" },
  { label: "Interests Received", value: "24", change: "+3 new", icon: Heart, color: "#F8A4C8" },
  { label: "Active Chats", value: "7", change: "2 unread", icon: MessageCircle, color: "#a855f7" },
  { label: "Match Score", value: "92%", change: "Top 5%", icon: TrendingUp, color: "#22c55e" },
];

const MATCHES = [
  { id: "1", name: "Ananya Reddy", age: 26, location: "Hyderabad", profession: "Doctor", compat: 97, photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=60", online: true, ai: true },
  { id: "2", name: "Meera Pillai", age: 29, location: "Kochi", profession: "Lawyer", compat: 94, photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=60", online: true, ai: true },
  { id: "3", name: "Riya Kapoor", age: 25, location: "Delhi", profession: "Designer", compat: 91, photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=60", online: false, ai: true },
  { id: "4", name: "Pooja Nair", age: 28, location: "Bangalore", profession: "Engineer", compat: 88, photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=60", online: true, ai: false },
  { id: "5", name: "Sneha Iyer", age: 27, location: "Chennai", profession: "Professor", compat: 85, photo: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=60", online: false, ai: false },
  { id: "6", name: "Divya Menon", age: 26, location: "Mumbai", profession: "CA", compat: 82, photo: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=400&q=60", online: false, ai: false },
];

const ONLINE_USERS = [
  { id: "1", name: "Ananya", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=60" },
  { id: "2", name: "Meera", photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=60" },
  { id: "4", name: "Pooja", photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=60" },
  { id: "7", name: "Kavya", photo: "https://images.unsplash.com/photo-1529626798458-92182e662485?auto=format&fit=crop&w=100&q=60" },
  { id: "8", name: "Sana", photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=60" },
];

const QUICK_LINKS = [
  { href: "/search", label: "Browse Profiles", icon: Search },
  { href: "/interests", label: "My Interests", icon: Heart },
  { href: "/chat", label: "Messages", icon: MessageCircle },
  { href: "/notifications", label: "Notifications", icon: Bell },
];

export default function DashboardPage() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="fixed inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1920&q=60"
          alt="Dashboard background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-pink-950/50" />
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-pink-950/40 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
          <Link href="/" className="text-xl font-bold text-white">PyaarMatch 💕</Link>
          <div className="flex items-center gap-2">
            {QUICK_LINKS.map((q) => (
              <Link key={q.href} href={q.href} className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white/70 text-xs hover:bg-white/10 hover:text-white transition">
                <q.icon className="w-3.5 h-3.5" />{q.label}
              </Link>
            ))}
            <Link href="/profile/edit" className="ml-2 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-white text-xs font-medium transition hover:opacity-90" style={{ background: "#E91E8C" }}>
              My Profile
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8 w-full space-y-8">

        {/* Welcome */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">Welcome back, Priya 👋</h1>
          <p className="text-white/60 text-sm">You have 3 new interests and 2 unread messages today.</p>
        </div>

        {/* Profile completion nudge */}
        <div className="rounded-2xl border border-white/10 bg-white/20 backdrop-blur-md p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <span className="text-white text-sm font-medium">Profile Completion</span>
              <span className="text-sm font-bold" style={{ color: "#F8A4C8" }}>72%</span>
            </div>
            <Progress value={72} className="h-2 bg-white/10" />
            <p className="text-white/50 text-xs mt-1.5">Add your photos and profession to get more matches</p>
          </div>
          <Link href="/profile/edit" className="shrink-0 px-4 py-2 rounded-full text-white text-sm font-medium transition hover:opacity-90" style={{ background: "#E91E8C" }}>
            Complete Profile
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-2xl border border-white/10 bg-white/20 backdrop-blur-md p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white/60 text-xs">{s.label}</span>
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `${s.color}20` }}>
                  <s.icon className="w-4 h-4" style={{ color: s.color }} />
                </div>
              </div>
              <div className="text-2xl font-bold text-white">{s.value}</div>
              <div className="text-xs mt-0.5" style={{ color: s.color }}>{s.change}</div>
            </div>
          ))}
        </div>

        {/* Online Now */}
        <div className="rounded-2xl border border-white/10 bg-white/20 backdrop-blur-md p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white font-semibold text-sm">{ONLINE_USERS.length} Online Now</span>
          </div>
          <div className="flex gap-3 flex-wrap">
            {ONLINE_USERS.map((u) => (
              <Link key={u.id} href={`/profile/${u.id}`} className="flex flex-col items-center gap-1.5">
                <div className="relative">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2" style={{ borderColor: "#E91E8C" }}>
                    <Image src={u.photo} alt={u.name} fill className="object-cover" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-pink-950" />
                </div>
                <span className="text-white/70 text-xs">{u.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* AI Matches */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" style={{ color: "#F8A4C8" }} />
              <h2 className="text-white font-semibold">AI Recommended Matches</h2>
            </div>
            <Link href="/search" className="text-xs hover:opacity-80 transition" style={{ color: "#F8A4C8" }}>View all</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {MATCHES.map((m) => (
              <Link key={m.id} href={`/profile/${m.id}`}>
                <div className="rounded-2xl border border-white/10 bg-white/20 backdrop-blur-md overflow-hidden hover:bg-white/30 transition group">
                  <div className="relative h-52">
                    <Image src={m.photo} alt={m.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    {m.ai && (
                      <div className="absolute top-2 left-2">
                        <Badge className="text-xs font-semibold text-black flex items-center gap-1" style={{ background: "#F8A4C8" }}>
                          <Sparkles className="w-3 h-3" /> AI Pick
                        </Badge>
                      </div>
                    )}
                    <div className="absolute top-2 right-2 flex items-center gap-1.5">
                      {m.online && <span className="w-2 h-2 rounded-full bg-green-400" />}
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold text-white" style={{ background: "#E91E8C" }}>{m.compat}%</span>
                    </div>
                    <div className="absolute bottom-2 left-3 right-3">
                      <div className="text-white font-semibold">{m.name}, {m.age}</div>
                      <div className="flex items-center gap-1 text-white/70 text-xs">
                        <MapPin className="w-3 h-3" />{m.location} · {m.profession}
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 flex gap-2">
                    <button
                      onClick={(e) => e.preventDefault()}
                      className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-full text-white text-xs font-medium transition hover:opacity-90"
                      style={{ background: "#E91E8C" }}
                    >
                      <Heart className="w-3.5 h-3.5" /> Interest
                    </button>
                    <Link
                      href={`/chat/${m.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-full border border-white/20 text-white text-xs font-medium hover:bg-white/10 transition"
                    >
                      <MessageCircle className="w-3.5 h-3.5" /> Chat
                    </Link>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Quick Actions (mobile) */}
        <div className="sm:hidden grid grid-cols-2 gap-3 pb-4">
          {QUICK_LINKS.map((q) => (
            <Link key={q.href} href={q.href} className="flex items-center gap-2 px-4 py-3 rounded-2xl border border-white/10 bg-white/20 backdrop-blur-md text-white text-sm font-medium hover:bg-white/30 transition">
              <q.icon className="w-4 h-4" style={{ color: "#F8A4C8" }} />{q.label}
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
