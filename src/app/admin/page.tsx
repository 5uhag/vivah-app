"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Search,
  CheckCircle,
  XCircle,
  Shield,
  Users,
  Flag,
  BookHeart,
  Eye,
} from "lucide-react";

const PROFILES = [
  { id: "1", name: "Ananya Reddy", email: "ananya@email.com", location: "Hyderabad", joined: "Apr 10", verified: false, premium: true, photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=60" },
  { id: "2", name: "Rohan Mehta", email: "rohan@email.com", location: "Mumbai", joined: "Apr 8", verified: true, premium: false, photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=60" },
  { id: "3", name: "Meera Pillai", email: "meera@email.com", location: "Kochi", joined: "Apr 5", verified: false, premium: false, photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=60" },
  { id: "4", name: "Arjun Singh", email: "arjun@email.com", location: "Delhi", joined: "Apr 3", verified: true, premium: true, photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=60" },
  { id: "5", name: "Pooja Nair", email: "pooja@email.com", location: "Bangalore", joined: "Apr 1", verified: false, premium: false, photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=100&q=60" },
];

const REPORTS = [
  { id: "1", reporter: "Sneha Iyer", reported: "Unknown User #42", reason: "Fake profile / impersonation", status: "pending", date: "Apr 12" },
  { id: "2", reporter: "Karan Patel", reported: "Vikram Sharma", reason: "Inappropriate messages", status: "pending", date: "Apr 11" },
  { id: "3", reporter: "Divya Menon", reported: "Rahul Gupta", reason: "Harassment", status: "reviewed", date: "Apr 9" },
  { id: "4", reporter: "Riya Kapoor", reported: "Amit Kumar", reason: "Spam / advertising", status: "resolved", date: "Apr 7" },
];

const STORIES = [
  { id: "1", couple: "Priya & Arjun", location: "Mumbai", submitted: "Apr 10", status: "pending", photo: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=100&q=60" },
  { id: "2", couple: "Kavita & Rahul", location: "Delhi", submitted: "Apr 8", status: "approved", photo: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=100&q=60" },
  { id: "3", couple: "Sneha & Karan", location: "Pune", submitted: "Apr 6", status: "pending", photo: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=100&q=60" },
];

const ADMIN_STATS = [
  { label: "Total Users", value: "1,284", icon: Users, color: "#E91E8C" },
  { label: "Pending Verifications", value: "23", icon: Shield, color: "#F8A4C8" },
  { label: "Open Reports", value: "8", icon: Flag, color: "#ef4444" },
  { label: "Pending Stories", value: "5", icon: BookHeart, color: "#a855f7" },
];

type ReportStatus = "pending" | "reviewed" | "resolved";
type StoryStatus = "pending" | "approved";

const REPORT_STYLE: Record<ReportStatus, { bg: string; color: string }> = {
  pending: { bg: "#ef444420", color: "#ef4444" },
  reviewed: { bg: "#f59e0b20", color: "#f59e0b" },
  resolved: { bg: "#22c55e20", color: "#22c55e" },
};

export default function AdminPage() {
  const [profiles, setProfiles] = useState(PROFILES);
  const [reports, setReports] = useState(REPORTS);
  const [stories, setStories] = useState(STORIES);
  const [search, setSearch] = useState("");

  const toggleVerify = (id: string) => setProfiles((p) => p.map((u) => u.id === id ? { ...u, verified: !u.verified } : u));
  const resolveReport = (id: string) => setReports((r) => r.map((x) => x.id === id ? { ...x, status: "resolved" } : x));
  const approveStory = (id: string) => setStories((s) => s.map((x) => x.id === id ? { ...x, status: "approved" } : x));
  const rejectStory = (id: string) => setStories((s) => s.filter((x) => x.id !== id));

  const filteredProfiles = profiles.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="fixed inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=60"
          alt="Admin background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-pink-950/60" />
      </div>

      <nav className="sticky top-0 z-50 bg-pink-950/40 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-white/70 hover:text-white transition"><ArrowLeft className="w-5 h-5" /></Link>
            <span className="text-white font-semibold">Admin Panel</span>
          </div>
          <Badge className="text-xs font-bold" style={{ background: "#E91E8C", color: "#fff" }}>Admin</Badge>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8 w-full space-y-8">

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {ADMIN_STATS.map((s) => (
            <div key={s.label} className="rounded-2xl border border-white/10 bg-white/20 backdrop-blur-md p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: `${s.color}20` }}>
                <s.icon className="w-5 h-5" style={{ color: s.color }} />
              </div>
              <div>
                <div className="text-xl font-bold text-white">{s.value}</div>
                <div className="text-white/50 text-xs">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="rounded-2xl border border-white/10 bg-white/20 backdrop-blur-md overflow-hidden">
          <Tabs defaultValue="users">
            <div className="border-b border-white/10 px-5 pt-4">
              <TabsList className="bg-white/10 border border-white/10">
                <TabsTrigger value="users" className="text-white data-[state=active]:text-white data-[state=active]:bg-[#E91E8C] flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" /> Users
                </TabsTrigger>
                <TabsTrigger value="reports" className="text-white data-[state=active]:text-white data-[state=active]:bg-[#E91E8C] flex items-center gap-1.5">
                  <Flag className="w-3.5 h-3.5" /> Reports
                </TabsTrigger>
                <TabsTrigger value="stories" className="text-white data-[state=active]:text-white data-[state=active]:bg-[#E91E8C] flex items-center gap-1.5">
                  <BookHeart className="w-3.5 h-3.5" /> Stories
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Users Tab */}
            <TabsContent value="users" className="p-5">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name or email..."
                  className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-full"
                />
              </div>
              <div className="overflow-x-auto rounded-xl border border-white/10">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10 hover:bg-white/5">
                      <TableHead className="text-white/50">User</TableHead>
                      <TableHead className="text-white/50 hidden sm:table-cell">Location</TableHead>
                      <TableHead className="text-white/50 hidden md:table-cell">Joined</TableHead>
                      <TableHead className="text-white/50">Status</TableHead>
                      <TableHead className="text-white/50 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProfiles.map((u) => (
                      <TableRow key={u.id} className="border-white/10 hover:bg-white/5">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0">
                              <Image src={u.photo} alt={u.name} fill className="object-cover" />
                            </div>
                            <div>
                              <div className="text-white text-sm font-medium">{u.name}</div>
                              <div className="text-white/40 text-xs">{u.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-white/60 text-sm hidden sm:table-cell">{u.location}</TableCell>
                        <TableCell className="text-white/60 text-sm hidden md:table-cell">{u.joined}</TableCell>
                        <TableCell>
                          <div className="flex gap-1.5 flex-wrap">
                            {u.verified && <Badge className="text-xs" style={{ background: "#22c55e20", color: "#22c55e", border: "1px solid #22c55e" }}>Verified</Badge>}
                            {u.premium && <Badge className="text-xs" style={{ background: "#E91E8C20", color: "#E91E8C", border: "1px solid #E91E8C" }}>Premium</Badge>}
                            {!u.verified && !u.premium && <Badge className="text-xs bg-white/10 text-white/40">Basic</Badge>}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link href={`/profile/${u.id}`} className="p-1.5 rounded-lg hover:bg-white/10 transition">
                              <Eye className="w-4 h-4 text-white/40" />
                            </Link>
                            <button
                              onClick={() => toggleVerify(u.id)}
                              className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition hover:opacity-90"
                              style={u.verified ? { background: "#ef444420", color: "#ef4444" } : { background: "#22c55e20", color: "#22c55e" }}
                            >
                              {u.verified ? <><XCircle className="w-3.5 h-3.5" /> Unverify</> : <><CheckCircle className="w-3.5 h-3.5" /> Verify</>}
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports" className="p-5">
              <div className="space-y-3">
                {reports.map((r) => {
                  const st = REPORT_STYLE[r.status as ReportStatus];
                  return (
                    <div key={r.id} className="rounded-xl border border-white/10 bg-white/10 p-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-white font-medium text-sm">{r.reported}</span>
                          <Badge className="text-xs capitalize" style={{ background: st.bg, color: st.color, border: `1px solid ${st.color}` }}>{r.status}</Badge>
                        </div>
                        <p className="text-white/60 text-xs mb-0.5"><span className="text-white/40">Reason:</span> {r.reason}</p>
                        <p className="text-white/40 text-xs">Reported by {r.reporter} · {r.date}</p>
                      </div>
                      {r.status === "pending" && (
                        <button
                          onClick={() => resolveReport(r.id)}
                          className="shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition hover:opacity-90"
                          style={{ background: "#22c55e20", color: "#22c55e", border: "1px solid #22c55e" }}
                        >
                          <CheckCircle className="w-3.5 h-3.5" /> Resolve
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </TabsContent>

            {/* Stories Tab */}
            <TabsContent value="stories" className="p-5">
              <div className="space-y-4">
                {stories.map((s) => (
                  <div key={s.id} className="rounded-xl border border-white/10 bg-white/10 p-4 flex gap-4 items-center">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                      <Image src={s.photo} alt={s.couple} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-0.5">
                        <span className="text-white font-medium text-sm">{s.couple}</span>
                        {s.status === "approved"
                          ? <Badge className="text-xs" style={{ background: "#22c55e20", color: "#22c55e", border: "1px solid #22c55e" }}>Approved</Badge>
                          : <Badge className="text-xs" style={{ background: "#f59e0b20", color: "#f59e0b", border: "1px solid #f59e0b" }}>Pending Review</Badge>
                        }
                      </div>
                      <p className="text-white/50 text-xs">{s.location} · Submitted {s.submitted}</p>
                    </div>
                    {s.status === "pending" && (
                      <div className="flex gap-2 shrink-0">
                        <button onClick={() => approveStory(s.id)} className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition hover:opacity-90" style={{ background: "#22c55e20", color: "#22c55e", border: "1px solid #22c55e" }}>
                          <CheckCircle className="w-3.5 h-3.5" /> Approve
                        </button>
                        <button onClick={() => rejectStory(s.id)} className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition hover:opacity-90" style={{ background: "#ef444420", color: "#ef4444", border: "1px solid #ef4444" }}>
                          <XCircle className="w-3.5 h-3.5" /> Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
