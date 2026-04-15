import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black/60 border-t border-white/10 py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-sm text-white/50">
        <div>
          <div className="text-white font-bold text-lg mb-3">PyaarMatch 💕</div>
          <p>India&apos;s most trusted matrimonial platform since 2024.</p>
        </div>
        <div>
          <div className="text-white font-semibold mb-3">Company</div>
          <ul className="space-y-2">
            <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
            <li><Link href="/careers" className="hover:text-white transition">Careers</Link></li>
            <li><Link href="/press" className="hover:text-white transition">Press</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-white font-semibold mb-3">Support</div>
          <ul className="space-y-2">
            <li><Link href="/help" className="hover:text-white transition">Help Center</Link></li>
            <li><Link href="/safety" className="hover:text-white transition">Safety Tips</Link></li>
            <li><Link href="/contact" className="hover:text-white transition">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-white font-semibold mb-3">Legal</div>
          <ul className="space-y-2">
            <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white transition">Terms of Service</Link></li>
            <li><Link href="/cookies" className="hover:text-white transition">Cookie Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-white/10 text-center text-xs text-white/30">
        © 2026 PyaarMatch. All rights reserved. Made with 💕 in India.
      </div>
    </footer>
  );
}
