"use client";

import Image from "next/image";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Heart, Bookmark, PartyPopper } from "lucide-react";

const MATCHES = [
  { id: "1", name: "Meera Pillai", age: 29, location: "Kochi", photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=60", date: "April 10, 2026", status: "Chatting" },
  { id: "2", name: "Ananya Reddy", age: 26, location: "Hyderabad", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=60", date: "March 28, 2026", status: "Met" },
  { id: "3", name: "Pooja Nair", age: 28, location: "Bangalore", photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=60", date: "March 15, 2026", status: "Met" },
  { id: "4", name: "Riya Kapoor", age: 25, location: "Delhi", photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=60", date: "February 20, 2026", status: "No Response" },
  { id: "5", name: "Sneha Iyer", age: 27, location: "Chennai", photo: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=60", date: "January 5, 2026", status: "Closed" },
];

const FAVOURITES = [
  { id: "6", name: "Kavya Joshi", age: 24, location: "Pune", photo: "https://images.unsplash.com/photo-1529626798458-92182e662485?auto=format&fit=crop&w=400&q=60" },
  { id: "7", name: "Divya Menon", age: 27, location: "Mumbai", photo: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=400&q=60" },
  { id: "8", name: "Sana Sheikh", age: 26, location: "Lucknow", photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=60" },
  { id: "9", name: "Preethi Kumar", age: 28, location: "Coimbatore", photo: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=400&q=60" },
];

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  Chatting: { bg: "#E91E8C20", color: "#E91E8C" },
  Met: { bg: "#22c55e20", color: "#22c55e" },
  "No Response": { bg: "#f59e0b20", color: "#f59e0b" },
  Closed: { bg: "#64748b20", color: "#64748b" },
};

export default function HistoryPage() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="fixed inset-0 -z-10">
        <Image src="https://images.unsplash.com/photo-1474552226712-ac0f0961a954?auto=format&fit=crop&w=1920&q=60" alt="bg" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-pink-950/40" />
      </div>

      <nav className="sticky top-0 z-50 bg-pink-950/40 backdrop-blur-md border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 flex items-center h-14 gap-3">
          <Link href="/" className="text-white/70 hover:text-white transition"><ArrowLeft className="w-5 h-5" /></Link>
          <span className="text-white font-semibold">History</span>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8 w-full">
        {/* Stat */}
        <div className="rounded-2xl border border-white/10 bg-white/20 backdrop-blur-md p-4 mb-6 flex items-center gap-3">
          <PartyPopper className="w-6 h-6 shrink-0" style={{ color: "#F8A4C8" }} />
          <p className="text-white font-medium">3 matches led to meetings 🎉 Keep going!</p>
        </div>

        <Tabs defaultValue="matches">
          <TabsList className="bg-white/20 border border-white/10 backdrop-blur-md mb-6">
            <TabsTrigger value="matches" className="text-white data-[state=active]:text-white data-[state=active]:bg-[#E91E8C]">Match History</TabsTrigger>
            <TabsTrigger value="favourites" className="text-white data-[state=active]:text-white data-[state=active]:bg-[#E91E8C]">Favourites</TabsTrigger>
          </TabsList>

          <TabsContent value="matches">
            <div className="space-y-3">
              {MATCHES.map((m) => {
                const st = STATUS_STYLE[m.status] ?? STATUS_STYLE.Closed;
                return (
                  <div key={m.id} className="rounded-2xl border border-white/10 bg-white/20 backdrop-blur-md p-4 flex gap-4 items-center">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 shrink-0" style={{ borderColor: "#F8A4C8" }}>
                      <Image src={m.photo} alt={m.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-0.5">
                        <span className="text-white font-semibold text-sm">{m.name}, {m.age}</span>
                        <Badge className="text-xs font-medium" style={{ background: st.bg, color: st.color, border: `1px solid ${st.color}` }}>{m.status}</Badge>
                      </div>
                      <div className="flex items-center gap-1 text-white/50 text-xs mb-0.5"><MapPin className="w-3 h-3" />{m.location}</div>
                      <div className="text-white/40 text-xs flex items-center gap-1"><Heart className="w-3 h-3" />Matched {m.date}</div>
                    </div>
                    <Link href={`/profile/${m.id}`} className="shrink-0 px-4 py-1.5 rounded-full border border-white/20 text-white text-xs hover:bg-white/10 transition">
                      View
                    </Link>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="favourites">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {FAVOURITES.map((f) => (
                <div key={f.id} className="rounded-2xl border border-white/10 bg-white/20 backdrop-blur-md overflow-hidden group relative">
                  <Link href={`/profile/${f.id}`}>
                    <div className="relative aspect-[3/4]">
                      <Image src={f.photo} alt={f.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute bottom-2 left-2 right-2">
                        <div className="text-white font-semibold text-sm">{f.name}</div>
                        <div className="flex items-center gap-1 text-white/60 text-xs"><MapPin className="w-3 h-3" />{f.location}</div>
                      </div>
                    </div>
                  </Link>
                  <button className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/40 flex items-center justify-center hover:bg-black/60 transition">
                    <Bookmark className="w-3.5 h-3.5" style={{ color: "#F8A4C8", fill: "#F8A4C8" }} />
                  </button>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
