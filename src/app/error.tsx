"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { RefreshCw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4">
      <div className="fixed inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1920&q=60"
          alt="Error background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-pink-950/60" />
      </div>

      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold text-white mb-3">Something went wrong</h1>
        <p className="text-white/60 mb-2">
          We hit an unexpected error. Our team has been notified.
        </p>
        {error.digest && (
          <p className="text-white/30 text-xs mb-8">Error ID: {error.digest}</p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full text-white font-medium transition hover:opacity-90"
            style={{ background: "#E91E8C" }}
          >
            <RefreshCw className="w-4 h-4" /> Try Again
          </button>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/30 text-white font-medium hover:bg-white/10 transition"
          >
            <Home className="w-4 h-4" /> Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
