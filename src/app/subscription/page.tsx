"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, Zap, Crown, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const CURRENT_PLAN = "free";

const PLANS = [
  {
    id: "free",
    name: "Free",
    price: "₹0",
    period: "/forever",
    icon: Star,
    color: "#64748b",
    features: [
      { text: "5 profile views/day", included: true },
      { text: "3 interests/month", included: true },
      { text: "Basic search filters", included: true },
      { text: "Chat after match", included: false },
      { text: "See who viewed you", included: false },
      { text: "Unlimited interests", included: false },
      { text: "Priority listing", included: false },
      { text: "AI matchmaking", included: false },
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: "₹999",
    period: "/month",
    icon: Zap,
    color: "#E91E8C",
    popular: true,
    features: [
      { text: "Unlimited profile views", included: true },
      { text: "50 interests/month", included: true },
      { text: "Advanced search filters", included: true },
      { text: "Chat after match", included: true },
      { text: "See who viewed you", included: true },
      { text: "Unlimited interests", included: false },
      { text: "Priority listing", included: false },
      { text: "AI matchmaking", included: false },
    ],
  },
  {
    id: "gold",
    name: "Gold",
    price: "₹1,999",
    period: "/month",
    icon: Crown,
    color: "#F8A4C8",
    features: [
      { text: "Unlimited profile views", included: true },
      { text: "Unlimited interests", included: true },
      { text: "Advanced search filters", included: true },
      { text: "Chat after match", included: true },
      { text: "See who viewed you", included: true },
      { text: "Unlimited interests", included: true },
      { text: "Priority listing", included: true },
      { text: "AI matchmaking", included: true },
    ],
  },
];

function handleRazorpay(plan: string) {
  // Razorpay integration placeholder
  alert(`Razorpay checkout for ${plan} plan — integrate Razorpay SDK here.`);
}

export default function SubscriptionPage() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="fixed inset-0 -z-10">
        <Image src="https://images.unsplash.com/photo-1565514020179-026b92b84bb6?auto=format&fit=crop&w=1920&q=60" alt="bg" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-pink-950/40" />
      </div>

      <nav className="sticky top-0 z-50 bg-pink-950/40 backdrop-blur-md border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 flex items-center h-14 gap-3">
          <Link href="/" className="text-white/70 hover:text-white transition"><ArrowLeft className="w-5 h-5" /></Link>
          <span className="text-white font-semibold">Choose Your Plan</span>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-12 w-full">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">Unlock Your Perfect Match 💕</h1>
          <p className="text-white/60 max-w-xl mx-auto">Upgrade to connect faster, chat freely, and let AI find your soulmate.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-stretch">
          {PLANS.map((plan) => {
            const isCurrent = plan.id === CURRENT_PLAN;
            const Icon = plan.icon;
            return (
              <div
                key={plan.id}
                className="relative rounded-2xl border backdrop-blur-md flex flex-col overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  borderColor: isCurrent ? plan.color : plan.popular ? "#E91E8C" : "rgba(255,255,255,0.15)",
                  borderWidth: plan.popular ? "2px" : "1px",
                }}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "#E91E8C" }} />
                )}
                {plan.popular && (
                  <div className="absolute -top-0 left-1/2 -translate-x-1/2 mt-0">
                    <Badge className="text-xs font-bold text-white mt-2" style={{ background: "#E91E8C" }}>Most Popular</Badge>
                  </div>
                )}

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-4 mt-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `${plan.color}20` }}>
                      <Icon className="w-5 h-5" style={{ color: plan.color }} />
                    </div>
                    <div>
                      <div className="text-white font-bold">{plan.name}</div>
                      {isCurrent && <span className="text-xs" style={{ color: plan.color }}>Current Plan</span>}
                    </div>
                  </div>

                  <div className="mb-6">
                    <span className="text-3xl font-extrabold text-white">{plan.price}</span>
                    <span className="text-white/50 text-sm">{plan.period}</span>
                  </div>

                  <ul className="space-y-2.5 flex-1 mb-6">
                    {plan.features.map((f) => (
                      <li key={f.text} className="flex items-center gap-2.5 text-sm">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${f.included ? "" : "opacity-30"}`}
                          style={{ background: f.included ? `${plan.color}30` : "rgba(255,255,255,0.1)" }}>
                          <Check className="w-2.5 h-2.5" style={{ color: f.included ? plan.color : "#64748b" }} />
                        </div>
                        <span className={f.included ? "text-white/80" : "text-white/30 line-through"}>{f.text}</span>
                      </li>
                    ))}
                  </ul>

                  {isCurrent ? (
                    <div className="w-full py-2.5 rounded-full border text-center text-sm font-medium text-white/50" style={{ borderColor: "rgba(255,255,255,0.2)" }}>
                      Current Plan
                    </div>
                  ) : (
                    <button
                      onClick={() => handleRazorpay(plan.name)}
                      className="w-full py-2.5 rounded-full text-white text-sm font-semibold transition hover:opacity-90"
                      style={{ background: plan.popular ? "#E91E8C" : plan.color }}
                    >
                      {plan.id === "free" ? "Downgrade" : `Get ${plan.name}`}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-white/30 text-xs mt-8">Payments secured by Razorpay · Cancel anytime · GST applicable</p>
      </div>
    </div>
  );
}
