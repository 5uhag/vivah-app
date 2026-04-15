"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, CheckCircle, Flag, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Status = "pending" | "reviewed" | "resolved";

const INITIAL_REPORTS = [
  { id: "1", reporter: "Sneha Iyer", reported: "Unknown User #42", reason: "Fake profile / impersonation", status: "pending" as Status, date: "Apr 12" },
  { id: "2", reporter: "Karan Patel", reported: "Vikram Sharma", reason: "Inappropriate messages", status: "pending" as Status, date: "Apr 11" },
  { id: "3", reporter: "Divya Menon", reported: "Rahul Gupta", reason: "Harassment", status: "reviewed" as Status, date: "Apr 9" },
  { id: "4", reporter: "Riya Kapoor", reported: "Amit Kumar", reason: "Spam / advertising", status: "resolved" as Status, date: "Apr 7" },
  { id: "5", reporter: "Priya Sharma", reported: "Rohan Das", reason: "Asking for money", status: "pending" as Status, date: "Apr 6" },
  { id: "6", reporter: "Ananya Reddy", reported: "Suresh Kumar", reason: "Abusive language", status: "reviewed" as Status, date: "Apr 4" },
];

const STATUS_STYLE: Record<Status, { bg: string; color: string }> = {
  pending: { bg: "#ef444420", color: "#ef4444" },
  reviewed: { bg: "#f59e0b20", color: "#f59e0b" },
  resolved: { bg: "#22c55e20", color: "#22c55e" },
};

export default function AdminReportsPage() {
  const [reports, setReports] = useState(INITIAL_REPORTS);

  const resolve = (id: string) => setReports((r) => r.map((x) => x.id === id ? { ...x, status: "resolved" as Status } : x));
  const review = (id: string) => setReports((r) => r.map((x) => x.id === id ? { ...x, status: "reviewed" as Status } : x));

  const pending = reports.filter((r) => r.status === "pending").length;

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
            <span className="text-white font-semibold">Reports</span>
          </div>
          {pending > 0 && <Badge className="text-xs font-bold" style={{ background: "#ef4444", color: "#fff" }}>{pending} Open</Badge>}
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8 w-full space-y-3">
        {reports.map((r) => {
          const st = STATUS_STYLE[r.status];
          return (
            <div key={r.id} className="rounded-2xl border border-white/10 bg-white/20 backdrop-blur-md p-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: "#ef444415" }}>
                <Flag className="w-5 h-5" style={{ color: "#ef4444" }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-white font-medium text-sm">{r.reported}</span>
                  <Badge className="text-xs capitalize" style={{ background: st.bg, color: st.color, border: `1px solid ${st.color}` }}>{r.status}</Badge>
                </div>
                <p className="text-white/60 text-xs"><span className="text-white/40">Reason:</span> {r.reason}</p>
                <p className="text-white/40 text-xs">Reported by {r.reporter} · {r.date}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                {r.status === "pending" && (
                  <button onClick={() => review(r.id)} className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition hover:opacity-90" style={{ background: "#f59e0b20", color: "#f59e0b", border: "1px solid #f59e0b" }}>
                    <Eye className="w-3.5 h-3.5" /> Review
                  </button>
                )}
                {r.status !== "resolved" && (
                  <button onClick={() => resolve(r.id)} className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition hover:opacity-90" style={{ background: "#22c55e20", color: "#22c55e", border: "1px solid #22c55e" }}>
                    <CheckCircle className="w-3.5 h-3.5" /> Resolve
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
