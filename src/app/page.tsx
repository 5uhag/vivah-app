import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  Shield,
  Users,
  Star,
  MessageCircle,
  Search,
  CheckCircle,
  Globe,
} from "lucide-react";

const features = [
  { icon: Shield, title: "100% Verified Profiles", desc: "Every profile is manually verified by our team for authenticity." },
  { icon: Search, title: "Smart Matchmaking", desc: "AI-powered matches based on your preferences, values, and lifestyle." },
  { icon: MessageCircle, title: "Safe Messaging", desc: "Chat securely with matches. Your privacy is our priority." },
  { icon: Heart, title: "Icebreaker Messages", desc: "Break the ice with thoughtful prompts and interest expressions." },
  { icon: Globe, title: "Multi-language Support", desc: "Available in English and Hindi for a truly Indian experience." },
  { icon: CheckCircle, title: "Premium Plans", desc: "Unlock unlimited interests, contact views, and priority listing." },
];

const stories = [
  {
    names: "Priya & Arjun",
    location: "Mumbai",
    quote: "We connected on Vivah and knew instantly. Two years later, we are happily married!",
    year: "2023",
  },
  {
    names: "Kavita & Rahul",
    location: "Delhi",
    quote: "Vivah's smart matching brought us together. Our families couldn't be happier.",
    year: "2024",
  },
  {
    names: "Meera & Vikram",
    location: "Bangalore",
    quote: "From the first message to the mandap — Vivah made every step beautiful.",
    year: "2024",
  },
];

export default function LandingPage() {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1920&q=60"
          alt="Wedding background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <span className="text-2xl font-bold text-white">Vivah ❤️</span>
          <div className="flex gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-white border border-white/40 rounded-full hover:bg-white/10 transition"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 text-sm font-medium text-white rounded-full transition"
              style={{ background: "#C0392B" }}
            >
              Register
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-24 sm:py-32">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight max-w-4xl">
          Find Your Perfect{" "}
          <span style={{ color: "#F39C12" }}>Life Partner</span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-white/80 max-w-2xl">
          India&apos;s most trusted matrimonial platform. Lakhs of verified profiles, advanced matching, and a journey that begins with a single click.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/register"
            className="px-8 py-4 text-lg font-semibold text-white rounded-full shadow-lg transition hover:opacity-90"
            style={{ background: "#C0392B" }}
          >
            Create Free Profile
          </Link>
          <Link
            href="/login"
            className="px-8 py-4 text-lg font-semibold text-white rounded-full border border-white/50 hover:bg-white/10 transition"
          >
            Sign In
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-black/50 border-y border-white/10">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-3 gap-6 text-center">
          {[
            { value: "50,000+", label: "Profiles" },
            { value: "10,000+", label: "Marriages" },
            { value: "4.8★", label: "Rating" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl sm:text-4xl font-extrabold" style={{ color: "#F39C12" }}>
                {s.value}
              </div>
              <div className="mt-1 text-sm sm:text-base text-white/70">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-black/40">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Why Choose <span style={{ color: "#F39C12" }}>Vivah</span>?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl p-6 border border-white/10 bg-white/5 backdrop-blur hover:bg-white/10 transition"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                  style={{ background: "#C0392B22" }}
                >
                  <f.icon className="w-6 h-6" style={{ color: "#F39C12" }} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-white/60 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 px-4 bg-black/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-3">
            Success <span style={{ color: "#F39C12" }}>Stories</span>
          </h2>
          <p className="text-white/60 text-center mb-12">Real couples, real love stories</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {stories.map((s) => (
              <div
                key={s.names}
                className="rounded-2xl p-6 border border-white/10 bg-white/5 backdrop-blur"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm"
                    style={{ background: "#C0392B" }}
                  >
                    {s.names[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{s.names}</div>
                    <div className="text-xs text-white/50">{s.location} · {s.year}</div>
                  </div>
                </div>
                <p className="text-white/70 text-sm italic">&ldquo;{s.quote}&rdquo;</p>
                <div className="mt-4 flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-current" style={{ color: "#F39C12" }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/stories"
              className="px-6 py-3 rounded-full border border-white/30 text-white hover:bg-white/10 transition"
            >
              View All Stories
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/60 border-t border-white/10 py-10 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-sm text-white/50">
          <div>
            <div className="text-white font-bold text-lg mb-3">Vivah ❤️</div>
            <p>India&apos;s most trusted matrimonial platform since 2024.</p>
          </div>
          <div>
            <div className="text-white font-semibold mb-3">Company</div>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-white transition">About Us</Link></li>
              <li><Link href="#" className="hover:text-white transition">Careers</Link></li>
              <li><Link href="#" className="hover:text-white transition">Press</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-white font-semibold mb-3">Support</div>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-white transition">Help Center</Link></li>
              <li><Link href="#" className="hover:text-white transition">Safety Tips</Link></li>
              <li><Link href="#" className="hover:text-white transition">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-white font-semibold mb-3">Legal</div>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-white transition">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-white/10 text-center text-xs text-white/30">
          © {new Date().getFullYear()} Vivah. All rights reserved. Made with ❤️ in India.
        </div>
      </footer>
    </div>
  );
}
