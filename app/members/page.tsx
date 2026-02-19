"use client"

import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Play,
  Download,
  FileText,
  Video,
  Music,
  Dumbbell,
} from "lucide-react"

const courses = [
  {
    title: "The Complete Piano Course",
    lessons: "42 Lessons",
    duration: "12+ Hours",
    description:
      "Master romantic repertoire with Lionel's flagship system covering technique, interpretation, and performance.",
  },
  {
    title: "Sight-Reading Accelerator",
    lessons: "18 Lessons",
    duration: "5 Hours",
    description:
      "Build fluent sight-reading skills from scratch with progressive exercises and real repertoire.",
  },
  {
    title: "Music Theory Foundations",
    lessons: "24 Lessons",
    duration: "7 Hours",
    description:
      "Understand harmony, chord progressions, and form. Essential knowledge for any serious pianist.",
  },
]

const sheetMusic = [
  { title: "Chopin - Ballade No. 1 in G Minor", pages: 14, difficulty: "Advanced" },
  { title: "Debussy - Clair de Lune", pages: 6, difficulty: "Intermediate" },
  { title: "Liszt - La Campanella", pages: 12, difficulty: "Advanced" },
  { title: "Bach - Prelude in C Major", pages: 3, difficulty: "Beginner" },
  { title: "Rachmaninoff - Prelude in C# Minor", pages: 8, difficulty: "Advanced" },
  { title: "Satie - Gymnop\u00e9die No. 1", pages: 4, difficulty: "Beginner" },
  { title: "Beethoven - Moonlight Sonata Mvt. 1", pages: 5, difficulty: "Intermediate" },
  { title: "Lionel Yu - Original: Stillwater", pages: 6, difficulty: "Intermediate" },
]

const bonusMaterial = [
  {
    title: "Daily Warm-Up Routine",
    type: "Exercise Set",
    description: "A 15-minute daily routine covering scales, arpeggios, and finger independence drills.",
  },
  {
    title: "Advanced Trill Technique",
    type: "Video Breakdown",
    description: "In-depth tutorial on achieving even, rapid trills across all fingers.",
  },
  {
    title: "Pedalling Masterclass",
    type: "Video Breakdown",
    description: "Learn legato, half, and flutter pedalling techniques for expressive playing.",
  },
  {
    title: "Octave Endurance Exercises",
    type: "Exercise Set",
    description: "Progressive exercises to build stamina and accuracy in octave passages.",
  },
  {
    title: "Voicing in Chordal Textures",
    type: "Video Breakdown",
    description: "How to bring out inner melodies and shape chords for musical phrasing.",
  },
  {
    title: "Performance Anxiety Guide",
    type: "PDF Guide",
    description: "Practical strategies and mental frameworks for confident stage performance.",
  },
]

export default function MembersPage() {
  const { isLoggedIn, isReady } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isReady && !isLoggedIn) {
      router.push("/")
    }
  }, [isLoggedIn, isReady, router])

  if (!isReady || !isLoggedIn) {
    return null
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-12">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-white/50 mb-3">
            Welcome back
          </p>
          <h1 className="font-serif text-4xl lg:text-5xl tracking-tight leading-none">
            Your Lifetime Vault
          </h1>
        </div>

        <Tabs defaultValue="courses">
          <TabsList className="bg-white/5 border border-white/10 rounded-none h-11 w-full sm:w-auto">
            <TabsTrigger
              value="courses"
              className="rounded-none text-white/60 data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:border-transparent"
            >
              <Video className="size-4" />
              Courses
            </TabsTrigger>
            <TabsTrigger
              value="sheet-music"
              className="rounded-none text-white/60 data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:border-transparent"
            >
              <Music className="size-4" />
              Sheet Music
            </TabsTrigger>
            <TabsTrigger
              value="bonus"
              className="rounded-none text-white/60 data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:border-transparent"
            >
              <Dumbbell className="size-4" />
              Bonus Material
            </TabsTrigger>
          </TabsList>

          {/* Courses Tab */}
          <TabsContent value="courses" className="mt-8">
            <div className="flex flex-col gap-6">
              {courses.map((course) => (
                <div
                  key={course.title}
                  className="border border-white/10 bg-white/5 p-6 lg:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:bg-white/[0.08] transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-serif text-2xl tracking-tight mb-2">
                      {course.title}
                    </h3>
                    <p className="font-sans text-white/50 text-sm leading-relaxed max-w-lg">
                      {course.description}
                    </p>
                    <div className="flex gap-4 mt-3">
                      <span className="text-xs uppercase tracking-widest text-white/40 font-sans">
                        {course.lessons}
                      </span>
                      <span className="text-xs uppercase tracking-widest text-white/40 font-sans">
                        {course.duration}
                      </span>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 bg-white text-black font-sans text-xs uppercase tracking-[0.2em] font-bold px-6 py-3 hover:bg-white/90 transition-colors shrink-0">
                    <Play className="size-3.5" />
                    Start Course
                  </button>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Sheet Music Tab */}
          <TabsContent value="sheet-music" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sheetMusic.map((piece) => (
                <div
                  key={piece.title}
                  className="border border-white/10 bg-white/5 p-5 flex items-start justify-between gap-4 hover:bg-white/[0.08] transition-colors"
                >
                  <div className="flex gap-3 min-w-0">
                    <FileText
                      className="size-5 text-white/40 shrink-0 mt-0.5"
                      strokeWidth={1.5}
                    />
                    <div className="min-w-0">
                      <h3 className="font-sans text-sm text-white truncate">
                        {piece.title}
                      </h3>
                      <div className="flex gap-3 mt-1">
                        <span className="text-xs text-white/40 font-sans">
                          {piece.pages} pages
                        </span>
                        <span
                          className={`text-xs font-sans ${
                            piece.difficulty === "Advanced"
                              ? "text-white/70"
                              : piece.difficulty === "Intermediate"
                                ? "text-white/50"
                                : "text-white/35"
                          }`}
                        >
                          {piece.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="flex items-center gap-1.5 text-white/60 hover:text-white text-xs font-sans uppercase tracking-widest transition-colors shrink-0 border border-white/15 px-3 py-1.5 hover:border-white/30">
                    <Download className="size-3" />
                    PDF
                  </button>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Bonus Material Tab */}
          <TabsContent value="bonus" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {bonusMaterial.map((item) => (
                <div
                  key={item.title}
                  className="border border-white/10 bg-white/5 p-6 flex flex-col hover:bg-white/[0.08] transition-colors"
                >
                  <span className="text-[10px] uppercase tracking-widest text-white/40 font-sans mb-3">
                    {item.type}
                  </span>
                  <h3 className="font-serif text-lg tracking-tight mb-2">
                    {item.title}
                  </h3>
                  <p className="font-sans text-white/50 text-sm leading-relaxed flex-1">
                    {item.description}
                  </p>
                  <button className="mt-4 flex items-center gap-2 text-white/70 hover:text-white text-xs font-sans uppercase tracking-widest transition-colors self-start border border-white/15 px-3 py-1.5 hover:border-white/30">
                    Access
                  </button>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
