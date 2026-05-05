"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useUser, useAuth } from "@clerk/nextjs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Camera, Save, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import { createAuthClient } from "@/lib/supabase-auth";

const RELIGIONS = ["Hindu", "Muslim", "Christian", "Sikh", "Buddhist", "Jain", "Other"];
const EDUCATIONS = ["10th", "12th", "Diploma", "B.A.", "B.Com", "B.Sc.", "B.Tech", "M.A.", "M.Tech", "MBA", "PhD", "Other"];
const PROFESSIONS = ["Software Engineer", "Doctor", "Teacher", "Lawyer", "Business", "Government Job", "Self Employed", "Other"];

const PHOTO_SLOTS = 6;

export default function EditProfilePage() {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [completionScore, setCompletionScore] = useState(0);
  const [photos, setPhotos] = useState<(string | null)[]>(Array(PHOTO_SLOTS).fill(null));

  const [form, setForm] = useState({
    fullName: "", gender: "", dob: "", phone: "", location: "",
    religion: "", caste: "", height: "", about: "",
    education: "", college: "", gradYear: "", fieldOfStudy: "",
    profession: "", employer: "", jobTitle: "", income: "", workLocation: "",
    fatherName: "", fatherOccupation: "", motherName: "", motherOccupation: "",
    siblings: "", familyType: "", familyValues: "",
  });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  useEffect(() => {
    if (!user?.id) return;
    (async () => {
      const token = await getToken({ template: "supabase" });
      if (!token) { setLoading(false); return; }
      const client = createAuthClient(token);
      const { data } = await client
        .from("profiles")
        .select("full_name, gender, dob, phone, location, religion, caste, profession, education, about, photos, completion_score")
        .eq("clerk_id", user.id)
        .single();
      if (data) {
        setForm((f) => ({
          ...f,
          fullName: data.full_name ?? "",
          gender: data.gender ?? "",
          dob: data.dob ?? "",
          phone: data.phone ?? "",
          location: data.location ?? "",
          religion: data.religion ?? "",
          caste: data.caste ?? "",
          profession: data.profession ?? "",
          education: data.education ?? "",
          about: data.about ?? "",
        }));
        setCompletionScore(data.completion_score ?? 0);
        if (data.photos?.length) {
          setPhotos([
            ...data.photos.slice(0, PHOTO_SLOTS),
            ...Array(Math.max(0, PHOTO_SLOTS - data.photos.length)).fill(null),
          ]);
        }
      }
      setLoading(false);
    })();
  }, [user?.id, getToken]);

  const handleSave = async () => {
    if (!user?.id || saving) return;
    setSaving(true);
    const token = await getToken({ template: "supabase" });
    if (!token) { setSaving(false); return; }
    const client = createAuthClient(token);
    const filledFields = [form.fullName, form.gender, form.dob, form.phone, form.location, form.religion, form.caste, form.profession, form.education, form.about].filter(Boolean).length;
    const score = Math.round((filledFields / 10) * 90 + (photos.some(Boolean) ? 10 : 0));
    const { error } = await client.from("profiles").update({
      full_name: form.fullName || null,
      gender: form.gender || null,
      dob: form.dob || null,
      phone: form.phone || null,
      location: form.location || null,
      religion: form.religion || null,
      caste: form.caste || null,
      profession: form.profession || null,
      education: form.education || null,
      about: form.about || null,
      completion_score: score,
    }).eq("clerk_id", user.id);
    setSaving(false);
    if (!error) {
      setCompletionScore(score);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const handlePhotoRemove = (i: number) => {
    setPhotos((prev) => prev.map((p, idx) => (idx === i ? null : p)));
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="fixed inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1920&q=60"
          alt="Edit profile background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-pink-950/40" />
      </div>

      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8 w-full">
        <div className="sm:hidden mb-6 rounded-xl border border-white/10 bg-white/20 backdrop-blur-md p-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-white/60">Profile Completion</span>
            <span className="font-bold" style={{ color: "#F8A4C8" }}>{completionScore}%</span>
          </div>
          <Progress value={completionScore} className="h-2 bg-white/20" />
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/20 backdrop-blur-md p-6">
          <Tabs defaultValue="personal">
            <TabsList className="flex flex-wrap h-auto gap-1 bg-white/20 border border-white/10 mb-8 p-1">
              {["personal", "education", "job", "family", "photos"].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="capitalize text-white data-[state=active]:text-white rounded-md"
                  style={{ ["--tw-data-active-bg" as string]: "#E91E8C" }}
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Personal Tab */}
            <TabsContent value="personal" className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Full Name">
                  <Input value={form.fullName} onChange={(e) => set("fullName", e.target.value)} disabled={loading} placeholder="Enter full name" className="bg-white/20 border-white/20 text-white placeholder:text-white/40 disabled:opacity-50" />
                </Field>
                <Field label="Date of Birth">
                  <Input type="date" value={form.dob} onChange={(e) => set("dob", e.target.value)} disabled={loading} className="bg-white/20 border-white/20 text-white disabled:opacity-50" />
                </Field>
                <Field label="Gender">
                  <Select value={form.gender} onValueChange={(v) => set("gender", v ?? "")}>
                    <SelectTrigger className="bg-white/20 border-white/20 text-white">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Phone">
                  <Input value={form.phone} onChange={(e) => set("phone", e.target.value)} disabled={loading} placeholder="+91 XXXXX XXXXX" className="bg-white/20 border-white/20 text-white placeholder:text-white/40 disabled:opacity-50" />
                </Field>
                <Field label="Location">
                  <Input value={form.location} onChange={(e) => set("location", e.target.value)} disabled={loading} placeholder="City, State" className="bg-white/20 border-white/20 text-white placeholder:text-white/40 disabled:opacity-50" />
                </Field>
                <Field label="Religion">
                  <Select value={form.religion} onValueChange={(v) => set("religion", v ?? "")}>
                    <SelectTrigger className="bg-white/20 border-white/20 text-white">
                      <SelectValue placeholder="Select religion" />
                    </SelectTrigger>
                    <SelectContent>
                      {RELIGIONS.map((r) => <SelectItem key={r} value={r.toLowerCase()}>{r}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Caste">
                  <Input value={form.caste} onChange={(e) => set("caste", e.target.value)} disabled={loading} placeholder="Enter caste" className="bg-white/20 border-white/20 text-white placeholder:text-white/40 disabled:opacity-50" />
                </Field>
                <Field label="Height">
                  <Input value={form.height} onChange={(e) => set("height", e.target.value)} placeholder='e.g. 5&apos;8"' className="bg-white/20 border-white/20 text-white placeholder:text-white/40" />
                </Field>
              </div>
              <Field label="About Me">
                <Textarea value={form.about} onChange={(e) => set("about", e.target.value)} disabled={loading} placeholder="Write something about yourself..." rows={4} className="bg-white/20 border-white/20 text-white placeholder:text-white/40 resize-none disabled:opacity-50" />
              </Field>
              <SaveButton onClick={handleSave} saving={saving} saved={saved} />
            </TabsContent>

            {/* Education Tab */}
            <TabsContent value="education" className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Highest Education">
                  <Select value={form.education} onValueChange={(v) => set("education", v ?? "")}>
                    <SelectTrigger className="bg-white/20 border-white/20 text-white">
                      <SelectValue placeholder="Select education" />
                    </SelectTrigger>
                    <SelectContent>
                      {EDUCATIONS.map((e) => <SelectItem key={e} value={e.toLowerCase()}>{e}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="College / University">
                  <Input value={form.college} onChange={(e) => set("college", e.target.value)} placeholder="College or university name" className="bg-white/20 border-white/20 text-white placeholder:text-white/40" />
                </Field>
                <Field label="Graduation Year">
                  <Input type="number" value={form.gradYear} onChange={(e) => set("gradYear", e.target.value)} placeholder="e.g. 2020" className="bg-white/20 border-white/20 text-white placeholder:text-white/40" />
                </Field>
                <Field label="Field of Study">
                  <Input value={form.fieldOfStudy} onChange={(e) => set("fieldOfStudy", e.target.value)} placeholder="e.g. Computer Science" className="bg-white/20 border-white/20 text-white placeholder:text-white/40" />
                </Field>
              </div>
              <SaveButton onClick={handleSave} saving={saving} saved={saved} />
            </TabsContent>

            {/* Job Tab */}
            <TabsContent value="job" className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Profession">
                  <Select value={form.profession} onValueChange={(v) => set("profession", v ?? "")}>
                    <SelectTrigger className="bg-white/20 border-white/20 text-white">
                      <SelectValue placeholder="Select profession" />
                    </SelectTrigger>
                    <SelectContent>
                      {PROFESSIONS.map((p) => <SelectItem key={p} value={p.toLowerCase()}>{p}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Employer / Company">
                  <Input value={form.employer} onChange={(e) => set("employer", e.target.value)} placeholder="Company name" className="bg-white/20 border-white/20 text-white placeholder:text-white/40" />
                </Field>
                <Field label="Job Title">
                  <Input value={form.jobTitle} onChange={(e) => set("jobTitle", e.target.value)} placeholder="e.g. Senior Engineer" className="bg-white/20 border-white/20 text-white placeholder:text-white/40" />
                </Field>
                <Field label="Annual Income">
                  <Input value={form.income} onChange={(e) => set("income", e.target.value)} placeholder="e.g. Rs 12 LPA" className="bg-white/20 border-white/20 text-white placeholder:text-white/40" />
                </Field>
                <Field label="Work Location">
                  <Input value={form.workLocation} onChange={(e) => set("workLocation", e.target.value)} placeholder="City where you work" className="bg-white/20 border-white/20 text-white placeholder:text-white/40" />
                </Field>
              </div>
              <SaveButton onClick={handleSave} saving={saving} saved={saved} />
            </TabsContent>

            {/* Family Tab */}
            <TabsContent value="family" className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Father's Name">
                  <Input value={form.fatherName} onChange={(e) => set("fatherName", e.target.value)} placeholder="Father's full name" className="bg-white/20 border-white/20 text-white placeholder:text-white/40" />
                </Field>
                <Field label="Father's Occupation">
                  <Input value={form.fatherOccupation} onChange={(e) => set("fatherOccupation", e.target.value)} placeholder="e.g. Business" className="bg-white/20 border-white/20 text-white placeholder:text-white/40" />
                </Field>
                <Field label="Mother's Name">
                  <Input value={form.motherName} onChange={(e) => set("motherName", e.target.value)} placeholder="Mother's full name" className="bg-white/20 border-white/20 text-white placeholder:text-white/40" />
                </Field>
                <Field label="Mother's Occupation">
                  <Input value={form.motherOccupation} onChange={(e) => set("motherOccupation", e.target.value)} placeholder="e.g. Homemaker" className="bg-white/20 border-white/20 text-white placeholder:text-white/40" />
                </Field>
                <Field label="Siblings">
                  <Input value={form.siblings} onChange={(e) => set("siblings", e.target.value)} placeholder="e.g. 1 brother, 1 sister" className="bg-white/20 border-white/20 text-white placeholder:text-white/40" />
                </Field>
                <Field label="Family Type">
                  <Select value={form.familyType} onValueChange={(v) => set("familyType", v ?? "")}>
                    <SelectTrigger className="bg-white/20 border-white/20 text-white">
                      <SelectValue placeholder="Select family type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nuclear">Nuclear</SelectItem>
                      <SelectItem value="joint">Joint</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Family Values">
                  <Select value={form.familyValues} onValueChange={(v) => set("familyValues", v ?? "")}>
                    <SelectTrigger className="bg-white/20 border-white/20 text-white">
                      <SelectValue placeholder="Select values" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="traditional">Traditional</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="liberal">Liberal</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </div>
              <SaveButton onClick={handleSave} saving={saving} saved={saved} />
            </TabsContent>

            {/* Photos Tab */}
            <TabsContent value="photos">
              <p className="text-white/50 text-sm mb-6">Upload up to 6 photos. First photo will be your profile picture.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                {photos.map((photo, i) => (
                  <div
                    key={i}
                    className="relative aspect-square rounded-xl border border-white/20 bg-white/20 backdrop-blur-md overflow-hidden group"
                  >
                    {photo ? (
                      <>
                        <Image src={photo} alt={`Photo ${i + 1}`} fill className="object-cover" />
                        <button
                          onClick={() => handlePhotoRemove(i)}
                          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-pink-950/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer hover:bg-white/20 transition">
                        <Camera className="w-8 h-8 text-white/30 mb-2" />
                        <span className="text-xs text-white/30">
                          {i === 0 ? "Profile Photo" : `Photo ${i + 1}`}
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const url = URL.createObjectURL(file);
                              setPhotos((prev) => prev.map((p, idx) => (idx === i ? url : p)));
                            }
                          }}
                        />
                      </label>
                    )}
                    {i === 0 && (
                      <div
                        className="absolute bottom-0 left-0 right-0 text-center text-xs py-1 text-white font-medium"
                        style={{ background: "#E91E8Ccc" }}
                      >
                        Main Photo
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <SaveButton onClick={handleSave} saving={saving} saved={saved} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-white/70 text-sm">{label}</Label>
      {children}
    </div>
  );
}

function SaveButton({ onClick, saving, saved }: { onClick: () => void; saving: boolean; saved: boolean }) {
  return (
    <div className="pt-2">
      <button
        onClick={onClick}
        disabled={saving}
        className="flex items-center gap-2 px-6 py-2.5 rounded-full text-white font-medium transition hover:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed"
        style={{ background: saved ? "#22c55e" : "#E91E8C" }}
      >
        <Save className="w-4 h-4" />
        {saved ? "Saved ✓" : saving ? "Saving…" : "Save Changes"}
      </button>
    </div>
  );
}
