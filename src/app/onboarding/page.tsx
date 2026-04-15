"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Camera, ChevronRight, ChevronLeft, Check, Sparkles } from "lucide-react";

const STEPS = ["Personal", "Background", "Career", "Preferences", "Photos"];
const RELIGIONS = ["Hindu", "Muslim", "Christian", "Sikh", "Buddhist", "Jain", "Other"];
const EDUCATIONS = ["10th", "12th", "Diploma", "B.A.", "B.Com", "B.Sc.", "B.Tech", "M.A.", "M.Tech", "MBA", "PhD", "Other"];
const PROFESSIONS = ["Software Engineer", "Doctor", "Teacher", "Lawyer", "Business", "Government Job", "CA", "Self Employed", "Other"];
const PHOTO_SLOTS = 4;

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [photos, setPhotos] = useState<(string | null)[]>(Array(PHOTO_SLOTS).fill(null));
  const [form, setForm] = useState({
    fullName: "", gender: "", dob: "", phone: "", location: "",
    religion: "", caste: "", height: "", about: "",
    education: "", college: "", profession: "", employer: "", income: "",
    partnerAgeMin: "22", partnerAgeMax: "35", partnerReligion: "", partnerLocation: "",
  });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const progress = ((step) / STEPS.length) * 100;
  const isLast = step === STEPS.length - 1;

  const handleNext = () => {
    if (isLast) { router.push("/dashboard"); return; }
    setStep((s) => s + 1);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="fixed inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1516589091380-5d8e87df6999?auto=format&fit=crop&w=1920&q=60"
          alt="Onboarding background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-pink-950/60" />
      </div>

      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-2xl font-bold text-white mb-1">PyaarMatch 💕</div>
          <p className="text-white/60 text-sm">Let&apos;s build your profile — step {step + 1} of {STEPS.length}</p>
        </div>

        {/* Step indicators */}
        <div className="flex items-center justify-between mb-3">
          {STEPS.map((s, i) => (
            <div key={s} className="flex flex-col items-center gap-1">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all"
                style={i < step ? { background: "#E91E8C", borderColor: "#E91E8C", color: "#fff" }
                  : i === step ? { background: "transparent", borderColor: "#E91E8C", color: "#E91E8C" }
                  : { background: "transparent", borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.3)" }}
              >
                {i < step ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span className="text-xs hidden sm:block" style={{ color: i === step ? "#F8A4C8" : "rgba(255,255,255,0.3)" }}>{s}</span>
            </div>
          ))}
        </div>
        <Progress value={progress} className="mb-8 h-1.5 bg-white/10" />

        {/* Card */}
        <div className="rounded-2xl border border-white/10 bg-white/20 backdrop-blur-md p-6 space-y-5">
          <h2 className="text-white font-bold text-lg flex items-center gap-2">
            {step === 0 && "👤 Personal Details"}
            {step === 1 && "🕌 Background"}
            {step === 2 && "💼 Career"}
            {step === 3 && <><Sparkles className="w-5 h-5" style={{ color: "#F8A4C8" }} /> Partner Preferences</>}
            {step === 4 && "📸 Add Photos"}
          </h2>

          {/* Step 0: Personal */}
          {step === 0 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Field label="Full Name" colSpan>
                  <Input value={form.fullName} onChange={(e) => set("fullName", e.target.value)} placeholder="Your full name" className="bg-white/20 border-white/20 text-white placeholder:text-white/40" />
                </Field>
                <Field label="Gender">
                  <Select value={form.gender} onValueChange={(v) => set("gender", v ?? "")}>
                    <SelectTrigger className="bg-white/20 border-white/20 text-white"><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent><SelectItem value="female">Female</SelectItem><SelectItem value="male">Male</SelectItem><SelectItem value="other">Other</SelectItem></SelectContent>
                  </Select>
                </Field>
                <Field label="Date of Birth">
                  <Input type="date" value={form.dob} onChange={(e) => set("dob", e.target.value)} className="bg-white/20 border-white/20 text-white" />
                </Field>
                <Field label="Height">
                  <Input value={form.height} onChange={(e) => set("height", e.target.value)} placeholder='e.g. 5&apos;4"' className="bg-white/20 border-white/20 text-white placeholder:text-white/40" />
                </Field>
                <Field label="Phone" colSpan>
                  <Input value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+91 XXXXX XXXXX" className="bg-white/20 border-white/20 text-white placeholder:text-white/40" />
                </Field>
                <Field label="City / Location" colSpan>
                  <Input value={form.location} onChange={(e) => set("location", e.target.value)} placeholder="e.g. Mumbai, Maharashtra" className="bg-white/20 border-white/20 text-white placeholder:text-white/40" />
                </Field>
              </div>
              <Field label="About Me">
                <Textarea value={form.about} onChange={(e) => set("about", e.target.value)} placeholder="Write a few lines about yourself..." rows={3} className="bg-white/20 border-white/20 text-white placeholder:text-white/40 resize-none" />
              </Field>
            </div>
          )}

          {/* Step 1: Background */}
          {step === 1 && (
            <div className="grid grid-cols-2 gap-4">
              <Field label="Religion" colSpan>
                <Select value={form.religion} onValueChange={(v) => set("religion", v ?? "")}>
                  <SelectTrigger className="bg-white/20 border-white/20 text-white"><SelectValue placeholder="Select religion" /></SelectTrigger>
                  <SelectContent>{RELIGIONS.map((r) => <SelectItem key={r} value={r.toLowerCase()}>{r}</SelectItem>)}</SelectContent>
                </Select>
              </Field>
              <Field label="Caste / Community" colSpan>
                <Input value={form.caste} onChange={(e) => set("caste", e.target.value)} placeholder="e.g. Brahmin, Kshatriya..." className="bg-white/20 border-white/20 text-white placeholder:text-white/40" />
              </Field>
              <Field label="Highest Education" colSpan>
                <Select value={form.education} onValueChange={(v) => set("education", v ?? "")}>
                  <SelectTrigger className="bg-white/20 border-white/20 text-white"><SelectValue placeholder="Select education" /></SelectTrigger>
                  <SelectContent>{EDUCATIONS.map((e) => <SelectItem key={e} value={e.toLowerCase()}>{e}</SelectItem>)}</SelectContent>
                </Select>
              </Field>
              <Field label="College / University" colSpan>
                <Input value={form.college} onChange={(e) => set("college", e.target.value)} placeholder="Name of institution" className="bg-white/20 border-white/20 text-white placeholder:text-white/40" />
              </Field>
            </div>
          )}

          {/* Step 2: Career */}
          {step === 2 && (
            <div className="grid grid-cols-2 gap-4">
              <Field label="Profession" colSpan>
                <Select value={form.profession} onValueChange={(v) => set("profession", v ?? "")}>
                  <SelectTrigger className="bg-white/20 border-white/20 text-white"><SelectValue placeholder="Select profession" /></SelectTrigger>
                  <SelectContent>{PROFESSIONS.map((p) => <SelectItem key={p} value={p.toLowerCase()}>{p}</SelectItem>)}</SelectContent>
                </Select>
              </Field>
              <Field label="Employer / Company" colSpan>
                <Input value={form.employer} onChange={(e) => set("employer", e.target.value)} placeholder="Company name" className="bg-white/20 border-white/20 text-white placeholder:text-white/40" />
              </Field>
              <Field label="Annual Income" colSpan>
                <Input value={form.income} onChange={(e) => set("income", e.target.value)} placeholder="e.g. ₹12 LPA" className="bg-white/20 border-white/20 text-white placeholder:text-white/40" />
              </Field>
            </div>
          )}

          {/* Step 3: Preferences */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Field label="Partner Age (Min)">
                  <Input type="number" value={form.partnerAgeMin} onChange={(e) => set("partnerAgeMin", e.target.value)} className="bg-white/20 border-white/20 text-white" />
                </Field>
                <Field label="Partner Age (Max)">
                  <Input type="number" value={form.partnerAgeMax} onChange={(e) => set("partnerAgeMax", e.target.value)} className="bg-white/20 border-white/20 text-white" />
                </Field>
                <Field label="Partner Religion" colSpan>
                  <Select value={form.partnerReligion} onValueChange={(v) => set("partnerReligion", v ?? "")}>
                    <SelectTrigger className="bg-white/20 border-white/20 text-white"><SelectValue placeholder="Any religion" /></SelectTrigger>
                    <SelectContent><SelectItem value="any">Any</SelectItem>{RELIGIONS.map((r) => <SelectItem key={r} value={r.toLowerCase()}>{r}</SelectItem>)}</SelectContent>
                  </Select>
                </Field>
                <Field label="Preferred Location" colSpan>
                  <Input value={form.partnerLocation} onChange={(e) => set("partnerLocation", e.target.value)} placeholder="e.g. Mumbai, Delhi or Any" className="bg-white/20 border-white/20 text-white placeholder:text-white/40" />
                </Field>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/10 p-3 flex items-start gap-3">
                <Sparkles className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#F8A4C8" }} />
                <p className="text-white/60 text-xs">Our AI will use your preferences to suggest highly compatible matches. You can update these anytime.</p>
              </div>
            </div>
          )}

          {/* Step 4: Photos */}
          {step === 4 && (
            <div className="space-y-4">
              <p className="text-white/60 text-sm">Add up to 4 photos. The first one will be your profile photo.</p>
              <div className="grid grid-cols-2 gap-4">
                {photos.map((photo, i) => (
                  <label key={i} className="relative aspect-square rounded-xl overflow-hidden border border-dashed border-white/20 bg-white/10 cursor-pointer hover:bg-white/20 transition flex flex-col items-center justify-center">
                    {photo ? (
                      <Image src={photo} alt={`Photo ${i + 1}`} fill className="object-cover" />
                    ) : (
                      <>
                        <Camera className="w-8 h-8 text-white/30 mb-2" />
                        <span className="text-white/30 text-xs">{i === 0 ? "Main Photo" : `Photo ${i + 1}`}</span>
                      </>
                    )}
                    {i === 0 && (
                      <div className="absolute bottom-0 left-0 right-0 text-center text-xs py-1 text-white font-medium" style={{ background: "#E91E8Ccc" }}>
                        Profile Photo
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const url = URL.createObjectURL(file);
                          setPhotos((prev) => prev.map((p, idx) => idx === i ? url : p));
                        }
                      }}
                    />
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3 pt-2">
            {step > 0 && (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
            )}
            <button
              onClick={handleNext}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full text-white text-sm font-semibold transition hover:opacity-90"
              style={{ background: "#E91E8C" }}
            >
              {isLast ? (
                <><Check className="w-4 h-4" /> Finish & Explore Matches</>
              ) : (
                <>Next <ChevronRight className="w-4 h-4" /></>
              )}
            </button>
          </div>
        </div>

        <p className="text-center text-white/30 text-xs mt-4">You can edit everything later from your profile settings</p>
      </div>
    </div>
  );
}

function Field({ label, children, colSpan }: { label: string; children: React.ReactNode; colSpan?: boolean }) {
  return (
    <div className={`space-y-1.5 ${colSpan ? "col-span-2" : ""}`}>
      <Label className="text-white/70 text-sm">{label}</Label>
      {children}
    </div>
  );
}
