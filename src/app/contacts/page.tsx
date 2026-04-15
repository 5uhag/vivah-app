"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Coins, Eye, Lock, MapPin, Clock } from "lucide-react";

const CONTACTS = [
  { id: "1", name: "Ananya Reddy", age: 26, location: "Hyderabad", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=60", phone: "+91 98765 43210", email: "ananya.r@email.com", unlocked: false },
  { id: "2", name: "Meera Pillai", age: 29, location: "Kochi", photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=60", phone: "+91 87654 32109", email: "meera.p@email.com", unlocked: true },
  { id: "3", name: "Pooja Nair", age: 28, location: "Bangalore", photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=60", phone: "+91 76543 21098", email: "pooja.n@email.com", unlocked: false },
  { id: "4", name: "Riya Kapoor", age: 25, location: "Delhi", photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=60", phone: "+91 65432 10987", email: "riya.k@email.com", unlocked: false },
];

const VIEWERS = [
  { id: "a", name: "Rohan Mehta", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=60", time: "2 hours ago", location: "Mumbai" },
  { id: "b", name: "Arjun Singh", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=60", time: "Yesterday", location: "Delhi" },
  { id: "c", name: "Karan Patel", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=60", time: "2 days ago", location: "Ahmedabad" },
];

export default function ContactsPage() {
  const [credits, setCredits] = useState(5);
  const [contacts, setContacts] = useState(CONTACTS);

  const handleUnlock = (id: string) => {
    if (credits < 1) return;
    setCredits((c) => c - 1);
    setContacts((prev) => prev.map((c) => c.id === id ? { ...c, unlocked: true } : c));
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="fixed inset-0 -z-10">
        <Image src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=1920&q=60" alt="Contacts background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-pink-950/40" />
      </div>

      <nav className="sticky top-0 z-50 bg-pink-950/40 backdrop-blur-md border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-white/70 hover:text-white transition"><ArrowLeft className="w-5 h-5" /></Link>
            <span className="text-white font-semibold">Contacts</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 border border-white/20">
            <Coins className="w-4 h-4" style={{ color: "#F8A4C8" }} />
            <span className="text-white font-semibold text-sm">{credits} Credits</span>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8 w-full space-y-8">
        {/* Contact Cards */}
        <section>
          <h2 className="text-white font-semibold text-lg mb-4">Contact Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contacts.map((c) => (
              <div key={c.id} className="rounded-2xl border border-white/10 bg-white/20 backdrop-blur-md p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 border-2" style={{ borderColor: "#F8A4C8" }}>
                    <Image src={c.photo} alt={c.name} fill className="object-cover" />
                  </div>
                  <div>
                    <div className="text-white font-medium">{c.name}, {c.age}</div>
                    <div className="flex items-center gap-1 text-white/60 text-xs"><MapPin className="w-3 h-3" />{c.location}</div>
                  </div>
                </div>

                {c.unlocked ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2">
                      <span className="text-white/50 text-xs w-14">Phone</span>
                      <span className="text-white text-sm font-medium">{c.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2">
                      <span className="text-white/50 text-xs w-14">Email</span>
                      <span className="text-white text-sm font-medium">{c.email}</span>
                    </div>
                    <Badge className="text-xs mt-1" style={{ background: "#E91E8C20", color: "#F8A4C8", border: "1px solid #F8A4C8" }}>Unlocked</Badge>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="bg-white/10 rounded-xl px-3 py-2 relative overflow-hidden">
                      <div className="blur-sm select-none text-white text-sm">+91 XXXXX XXXXX</div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Lock className="w-4 h-4 text-white/60" />
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-xl px-3 py-2 relative overflow-hidden">
                      <div className="blur-sm select-none text-white text-sm">xxxxx@email.com</div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Lock className="w-4 h-4 text-white/60" />
                      </div>
                    </div>
                    <button
                      onClick={() => handleUnlock(c.id)}
                      disabled={credits < 1}
                      className="w-full mt-1 flex items-center justify-center gap-2 py-2 rounded-full text-white text-sm font-medium transition hover:opacity-90 disabled:opacity-40"
                      style={{ background: "#E91E8C" }}
                    >
                      <Coins className="w-3.5 h-3.5" />
                      Unlock for 1 Credit
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
          {credits === 0 && (
            <div className="mt-4 rounded-xl border border-white/10 bg-white/10 p-4 text-center">
              <p className="text-white/60 text-sm mb-3">You&apos;re out of credits. Buy more to unlock contacts.</p>
              <Link href="/premium" className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-white text-sm font-medium transition hover:opacity-90" style={{ background: "#E91E8C" }}>
                <Coins className="w-4 h-4" /> Buy Credits
              </Link>
            </div>
          )}
        </section>

        <Separator className="bg-white/10" />

        {/* Profile Viewers */}
        <section>
          <h2 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
            <Eye className="w-5 h-5" style={{ color: "#F8A4C8" }} />
            Who Viewed My Profile
          </h2>
          <div className="rounded-2xl border border-white/10 bg-white/20 backdrop-blur-md divide-y divide-white/10 overflow-hidden">
            {VIEWERS.map((v) => (
              <div key={v.id} className="flex items-center gap-4 px-4 py-4">
                <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border-2" style={{ borderColor: "#F8A4C8" }}>
                  <Image src={v.photo} alt={v.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-medium text-sm">{v.name}</div>
                  <div className="flex items-center gap-1 text-white/50 text-xs"><MapPin className="w-3 h-3" />{v.location}</div>
                </div>
                <div className="flex items-center gap-1 text-white/40 text-xs shrink-0">
                  <Clock className="w-3 h-3" />{v.time}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
