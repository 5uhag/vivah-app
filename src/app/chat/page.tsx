import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const CONVERSATIONS = [
  { id: "1", name: "Meera Pillai", photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=60", lastMsg: "That sounds wonderful! Would love to hear more.", time: "2m ago", unread: 3, online: true },
  { id: "2", name: "Ananya Reddy", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=60", lastMsg: "Sure, let's plan a call this weekend!", time: "1h ago", unread: 0, online: true },
  { id: "3", name: "Riya Kapoor", photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=200&q=60", lastMsg: "I love that movie too!", time: "3h ago", unread: 1, online: false },
  { id: "4", name: "Pooja Nair", photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=60", lastMsg: "My family is from Kerala as well 😊", time: "Yesterday", unread: 0, online: false },
  { id: "5", name: "Sneha Iyer", photo: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=200&q=60", lastMsg: "What kind of music do you like?", time: "2d ago", unread: 0, online: false },
];

export default function ChatPage() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="fixed inset-0 -z-10">
        <Image src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1920&q=60" alt="Chat background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-pink-950/40" />
      </div>

      <nav className="sticky top-0 z-50 bg-pink-950/40 backdrop-blur-md border-b border-white/10">
        <div className="max-w-2xl mx-auto px-4 flex items-center h-14 gap-3">
          <Link href="/" className="text-white/70 hover:text-white transition"><ArrowLeft className="w-5 h-5" /></Link>
          <span className="text-white font-semibold">Messages</span>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-6 w-full flex-1">
        {/* Search */}
        <div className="relative mb-5">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <Input placeholder="Search conversations..." className="pl-9 bg-white/20 border-white/20 text-white placeholder:text-white/40 rounded-full" />
        </div>

        {CONVERSATIONS.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-white/40">
            <Search className="w-12 h-12 mb-3" />
            <p className="text-sm">No conversations yet</p>
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/20 backdrop-blur-md overflow-hidden divide-y divide-white/10">
            {CONVERSATIONS.map((c) => (
              <Link key={c.id} href={`/chat/${c.id}`} className="flex items-center gap-4 px-4 py-4 hover:bg-white/10 transition">
                <div className="relative shrink-0">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image src={c.photo} alt={c.name} fill className="object-cover" />
                  </div>
                  {c.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-pink-950" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-white font-medium text-sm truncate">{c.name}</span>
                    <span className="text-white/40 text-xs shrink-0 ml-2">{c.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-white/60 text-xs truncate">{c.lastMsg}</p>
                    {c.unread > 0 && (
                      <span className="ml-2 shrink-0 w-5 h-5 rounded-full text-white text-xs flex items-center justify-center font-bold" style={{ background: "#E91E8C" }}>
                        {c.unread}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
