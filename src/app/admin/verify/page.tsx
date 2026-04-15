"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, CheckCircle, XCircle, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const PENDING = [
  { id: "1", name: "Ananya Reddy", age: 26, location: "Hyderabad", email: "ananya@email.com", joined: "Apr 13", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=60", idDoc: "Aadhaar" },
  { id: "2", name: "Pooja Nair", age: 28, location: "Bangalore", email: "pooja@email.com", joined: "Apr 12", photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=100&q=60", idDoc: "PAN Card" },
  { id: "3", name: "Karan Patel", age: 32, location: "Ahmedabad", email: "karan@email.com", joined: "Apr 11", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=60", idDoc: "Passport" },
  { id: "4", name: "Meera Pillai", age: 29, location: "Kochi", email: "meera@email.com", joined: "Apr 10", photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=60", idDoc: "Voter ID" },
];

export default function AdminVerifyPage() {
  const [pending, setPending] = useState(PENDING);

  const approve = (id: string) => setPending((p) => p.filter((u) => u.id !== id));
  const reject = (id: string) => setPending((p) => p.filter((u) => u.id !== id));

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="fixed inset-0 -z-10">
        <Image src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=60" alt="bg" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-pink-950/60" />
      </div>

      <nav className="sticky top-0 z-50 bg-pink-950/40 backdrop-blur-md border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="text-white/70 hover:text-white transition"><ArrowLeft className="w-5 h-5" /></Link>
            <span className="text-white font-semibold">Verify Profiles</span>
          </div>
          <Badge className="text-xs font-bold" style={{ background: "#E91E8C", color: "#fff" }}>{pending.length} Pending</Badge>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8 w-full">
        {pending.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-white/40">
            <CheckCircle className="w-12 h-12 mb-3" />
            <p>All profiles verified!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pending.map((u) => (
              <div key={u.id} className="rounded-2xl border border-white/10 bg-white/20 backdrop-blur-md p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 shrink-0" style={{ borderColor: "#F8A4C8" }}>
                  <Image src={u.photo} alt={u.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-semibold">{u.name}, {u.age}</div>
                  <div className="text-white/60 text-xs">{u.location} · {u.email}</div>
                  <div className="text-white/40 text-xs mt-0.5">ID: {u.idDoc} · Joined {u.joined}</div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Link href={`/profile/${u.id}`} className="p-2 rounded-full border border-white/20 text-white/60 hover:bg-white/10 transition">
                    <Eye className="w-4 h-4" />
                  </Link>
                  <button onClick={() => approve(u.id)} className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition hover:opacity-90" style={{ background: "#22c55e20", color: "#22c55e", border: "1px solid #22c55e" }}>
                    <CheckCircle className="w-3.5 h-3.5" /> Approve
                  </button>
                  <button onClick={() => reject(u.id)} className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition hover:opacity-90" style={{ background: "#ef444420", color: "#ef4444", border: "1px solid #ef4444" }}>
                    <XCircle className="w-3.5 h-3.5" /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
