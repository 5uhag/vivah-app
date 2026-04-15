"use client";

import Image from "next/image";
import { useState } from "react";
import { Check } from "lucide-react";
import Navbar from "@/components/Navbar";

const LANGUAGES = [
  { code: "en", label: "English", native: "English" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "ta", label: "Tamil", native: "தமிழ்" },
  { code: "te", label: "Telugu", native: "తెలుగు" },
  { code: "kn", label: "Kannada", native: "ಕನ್ನಡ" },
  { code: "ml", label: "Malayalam", native: "മലയാളം" },
  { code: "mr", label: "Marathi", native: "मराठी" },
  { code: "bn", label: "Bengali", native: "বাংলা" },
  { code: "gu", label: "Gujarati", native: "ગુજરાતી" },
  { code: "pa", label: "Punjabi", native: "ਪੰਜਾਬੀ" },
];

export default function LanguagePage() {
  const [selected, setSelected] = useState("en");

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="fixed inset-0 -z-10">
        <Image src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1920&q=60" alt="bg" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-pink-950/40" />
      </div>

      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-8 w-full">
        <p className="text-white/60 text-sm mb-5">Select your preferred language for the app interface.</p>
        <div className="rounded-2xl border border-white/10 bg-white/20 backdrop-blur-md divide-y divide-white/10 overflow-hidden">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelected(lang.code)}
              className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/10 transition"
            >
              <div className="text-left">
                <div className="text-white font-medium">{lang.native}</div>
                <div className="text-white/50 text-xs">{lang.label}</div>
              </div>
              {selected === lang.code && (
                <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "#E91E8C" }}>
                  <Check className="w-3.5 h-3.5 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>
        <button
          className="mt-6 w-full py-3 rounded-full text-white font-semibold transition hover:opacity-90"
          style={{ background: "#E91E8C" }}
        >
          Save Language
        </button>
      </div>
    </div>
  );
}
