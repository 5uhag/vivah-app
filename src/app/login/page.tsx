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
        <div className="absolute inset-0 bg-pink-950/40" />
      </div>

      {/* Logo */}
      <Link href="/" className="mb-8 text-3xl font-extrabold text-white">
        PyaarMatch 💕
      </Link>

      {/* Clerk SignIn */}
      <SignIn
        routing="hash"
        appearance={{
          elements: {
            formButtonPrimary: "bg-pink-500",
          },
        }}
      />
    </div>
  );
}
