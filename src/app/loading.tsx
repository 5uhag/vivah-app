export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-pink-950/80 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-16 h-16">
          <div
            className="absolute inset-0 rounded-full border-4 border-transparent animate-spin"
            style={{ borderTopColor: "#E91E8C" }}
          />
          <div className="absolute inset-2 rounded-full flex items-center justify-center text-2xl">
            💕
          </div>
        </div>
        <p className="text-white/70 text-sm font-medium animate-pulse">Finding your match…</p>
      </div>
    </div>
  );
}
