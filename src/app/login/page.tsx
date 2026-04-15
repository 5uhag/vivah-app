import Image from "next/image";
import Link from "next/link";
import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1920&q=60"
          alt="Login background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Logo */}
      <Link href="/" className="mb-8 text-3xl font-extrabold text-white">
        Vivah ❤️
      </Link>

      {/* Clerk SignIn */}
      <SignIn
        appearance={{
          elements: {
            rootBox: "w-full max-w-md",
            card: "rounded-2xl shadow-2xl border border-white/10 bg-white/10 backdrop-blur-md",
            headerTitle: "text-white",
            headerSubtitle: "text-white/60",
            socialButtonsBlockButton: "border border-white/20 text-white hover:bg-white/10",
            dividerLine: "bg-white/20",
            dividerText: "text-white/40",
            formFieldLabel: "text-white/80",
            formFieldInput: "bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:border-[#F39C12]",
            formButtonPrimary: "bg-[#C0392B] hover:bg-[#a93226] text-white",
            footerActionLink: "text-[#F39C12] hover:text-[#e67e22]",
            identityPreviewText: "text-white",
            identityPreviewEditButton: "text-[#F39C12]",
          },
        }}
      />
    </div>
  );
}
