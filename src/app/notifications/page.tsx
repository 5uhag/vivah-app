"use client";

import Image from "next/image";
import { useState } from "react";
import { Heart, Hand, MessageCircle, Settings, Bell } from "lucide-react";
import Navbar from "@/components/Navbar";

type NotifType = "match" | "interest" | "message" | "system";

interface Notif {
  id: string;
  type: NotifType;
  title: string;
  body: string;
  time: string;
  read: boolean;
}

const INITIAL: Notif[] = [
  { id: "1", type: "match", title: "New Match!", body: "You and Meera Pillai have matched. Start a conversation!", time: "2 min ago", read: false },
  { id: "2", type: "interest", title: "Interest Received", body: "Rohan Mehta sent you an interest with an icebreaker.", time: "15 min ago", read: false },
  { id: "3", type: "message", title: "New Message", body: "Ananya Reddy: That sounds wonderful! Would love to hear more.", time: "1 hr ago", read: false },
  { id: "4", type: "interest", title: "Interest Accepted", body: "Priya Sharma accepted your interest! You can now chat.", time: "3 hr ago", read: false },
  { id: "5", type: "system", title: "Profile Verified", body: "Your profile has been verified. You now have a verified badge.", time: "Yesterday", read: true },
  { id: "6", type: "message", title: "New Message", body: "Riya Kapoor: I love that movie too!", time: "Yesterday", read: true },
  { id: "7", type: "match", title: "New Match!", body: "You and Pooja Nair have matched. Break the ice!", time: "2 days ago", read: true },
  { id: "8", type: "system", title: "Premium Expiring", body: "Your Premium plan expires in 3 days. Renew to keep benefits.", time: "3 days ago", read: true },
];

const ICONS: Record<NotifType, { icon: React.ElementType; emoji: string }> = {
  match: { icon: Heart, emoji: "💕" },
  interest: { icon: Hand, emoji: "👋" },
  message: { icon: MessageCircle, emoji: "💬" },
  system: { icon: Settings, emoji: "⚙️" },
};

const BG: Record<NotifType, string> = {
  match: "#E91E8C20",
  interest: "#F8A4C820",
  message: "#a855f720",
  system: "#64748b20",
};

const BORDER: Record<NotifType, string> = {
  match: "#E91E8C",
  interest: "#F8A4C8",
  message: "#a855f7",
  system: "#64748b",
};

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState(INITIAL);

  const markAllRead = () => setNotifs((n) => n.map((x) => ({ ...x, read: true })));
  const markRead = (id: string) => setNotifs((n) => n.map((x) => x.id === id ? { ...x, read: true } : x));

  const unreadCount = notifs.filter((n) => !n.read).length;

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="fixed inset-0 -z-10">
        <Image src="https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=1920&q=60" alt="bg" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-pink-950/40" />
      </div>

      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-6 w-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h1 className="text-white font-bold text-xl">Notifications</h1>
            {unreadCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full text-xs font-bold text-white" style={{ background: "#E91E8C" }}>{unreadCount}</span>
            )}
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="text-xs font-medium transition hover:opacity-80" style={{ color: "#F8A4C8" }}>
              Mark all read
            </button>
          )}
        </div>
        {notifs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 text-white/40">
            <Bell className="w-14 h-14 mb-4" />
            <p className="text-lg font-medium mb-1">All caught up!</p>
            <p className="text-sm">No notifications yet.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {notifs.map((n) => {
              const { emoji } = ICONS[n.type];
              return (
                <button
                  key={n.id}
                  onClick={() => markRead(n.id)}
                  className="w-full text-left rounded-2xl border transition overflow-hidden"
                  style={{
                    background: n.read ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.2)",
                    borderColor: n.read ? "rgba(255,255,255,0.1)" : BORDER[n.type],
                    borderLeftWidth: n.read ? "1px" : "3px",
                  }}
                >
                  <div className="flex gap-4 items-start p-4 backdrop-blur-md">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0" style={{ background: BG[n.type] }}>
                      {emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <span className={`text-sm font-semibold ${n.read ? "text-white/70" : "text-white"}`}>{n.title}</span>
                        <span className="text-xs text-white/40 shrink-0">{n.time}</span>
                      </div>
                      <p className={`text-xs mt-0.5 ${n.read ? "text-white/40" : "text-white/70"}`}>{n.body}</p>
                    </div>
                    {!n.read && <div className="w-2 h-2 rounded-full shrink-0 mt-1.5" style={{ background: "#E91E8C" }} />}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
