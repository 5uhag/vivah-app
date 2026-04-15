import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle,
  MapPin,
  Heart,
  MessageCircle,
  Phone,
  ArrowLeft,
} from "lucide-react";

const profile = {
  id: "1",
  name: "Priya Sharma",
  age: 27,
  location: "Mumbai, Maharashtra",
  religion: "Hindu",
  caste: "Brahmin",
  profession: "Software Engineer",
  education: "B.Tech - Computer Science, IIT Bombay",
  employer: "Infosys Technologies",
  salary: "Rs 18 LPA",
  height: "5'4\"",
  about:
    "I am a fun-loving, career-oriented woman who values family deeply. I enjoy cooking, reading, and traveling. Looking for a kind, ambitious partner who respects both tradition and modernity.",
  fatherName: "Ramesh Sharma",
  fatherOccupation: "Retired Government Officer",
  motherName: "Sunita Sharma",
  motherOccupation: "Homemaker",
  siblings: "1 elder brother (married)",
  familyType: "Nuclear",
  familyValues: "Traditional with a modern outlook",
  profilePhoto: "https://images.unsplash.com/photo-1529626798458-92182e662485?auto=format&fit=crop&w=400&q=60",
  photos: [
    "https://images.unsplash.com/photo-1529626798458-92182e662485?auto=format&fit=crop&w=400&q=60",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=60",
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=60",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=60",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=60",
    "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=60",
  ],
  completionScore: 88,
  isVerified: true,
  isPremium: true,
};

export default function ProfilePage() {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1920&q=60"
          alt="Profile background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-pink-950/40" />
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-pink-950/40 backdrop-blur-md border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 flex items-center h-14 gap-3">
          <Link href="/" className="text-white/70 hover:text-white transition">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <span className="text-white font-semibold">Profile</span>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-8 w-full">
        {/* Profile Header Card */}
        <div className="rounded-2xl border border-white/10 bg-white/20 backdrop-blur-md p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            {/* Photo */}
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 shrink-0" style={{ borderColor: "#F8A4C8" }}>
              <Image
                src={profile.profilePhoto}
                alt={profile.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold text-white">{profile.name}</h1>
                {profile.isVerified && (
                  <CheckCircle className="w-5 h-5" style={{ color: "#F8A4C8" }} />
                )}
                {profile.isPremium && (
                  <Badge className="text-xs font-medium text-black" style={{ background: "#F8A4C8" }}>
                    Premium
                  </Badge>
                )}
              </div>
              <div className="text-white/70 text-sm mb-1">
                {profile.age} years - {profile.religion} - {profile.caste}
              </div>
              <div className="flex items-center gap-1 text-white/60 text-sm mb-4">
                <MapPin className="w-4 h-4" />
                {profile.location}
              </div>

              {/* Completion */}
              <div className="mb-2">
                <div className="flex justify-between text-xs text-white/60 mb-1">
                  <span>Profile Completion</span>
                  <span>{profile.completionScore}%</span>
                </div>
                <Progress value={profile.completionScore} className="h-2 bg-white/20" />
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 sm:shrink-0 w-full sm:w-auto">
              <button
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-white font-medium transition hover:opacity-90"
                style={{ background: "#E91E8C" }}
              >
                <Heart className="w-4 h-4" />
                Send Interest
              </button>
              <button
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-white font-medium transition hover:opacity-90"
                style={{ background: "#E91E8C" }}
              >
                <MessageCircle className="w-4 h-4" />
                Chat
              </button>
              <button
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-white font-medium transition hover:opacity-90"
                style={{ background: "#E91E8C" }}
              >
                <Phone className="w-4 h-4" />
                View Contact
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="rounded-2xl border border-white/10 bg-white/20 backdrop-blur-md p-6 mb-6">
          <Tabs defaultValue="personal">
            <TabsList className="bg-white/20 border border-white/10 mb-6 backdrop-blur-md">
              <TabsTrigger value="personal" className="text-white data-[state=active]:bg-[#E91E8C] data-[state=active]:text-white">Personal</TabsTrigger>
              <TabsTrigger value="education" className="text-white data-[state=active]:bg-[#E91E8C] data-[state=active]:text-white">Education</TabsTrigger>
              <TabsTrigger value="job" className="text-white data-[state=active]:bg-[#E91E8C] data-[state=active]:text-white">Job</TabsTrigger>
              <TabsTrigger value="family" className="text-white data-[state=active]:bg-[#E91E8C] data-[state=active]:text-white">Family</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4">
              <Row label="About" value={profile.about} wide />
              <Row label="Height" value={profile.height} />
              <Row label="Religion" value={profile.religion} />
              <Row label="Caste" value={profile.caste} />
              <Row label="Location" value={profile.location} />
            </TabsContent>

            <TabsContent value="education" className="space-y-4">
              <Row label="Highest Education" value={profile.education} />
              <Row label="College / University" value="IIT Bombay" />
              <Row label="Graduation Year" value="2019" />
            </TabsContent>

            <TabsContent value="job" className="space-y-4">
              <Row label="Profession" value={profile.profession} />
              <Row label="Employer" value={profile.employer} />
              <Row label="Annual Income" value={profile.salary} />
            </TabsContent>

            <TabsContent value="family" className="space-y-4">
              <Row label="Father" value={`${profile.fatherName} - ${profile.fatherOccupation}`} />
              <Row label="Mother" value={`${profile.motherName} - ${profile.motherOccupation}`} />
              <Row label="Siblings" value={profile.siblings} />
              <Row label="Family Type" value={profile.familyType} />
              <Row label="Family Values" value={profile.familyValues} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Photo Grid */}
        <div className="rounded-2xl border border-white/10 bg-white/20 backdrop-blur-md p-6">
          <h2 className="text-white font-semibold text-lg mb-4">Photos</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {profile.photos.map((src, i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden">
                <Image src={src} alt={`Photo ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, wide }: { label: string; value: string; wide?: boolean }) {
  return (
    <div className={`flex ${wide ? "flex-col gap-1" : "flex-row gap-4"}`}>
      <div className="text-white/50 text-sm shrink-0 w-40">{label}</div>
      <div className="text-white text-sm">{value}</div>
    </div>
  );
}
