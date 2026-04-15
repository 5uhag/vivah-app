"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MapPin, SlidersHorizontal, ChevronLeft, ChevronRight, Heart, Sparkles } from "lucide-react";

const PROFILES = [
  { id: "1", name: "Ananya Reddy", age: 26, location: "Hyderabad", religion: "Hindu", profession: "Doctor", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=60", compat: 97, ai: true },
  { id: "2", name: "Pooja Nair", age: 28, location: "Kochi", religion: "Hindu", profession: "Teacher", photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=60", compat: 94, ai: true },
  { id: "3", name: "Riya Kapoor", age: 25, location: "Delhi", religion: "Hindu", profession: "Designer", photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=60", compat: 91, ai: true },
  { id: "4", name: "Sneha Iyer", age: 29, location: "Chennai", religion: "Hindu", profession: "Engineer", photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=60", compat: 88, ai: false },
  { id: "5", name: "Divya Menon", age: 27, location: "Bangalore", religion: "Hindu", profession: "Lawyer", photo: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=60", compat: 85, ai: false },
  { id: "6", name: "Kavya Joshi", age: 24, location: "Pune", religion: "Hindu", profession: "MBA", photo: "https://images.unsplash.com/photo-1529626798458-92182e662485?auto=format&fit=crop&w=400&q=60", compat: 82, ai: false },
  { id: "7", name: "Meera Pillai", age: 30, location: "Mumbai", religion: "Hindu", profession: "CA", photo: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=400&q=60", compat: 79, ai: false },
  { id: "8", name: "Sana Sheikh", age: 26, location: "Lucknow", religion: "Muslim", profession: "Professor", photo: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=400&q=60", compat: 76, ai: false },
  { id: "9", name: "Preethi Kumar", age: 27, location: "Coimbatore", religion: "Hindu", profession: "Nurse", photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=60", compat: 73, ai: false },
];

const RELIGIONS = ["All", "Hindu", "Muslim", "Christian", "Sikh", "Buddhist", "Jain"];
const PROFESSIONS = ["All", "Doctor", "Engineer", "Teacher", "Lawyer", "Designer", "Business", "Government"];

const PAGE_SIZE = 6;

function FilterPanel({
  ageRange, setAgeRange, religion, setReligion, profession, setProfession,
}: {
  ageRange: number[]; setAgeRange: (v: number[]) => void;
  religion: string; setReligion: (v: string) => void;
  profession: string; setProfession: (v: string) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <Label className="text-white/80 text-sm mb-3 block">Age Range: {ageRange[0]}–{ageRange[1]}</Label>
        <Slider min={18} max={60} step={1} value={ageRange} onValueChange={(v) => setAgeRange(Array.isArray(v) ? [...v] : [v as number])} className="w-full" />
      </div>
      <div>
        <Label className="text-white/80 text-sm mb-2 block">Religion</Label>
        <Select value={religion} onValueChange={(v) => setReligion(v ?? "All")}>
          <SelectTrigger className="bg-white/20 border-white/20 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {RELIGIONS.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-white/80 text-sm mb-2 block">Profession</Label>
        <Select value={profession} onValueChange={(v) => setProfession(v ?? "All")}>
          <SelectTrigger className="bg-white/20 border-white/20 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PROFESSIONS.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default function SearchPage() {
  const [ageRange, setAgeRange] = useState([22, 35]);
  const [religion, setReligion] = useState("All");
  const [profession, setProfession] = useState("All");
  const [page, setPage] = useState(1);

  const filtered = PROFILES.filter((p) => {
    if (p.age < ageRange[0] || p.age > ageRange[1]) return false;
    if (religion !== "All" && p.religion !== religion) return false;
    if (profession !== "All" && p.profession !== profession) return false;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="fixed inset-0 -z-10">
        <Image src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1920&q=60" alt="Search background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-pink-950/40" />
      </div>

      <nav className="sticky top-0 z-50 bg-pink-950/40 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
          <Link href="/" className="text-xl font-bold text-white">PyaarMatch 💕</Link>
          <Sheet>
            <SheetTrigger className="sm:hidden flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 text-white text-sm">
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </SheetTrigger>
            <SheetContent side="left" className="bg-pink-950/90 backdrop-blur-md border-white/10 w-72">
              <SheetHeader>
                <SheetTitle className="text-white">Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FilterPanel ageRange={ageRange} setAgeRange={setAgeRange} religion={religion} setReligion={setReligion} profession={profession} setProfession={setProfession} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8 w-full">
        {/* Sidebar */}
        <aside className="hidden sm:block w-64 shrink-0">
          <div className="rounded-2xl border border-white/10 bg-white/20 backdrop-blur-md p-5 sticky top-24">
            <h2 className="text-white font-semibold mb-5 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </h2>
            <FilterPanel ageRange={ageRange} setAgeRange={setAgeRange} religion={religion} setReligion={setReligion} profession={profession} setProfession={setProfession} />
          </div>
        </aside>

        {/* Grid */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-6">
            <p className="text-white/70 text-sm">{filtered.length} profiles found</p>
          </div>

          {paginated.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-white/40">
              <Heart className="w-12 h-12 mb-3" />
              <p>No profiles match your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {paginated.map((p) => (
                <Link key={p.id} href={`/profile/${p.id}`}>
                  <div className="rounded-2xl border border-white/10 bg-white/20 backdrop-blur-md overflow-hidden hover:bg-white/30 transition group">
                    <div className="relative h-56">
                      <Image src={p.photo} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      {p.ai && (
                        <div className="absolute top-3 left-3">
                          <Badge className="text-xs font-semibold text-black flex items-center gap-1" style={{ background: "#F8A4C8" }}>
                            <Sparkles className="w-3 h-3" /> AI Suggested
                          </Badge>
                        </div>
                      )}
                      <div className="absolute top-3 right-3">
                        <div className="px-2 py-0.5 rounded-full text-xs font-bold text-white" style={{ background: "#E91E8C" }}>
                          {p.compat}% Match
                        </div>
                      </div>
                      <div className="absolute bottom-3 left-3">
                        <div className="text-white font-semibold">{p.name}, {p.age}</div>
                        <div className="flex items-center gap-1 text-white/70 text-xs">
                          <MapPin className="w-3 h-3" /> {p.location}
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 flex items-center justify-between">
                      <span className="text-white/60 text-sm">{p.profession}</span>
                      <button
                        onClick={(e) => e.preventDefault()}
                        className="flex items-center gap-1 px-3 py-1 rounded-full text-white text-xs font-medium transition hover:opacity-90"
                        style={{ background: "#E91E8C" }}
                      >
                        <Heart className="w-3 h-3" /> Interest
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-10">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-9 h-9 rounded-full border border-white/20 text-white flex items-center justify-center disabled:opacity-30 hover:bg-white/10 transition"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className="w-9 h-9 rounded-full text-sm font-medium transition"
                  style={n === page ? { background: "#E91E8C", color: "#fff" } : { color: "#fff", border: "1px solid rgba(255,255,255,0.2)" }}
                >
                  {n}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-9 h-9 rounded-full border border-white/20 text-white flex items-center justify-center disabled:opacity-30 hover:bg-white/10 transition"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
