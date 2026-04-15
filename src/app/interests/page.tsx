"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MapPin, Heart, X, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";

const RECEIVED = [
  { id: "1", name: "Rohan Mehta", age: 30, location: "Mumbai", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=60", icebreaker: "I love hiking and would love to explore trails with you!", expiresIn: 5 },
  { id: "2", name: "Arjun Singh", age: 28, location: "Delhi", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=60", icebreaker: "Your profile resonated with me — we both love travel!", expiresIn: 2 },
  { id: "3", name: "Karan Patel", age: 32, location: "Ahmedabad", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=60", icebreaker: "I am a doctor too, would love to connect!", expiresIn: 6 },
];

const SENT = [
  { id: "4", name: "Priya Sharma", age: 27, location: "Bangalore", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=60", icebreaker: "Your smile is wonderful! Hope to connect.", status: "pending", expiresIn: 3 },
  { id: "5", name: "Sneha Iyer", age: 25, location: "Chennai", photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=60", icebreaker: "We share the same passion for music!", status: "rejected", expiresIn: 0 },
];

const ACCEPTED = [
  { id: "6", name: "Meera Pillai", age: 29, location: "Kochi", photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=60", icebreaker: "Can not wait to get to know you better!" },
  { id: "7", name: "Ananya Reddy", age: 26, location: "Hyderabad", photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=60", icebreaker: "So happy we matched!" },
];

function EmptyState({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-white/40">
      <Heart className="w-12 h-12 mb-3" />
      <p className="text-sm">{label}</p>
    </div>
  );
}

function ExpiryBadge({ days }: { days: number }) {
  const color = days <= 2 ? "#EF4444" : "#F8A4C8";
  return (
    <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border" style={{ borderColor: color, color }}>
      <Clock className="w-3 h-3" /> {days}d left
    </span>
  );
}

export default function InterestsPage() {
  const [received, setReceived] = useState(RECEIVED);

  const handleAccept = (id: string) => setReceived((p) => p.filter((r) => r.id !== id));
  const handleReject = (id: string) => setReceived((p) => p.filter((r) => r.id !== id));

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="fixed inset-0 -z-10">
        <Image src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1920&q=60" alt="Interests background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-pink-950/40" />
      </div>

      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8 w-full">
        <Tabs defaultValue="received">
          <TabsList className="bg-white/20 border border-white/10 backdrop-blur-md mb-6">
            <TabsTrigger value="received" className="text-white data-[state=active]:text-white data-[state=active]:bg-[#E91E8C]">
              Received {received.length > 0 && <span className="ml-1.5 px-1.5 py-0.5 rounded-full text-xs bg-white/20">{received.length}</span>}
            </TabsTrigger>
            <TabsTrigger value="sent" className="text-white data-[state=active]:text-white data-[state=active]:bg-[#E91E8C]">Sent</TabsTrigger>
            <TabsTrigger value="accepted" className="text-white data-[state=active]:text-white data-[state=active]:bg-[#E91E8C]">Accepted</TabsTrigger>
          </TabsList>

          <TabsContent value="received">
            {received.length === 0 ? <EmptyState label="No pending interests" /> : (
              <div className="space-y-4">
                {received.map((r) => (
                  <div key={r.id} className="rounded-2xl border border-white/10 bg-white/20 backdrop-blur-md p-4 flex flex-col sm:flex-row gap-4 items-start">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 shrink-0" style={{ borderColor: "#F8A4C8" }}>
                      <Image src={r.photo} alt={r.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-white font-semibold">{r.name}, {r.age}</span>
                        <ExpiryBadge days={r.expiresIn} />
                      </div>
                      <div className="flex items-center gap-1 text-white/60 text-xs mb-2"><MapPin className="w-3 h-3" />{r.location}</div>
                      <p className="text-white/70 text-sm italic border-l-2 pl-3" style={{ borderColor: "#F8A4C8" }}>&ldquo;{r.icebreaker}&rdquo;</p>
                    </div>
                    <div className="flex gap-2 sm:flex-col">
                      <button onClick={() => handleAccept(r.id)} className="flex items-center gap-1.5 px-4 py-2 rounded-full text-white text-sm font-medium transition hover:opacity-90" style={{ background: "#E91E8C" }}>
                        <Heart className="w-4 h-4" /> Accept
                      </button>
                      <button onClick={() => handleReject(r.id)} className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/30 text-white text-sm font-medium hover:bg-white/10 transition">
                        <X className="w-4 h-4" /> Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="sent">
            {SENT.length === 0 ? <EmptyState label="You haven't sent any interests yet" /> : (
              <div className="space-y-4">
                {SENT.map((s) => (
                  <div key={s.id} className="rounded-2xl border border-white/10 bg-white/20 backdrop-blur-md p-4 flex flex-col sm:flex-row gap-4 items-start">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 shrink-0" style={{ borderColor: "#F8A4C8" }}>
                      <Image src={s.photo} alt={s.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-white font-semibold">{s.name}, {s.age}</span>
                        {s.status === "pending" ? (
                          <Badge className="text-xs" style={{ background: "#F8A4C820", color: "#F8A4C8", border: "1px solid #F8A4C8" }}>Pending</Badge>
                        ) : (
                          <Badge className="text-xs bg-red-500/20 text-red-400 border border-red-400">Rejected</Badge>
                        )}
                        {s.status === "pending" && <ExpiryBadge days={s.expiresIn} />}
                      </div>
                      <div className="flex items-center gap-1 text-white/60 text-xs mb-2"><MapPin className="w-3 h-3" />{s.location}</div>
                      <p className="text-white/70 text-sm italic border-l-2 pl-3" style={{ borderColor: "#F8A4C8" }}>&ldquo;{s.icebreaker}&rdquo;</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="accepted">
            {ACCEPTED.length === 0 ? <EmptyState label="No accepted interests yet" /> : (
              <div className="space-y-4">
                {ACCEPTED.map((a) => (
                  <div key={a.id} className="rounded-2xl border border-white/10 bg-white/20 backdrop-blur-md p-4 flex flex-col sm:flex-row gap-4 items-start">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 shrink-0" style={{ borderColor: "#E91E8C" }}>
                      <Image src={a.photo} alt={a.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-white font-semibold">{a.name}, {a.age}</span>
                        <Badge className="text-xs" style={{ background: "#E91E8C20", color: "#E91E8C", border: "1px solid #E91E8C" }}>Matched 💕</Badge>
                      </div>
                      <div className="flex items-center gap-1 text-white/60 text-xs mb-2"><MapPin className="w-3 h-3" />{a.location}</div>
                      <p className="text-white/70 text-sm italic border-l-2 pl-3" style={{ borderColor: "#E91E8C" }}>&ldquo;{a.icebreaker}&rdquo;</p>
                    </div>
                    <Link href={`/chat/${a.id}`} className="flex items-center gap-1.5 px-4 py-2 rounded-full text-white text-sm font-medium transition hover:opacity-90" style={{ background: "#E91E8C" }}>
                      Chat Now
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
