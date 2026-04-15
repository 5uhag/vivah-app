"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send } from "lucide-react";

const CONTACT = {
  id: "1",
  name: "Meera Pillai",
  photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=60",
  online: true,
};

const INITIAL_MESSAGES = [
  { id: "1", sender: "them", text: "Hi! I saw your profile and it really resonated with me 😊", time: "10:02 AM" },
  { id: "2", sender: "me", text: "Hello Meera! Thank you so much, yours is beautiful too!", time: "10:05 AM" },
  { id: "3", sender: "them", text: "I noticed we both love traveling — have you been to Coorg?", time: "10:07 AM" },
  { id: "4", sender: "me", text: "Yes! Coorg is magical. I went last monsoon season, it was breathtaking.", time: "10:09 AM" },
  { id: "5", sender: "them", text: "That sounds wonderful! Would love to hear more about your trip.", time: "10:11 AM" },
];

export default function ChatDetailPage() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      { id: String(Date.now()), sender: "me", text, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
    ]);
    setInput("");
  };

  return (
    <div className="relative h-screen flex flex-col overflow-hidden">
      <div className="fixed inset-0 -z-10">
        <Image src="https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&w=1920&q=60" alt="Chat background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-pink-950/40" />
      </div>

      {/* Header */}
      <nav className="shrink-0 z-50 bg-pink-950/40 backdrop-blur-md border-b border-white/10">
        <div className="max-w-2xl mx-auto px-4 flex items-center h-14 gap-3">
          <Link href="/chat" className="text-white/70 hover:text-white transition"><ArrowLeft className="w-5 h-5" /></Link>
          <div className="relative shrink-0">
            <div className="relative w-9 h-9 rounded-full overflow-hidden">
              <Image src={CONTACT.photo} alt={CONTACT.name} fill className="object-cover" />
            </div>
            {CONTACT.online && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-pink-950" />}
          </div>
          <div>
            <div className="text-white font-semibold text-sm">{CONTACT.name}</div>
            {CONTACT.online && <div className="text-green-400 text-xs">Online</div>}
          </div>
        </div>
      </nav>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 max-w-2xl mx-auto w-full">
        <div className="space-y-3">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.sender === "me" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${m.sender === "me" ? "rounded-br-sm" : "rounded-bl-sm"}`}
                style={m.sender === "me" ? { background: "#E91E8C" } : { background: "rgba(255,255,255,0.2)", backdropFilter: "blur(12px)" }}>
                <p className="text-white text-sm">{m.text}</p>
                <p className="text-white/50 text-xs mt-1 text-right">{m.time}</p>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <div className="shrink-0 border-t border-white/10 bg-pink-950/40 backdrop-blur-md px-4 py-3">
        <div className="max-w-2xl mx-auto flex gap-3 items-center">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-1 bg-white/20 border-white/20 text-white placeholder:text-white/40 rounded-full"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-10 h-10 rounded-full flex items-center justify-center text-white transition hover:opacity-90 disabled:opacity-40"
            style={{ background: "#E91E8C" }}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
