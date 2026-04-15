"use client";

import Link from "next/link";
import { useState } from "react";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { isSignedIn } = useUser();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-pink-950/40 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
        <Link href="/" className="text-xl font-bold text-white shrink-0">
          PyaarMatch 💕
        </Link>

        {/* Desktop */}
        <div className="hidden sm:flex gap-3 items-center">
          {isSignedIn ? (
            <>
              <Link href="/search" className="px-4 py-1.5 text-sm text-white border border-white/30 rounded-full hover:bg-white/10 transition">
                Search 💕
              </Link>
              <Link href="/profile/edit" className="px-4 py-1.5 text-sm text-white border border-white/30 rounded-full hover:bg-white/10 transition">
                My Profile
              </Link>
              <SignOutButton>
                <button className="px-4 py-1.5 text-sm text-white rounded-full hover:opacity-90 transition" style={{ background: "#E91E8C" }}>
                  Sign Out
                </button>
              </SignOutButton>
            </>
          ) : (
            <>
              <Link href="/register" className="px-4 py-1.5 text-sm text-white border border-white/30 rounded-full hover:bg-white/10 transition">
                Create Free Profile
              </Link>
              <Link href="/login" className="px-4 py-1.5 text-sm text-white rounded-full hover:opacity-90 transition" style={{ background: "#E91E8C" }}>
                Sign In
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden text-white/70 hover:text-white transition p-1"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="sm:hidden border-t border-white/10 bg-pink-950/60 backdrop-blur-md px-4 py-3 flex flex-col gap-2">
          {isSignedIn ? (
            <>
              <Link href="/search" onClick={() => setOpen(false)} className="px-4 py-2.5 text-sm text-white border border-white/20 rounded-full hover:bg-white/10 transition text-center">
                Search 💕
              </Link>
              <Link href="/profile/edit" onClick={() => setOpen(false)} className="px-4 py-2.5 text-sm text-white border border-white/20 rounded-full hover:bg-white/10 transition text-center">
                My Profile
              </Link>
              <SignOutButton>
                <button className="w-full px-4 py-2.5 text-sm text-white rounded-full hover:opacity-90 transition" style={{ background: "#E91E8C" }}>
                  Sign Out
                </button>
              </SignOutButton>
            </>
          ) : (
            <>
              <Link href="/register" onClick={() => setOpen(false)} className="px-4 py-2.5 text-sm text-white border border-white/20 rounded-full hover:bg-white/10 transition text-center">
                Create Free Profile
              </Link>
              <Link href="/login" onClick={() => setOpen(false)} className="px-4 py-2.5 text-sm text-white rounded-full hover:opacity-90 transition text-center" style={{ background: "#E91E8C" }}>
                Sign In
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
