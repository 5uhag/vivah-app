"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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
import { ArrowLeft, Camera, Save, X } from "lucide-react";

const RELIGIONS = ["Hindu", "Muslim", "Christian", "Sikh", "Buddhist", "Jain", "Other"];
const EDUCATIONS = ["10th", "12th", "Diploma", "B.A.", "B.Com", "B.Sc.", "B.Tech", "M.A.", "M.Tech", "MBA", "PhD", "Other"];
const PROFESSIONS = ["Software Engineer", "Doctor", "Teacher", "Lawyer", "Business", "Government Job", "Self Employed", "Other"];

const PHOTO_SLOTS = 6;

export default function EditProfilePage() {
  const [completionScore] = useState(72);
  const [photos, setPhotos] = useState<(string | null)[]>(Array(PHOTO_SLOTS).fill(null));

  const handlePhotoRemove = (i: number) => {
    setPhotos((prev) => prev.map((p, idx) => (idx === i ? null : p)));
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background */}
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

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-pink-950/40 backdrop-blur-md border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-white/70 hover:text-white transition">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <span className="text-white font-semibold">Edit Profile</span>
          </div>

          {/* Completion Widget */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-xs text-white/50">Profile Completion</span>
              <span className="text-sm font-bold" style={{ color: "#F8A4C8" }}>
                {completionScore}%
              </span>
            </div>
            <div className="w-24 hidden sm:block">
              <Progress value={completionScore} className="h-2 bg-white/20" />
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8 w-full">
        {/* Mobile Completion */}
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
                  <Input placeholder="Enter full name" className="bg-white/20 border-white/20 text-white placeholder:text-white/40" />
                </Field>
                <Field label="Date of Birth">
                  <Input type="date" className="bg-white/20 border-white/20 text-white" />
                </Field>
                <Field label="Gender">
                  <Select>
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
                  <Input placeholder="+91 XXXXX XXXXX" className="bg-white/20 border-white/20 text-white placeholder:text-white/40" />
                </Field>
                <Field label="Location">
                  <Input placeholder="City, State" className="bg-white/20 border-white/20 text-white placeholder:text-white/40" />
                </Field>
                <Field label="Religion">
                  <Select>
                    <SelectTrigger className="bg-white/20 border-white/20 text-white">
                      <SelectValue placeholder="Select religion" />
                    </SelectTrigger>
                    <SelectContent>
                      {RELIGIONS.map((r) => <SelectItem key={r} value={r.toLowerCase()}>{r}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Caste">
                  <Input placeholder="Enter caste" className="bg-white/20 border-white/20 text-white placeholder:text-white/40" />
                </Field>
                <Field label="Height">
                  <Input placeholder='e.g. 5&apos;8"' className="bg-white/20 border-white/20 text-white placeholder:text-white/40" />
                </Field>
              </div>
              <Field label="About Me">
                <Textarea
                  placeholder="Write something about yourself..."
                  rows={4}
                  className="bg-white/20 border-white/20 text-white placeholder:text-white/40 resize-none"
                />
              </Field>
              <SaveButton />
            </TabsContent>

            {/* Education Tab */}
            <TabsContent value="education" className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Highest Education">
                  <Select>
                    <SelectTrigger className="bg-white/20 border-white/20 text-white">
                      <SelectValue placeholder="Select education" />
                    </SelectTrigger>
                    <SelectContent>
                      {EDUCATIONS.map((e) => <SelectItem key={e} value={e.toLowerCase()}>{e}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="College / University">
                  <Input placeholder="College or university name" className="bg-white/20 border-white/20 text-white placeholder:text-white/40" />
                </Field>
                <Field label="Graduation Year">
                  <Input type="number" placeholder="e.g. 2020" className="bg-white/20 border-white/20 text-white placeholder:text-white/40" />
                </Field>
                <Field label="Field of Study">
                  <Input placeholder="e.g. Computer Science" className="bg-white/20 border-white/20 text-white placeholder:text-white/40" />
                </Field>
              </div>
              <SaveButton />
            </TabsContent>

            {/* Job Tab */}
            <TabsContent value="job" className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Profession">
                  <Select>
                    <SelectTrigger className="bg-white/20 border-white/20 text-white">
                      <SelectValue placeholder="Select profession" />
                    </SelectTrigger>
                    <SelectContent>
                      {PROFESSIONS.map((p) => <SelectItem key={p} value={p.toLowerCase()}>{p}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Employer / Company">
                  <Input placeholder="Company name" className="bg-white/20 border-white/20 text-white placeholder:text-white/40" />
                </Field>
                <Field label="Job Title">
                  <Input placeholder="e.g. Senior Engineer" className="bg-white/20 border-white/20 text-white placeholder:text-white/40" />
                </Field>
                <Field label="Annual Income">
                  <Input placeholder="e.g. Rs 12 LPA" className="bg-white/20 border-white/20 text-white placeholder:text-white/40" />
                </Field>
                <Field label="Work Location">
                  <Input placeholder="City where you work" className="bg-white/20 border-white/20 text-white placeholder:text-white/40" />
                </Field>
              </div>
              <SaveButton />
            </TabsContent>

            {/* Family Tab */}
            <TabsContent value="family" className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Father's Name">
                  <Input placeholder="Father's full name" className="bg-white/20 border-white/20 text-white placeholder:text-white/40" />
                </Field>
                <Field label="Father's Occupation">
                  <Input placeholder="e.g. Business" className="bg-white/20 border-white/20 text-white placeholder:text-white/40" />
                </Field>
                <Field label="Mother's Name">
                  <Input placeholder="Mother's full name" className="bg-white/20 border-white/20 text-white placeholder:text-white/40" />
                </Field>
                <Field label="Mother's Occupation">
                  <Input placeholder="e.g. Homemaker" className="bg-white/20 border-white/20 text-white placeholder:text-white/40" />
                </Field>
                <Field label="Siblings">
                  <Input placeholder="e.g. 1 brother, 1 sister" className="bg-white/20 border-white/20 text-white placeholder:text-white/40" />
                </Field>
                <Field label="Family Type">
                  <Select>
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
                  <Select>
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
              <SaveButton />
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
              <SaveButton />
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

function SaveButton() {
  return (
    <div className="pt-2">
      <button
        className="flex items-center gap-2 px-6 py-2.5 rounded-full text-white font-medium transition hover:opacity-90"
        style={{ background: "#E91E8C" }}
      >
        <Save className="w-4 h-4" />
        Save Changes
      </button>
    </div>
  );
}

