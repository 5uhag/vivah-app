import Image from "next/image";
import Link from "next/link";
import { Home, Search, Heart } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4">
      <div className="fixed inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1920&q=60"
          alt="404 background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-pink-950/60" />
      </div>

      <div className="text-center max-w-md">
        <div className="text-8xl font-extrabold mb-4" style={{ color: "#E91E8C" }}>404</div>
        <div className="text-4xl mb-3">💔</div>
        <h1 className="text-2xl font-bold text-white mb-3">Page Not Found</h1>
        <p className="text-white/60 mb-8">
          This page seems to have run away. But don&apos;t worry — your perfect match is still out there!
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full text-white font-medium transition hover:opacity-90"
            style={{ background: "#E91E8C" }}
          >
            <Home className="w-4 h-4" /> Go Home
          </Link>
          <Link
            href="/search"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/30 text-white font-medium hover:bg-white/10 transition"
          >
            <Search className="w-4 h-4" /> Browse Profiles
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/30 text-white font-medium hover:bg-white/10 transition"
          >
            <Heart className="w-4 h-4" /> Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
