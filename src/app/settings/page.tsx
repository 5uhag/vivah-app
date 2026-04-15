"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowLeft, Shield, Bell, Lock, Trash2, Eye, EyeOff, Wifi, KeyRound } from "lucide-react";

export default function SettingsPage() {
  const [hideProfile, setHideProfile] = useState(false);
  const [showOnline, setShowOnline] = useState(true);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [matchNotifs, setMatchNotifs] = useState(true);
  const [msgNotifs, setMsgNotifs] = useState(true);
  const [twoFA, setTwoFA] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  return (
    <TooltipProvider>
      <div className="relative min-h-screen flex flex-col">
        <div className="fixed inset-0 -z-10">
          <Image src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1920&q=60" alt="bg" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-pink-950/40" />
        </div>

        <nav className="sticky top-0 z-50 bg-pink-950/40 backdrop-blur-md border-b border-white/10">
          <div className="max-w-2xl mx-auto px-4 flex items-center h-14 gap-3">
            <Link href="/" className="text-white/70 hover:text-white transition"><ArrowLeft className="w-5 h-5" /></Link>
            <span className="text-white font-semibold">Settings</span>
          </div>
        </nav>

        <div className="max-w-2xl mx-auto px-4 py-8 w-full space-y-6">

          {/* Account */}
          <Section icon={<Shield className="w-4 h-4" />} title="Account">
            <div className="space-y-4">
              <div>
                <Label className="text-white/70 text-sm mb-1.5 block">Full Name</Label>
                <Input defaultValue="Priya Sharma" className="bg-white/20 border-white/20 text-white" />
              </div>
              <div>
                <Label className="text-white/70 text-sm mb-1.5 block">Email Address</Label>
                <Input defaultValue="priya.sharma@email.com" className="bg-white/20 border-white/20 text-white" />
              </div>
              <div>
                <Label className="text-white/70 text-sm mb-1.5 block">Phone Number</Label>
                <Input defaultValue="+91 98765 43210" className="bg-white/20 border-white/20 text-white" />
              </div>
              <button className="px-5 py-2 rounded-full text-white text-sm font-medium transition hover:opacity-90" style={{ background: "#E91E8C" }}>
                Save Changes
              </button>
            </div>
          </Section>

          {/* Privacy */}
          <Section icon={<Eye className="w-4 h-4" />} title="Privacy">
            <div className="space-y-5">
              <ToggleRow
                label="Hide My Profile"
                desc="Your profile won't appear in search results"
                icon={<EyeOff className="w-4 h-4 text-white/40" />}
                checked={hideProfile}
                onCheckedChange={setHideProfile}
              />
              <Separator className="bg-white/10" />
              <ToggleRow
                label="Show Online Status"
                desc="Let others see when you're active"
                icon={<Wifi className="w-4 h-4 text-white/40" />}
                checked={showOnline}
                onCheckedChange={setShowOnline}
              />
            </div>
          </Section>

          {/* Notifications */}
          <Section icon={<Bell className="w-4 h-4" />} title="Notifications">
            <div className="space-y-5">
              <ToggleRow label="Email Notifications" desc="Receive updates via email" checked={emailNotifs} onCheckedChange={setEmailNotifs} />
              <Separator className="bg-white/10" />
              <ToggleRow label="Push Notifications" desc="Browser & app push alerts" checked={pushNotifs} onCheckedChange={setPushNotifs} />
              <Separator className="bg-white/10" />
              <ToggleRow label="New Match Alerts" desc="Get notified on new matches" checked={matchNotifs} onCheckedChange={setMatchNotifs} />
              <Separator className="bg-white/10" />
              <ToggleRow label="Message Alerts" desc="Get notified on new messages" checked={msgNotifs} onCheckedChange={setMsgNotifs} />
            </div>
          </Section>

          {/* Security */}
          <Section icon={<Lock className="w-4 h-4" />} title="Security">
            <div className="space-y-5">
              <ToggleRow
                label="Two-Factor Authentication"
                desc="Add an extra layer of security to your account"
                icon={<KeyRound className="w-4 h-4 text-white/40" />}
                checked={twoFA}
                onCheckedChange={setTwoFA}
              />
              <Separator className="bg-white/10" />
              <div className="space-y-3">
                <p className="text-white/70 text-sm font-medium">Change Password</p>
                <div className="relative">
                  <Input type={showPass ? "text" : "password"} placeholder="Current password" className="bg-white/20 border-white/20 text-white placeholder:text-white/40 pr-10" />
                  <button onClick={() => setShowPass((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <div className="relative">
                  <Input type={showNewPass ? "text" : "password"} placeholder="New password" className="bg-white/20 border-white/20 text-white placeholder:text-white/40 pr-10" />
                  <button onClick={() => setShowNewPass((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white">
                    {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <Input type="password" placeholder="Confirm new password" className="bg-white/20 border-white/20 text-white placeholder:text-white/40" />
                <button className="px-5 py-2 rounded-full text-white text-sm font-medium transition hover:opacity-90" style={{ background: "#E91E8C" }}>
                  Update Password
                </button>
              </div>
            </div>
          </Section>

          {/* Danger Zone */}
          <Section icon={<Trash2 className="w-4 h-4" />} title="Danger Zone" danger>
            <div className="space-y-3">
              <p className="text-white/60 text-sm">Permanently delete your account and all associated data. This action cannot be undone.</p>
              <Tooltip>
                <TooltipTrigger>
                  <button
                    disabled
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-red-500/40 text-red-400 text-sm font-medium opacity-50 cursor-not-allowed"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete My Account
                  </button>
                </TooltipTrigger>
                <TooltipContent className="bg-pink-950 border-white/10 text-white text-xs">
                  Contact support to delete your account
                </TooltipContent>
              </Tooltip>
            </div>
          </Section>

        </div>
      </div>
    </TooltipProvider>
  );
}

function Section({ icon, title, children, danger }: { icon?: React.ReactNode; title: string; children: React.ReactNode; danger?: boolean }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/20 backdrop-blur-md overflow-hidden">
      <div className={`flex items-center gap-2 px-5 py-3 border-b border-white/10 ${danger ? "bg-red-500/10" : "bg-white/5"}`}>
        <span style={{ color: danger ? "#ef4444" : "#F8A4C8" }}>{icon}</span>
        <span className={`font-semibold text-sm ${danger ? "text-red-400" : "text-white"}`}>{title}</span>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function ToggleRow({ label, desc, icon, checked, onCheckedChange }: { label: string; desc: string; icon?: React.ReactNode; checked: boolean; onCheckedChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2 min-w-0">
        {icon}
        <div>
          <div className="text-white text-sm font-medium">{label}</div>
          <div className="text-white/40 text-xs">{desc}</div>
        </div>
      </div>
      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="data-[state=checked]:bg-[#E91E8C] shrink-0"
      />
    </div>
  );
}
