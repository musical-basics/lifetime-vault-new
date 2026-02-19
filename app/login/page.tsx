"use client"

import { useState, useEffect, useCallback } from "react"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Play,
  Download,
  FileText,
  Video,
  Music,
  Dumbbell,
  Film,
  MapPin,
  Calendar,
  BookOpen,
  LogOut,
  ChevronRight,
} from "lucide-react"

/* ── Fallback Data (used when Supabase is empty or unconfigured) ── */

const fallbackCourses = [
  {
    id: "f1", title: "The Complete Piano Course", lessons_count: "42 Lessons",
    duration: "12+ Hours", description: "Master romantic repertoire with Lionel's flagship system covering technique, interpretation, and performance.",
    image_url: "/images/piano-hands-bw.jpg", sort_order: 0,
  },
  {
    id: "f2", title: "Sight-Reading Accelerator", lessons_count: "18 Lessons",
    duration: "5 Hours", description: "Build fluent sight-reading skills from scratch with progressive exercises and real repertoire.",
    image_url: "/images/sheet-music-piano.jpg", sort_order: 1,
  },
  {
    id: "f3", title: "Music Theory Foundations", lessons_count: "24 Lessons",
    duration: "7 Hours", description: "Understand harmony, chord progressions, and form. Essential knowledge for any serious pianist.",
    image_url: "/images/early-days.jpg", sort_order: 2,
  },
]

const fallbackSheetMusic = [
  { id: "s1", title: "Chopin - Ballade No. 1 in G Minor", pages: 14, difficulty: "Advanced", pdf_url: null as string | null },
  { id: "s2", title: "Debussy - Clair de Lune", pages: 6, difficulty: "Intermediate", pdf_url: null as string | null },
  { id: "s3", title: "Liszt - La Campanella", pages: 12, difficulty: "Advanced", pdf_url: null as string | null },
  { id: "s4", title: "Bach - Prelude in C Major", pages: 3, difficulty: "Beginner", pdf_url: null as string | null },
  { id: "s5", title: "Rachmaninoff - Prelude in C# Minor", pages: 8, difficulty: "Advanced", pdf_url: null as string | null },
  { id: "s6", title: "Satie - Gymnop\u00e9die No. 1", pages: 4, difficulty: "Beginner", pdf_url: null as string | null },
  { id: "s7", title: "Beethoven - Moonlight Sonata Mvt. 1", pages: 5, difficulty: "Intermediate", pdf_url: null as string | null },
  { id: "s8", title: "Lionel Yu - Original: Stillwater", pages: 6, difficulty: "Intermediate", pdf_url: null as string | null },
]

const fallbackBonusMaterial = [
  { id: "b1", title: "Daily Warm-Up Routine", type: "Exercise Set", description: "A 15-minute daily routine covering scales, arpeggios, and finger independence drills." },
  { id: "b2", title: "Advanced Trill Technique", type: "Video Breakdown", description: "In-depth tutorial on achieving even, rapid trills across all fingers." },
  { id: "b3", title: "Pedalling Masterclass", type: "Video Breakdown", description: "Learn legato, half, and flutter pedalling techniques for expressive playing." },
  { id: "b4", title: "Octave Endurance Exercises", type: "Exercise Set", description: "Progressive exercises to build stamina and accuracy in octave passages." },
  { id: "b5", title: "Voicing in Chordal Textures", type: "Video Breakdown", description: "How to bring out inner melodies and shape chords for musical phrasing." },
  { id: "b6", title: "Performance Anxiety Guide", type: "PDF Guide", description: "Practical strategies and mental frameworks for confident stage performance." },
]

const fallbackBehindTheScenes = [
  { id: "bts1", title: "Recording Session: Chopin Ballade No. 1", description: "A raw, unedited look at the recording process behind the flagship course.", duration: "24 min" },
  { id: "bts2", title: "Studio Tour", description: "Walk through the home studio setup, gear choices, and acoustic treatment.", duration: "18 min" },
  { id: "bts3", title: "Rehearsal: Liszt La Campanella", description: "Watch the full rehearsal process from sight-reading to performance-ready.", duration: "32 min" },
  { id: "bts4", title: "DreamPlay One: Prototype Testing", description: "Behind-the-scenes footage of testing the custom-sized keyboard prototype.", duration: "15 min" },
]

const fallbackTourDates = [
  { id: "t1", date: "Mar 15, 2026", city: "Los Angeles", venue: "The Wiltern", status: "On Sale" },
  { id: "t2", date: "Mar 22, 2026", city: "San Francisco", venue: "Davies Symphony Hall", status: "On Sale" },
  { id: "t3", date: "Apr 5, 2026", city: "New York", venue: "Carnegie Hall", status: "Sold Out" },
  { id: "t4", date: "Apr 12, 2026", city: "Chicago", venue: "Orchestra Hall", status: "On Sale" },
  { id: "t5", date: "Apr 26, 2026", city: "London", venue: "Wigmore Hall", status: "Coming Soon" },
  { id: "t6", date: "May 10, 2026", city: "Tokyo", venue: "Suntory Hall", status: "Coming Soon" },
]

/* ── Hook to fetch content with fallback ── */

function useContent<T>(table: string, fallback: T[]): { data: T[]; loading: boolean } {
  const [data, setData] = useState<T[]>(fallback)
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(`/api/content/${table}`)
      if (res.ok) {
        const items = await res.json()
        if (Array.isArray(items) && items.length > 0) {
          setData(items)
        }
      }
    } catch {
      // Supabase not configured, use fallbacks
    } finally {
      setLoading(false)
    }
  }, [table])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading }
}

/* ── Login Form ── */

function LoginForm() {
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    const err = await login(email, password)
    if (err) {
      setError(err)
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/early-days.jpg"
          alt=""
          fill
          className="object-cover opacity-30 grayscale"
          priority
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-[#050505]/60" />
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto px-6">
        <div className="border border-white/10 bg-[#050505]/90 backdrop-blur-sm p-8 lg:p-10">
          <div className="text-center mb-8">
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-white/40 mb-4">
              The Lifetime Vault
            </p>
            <h1 className="font-serif text-3xl lg:text-4xl tracking-tight leading-none">
              Welcome Back
            </h1>
            <p className="font-sans text-sm text-white/50 mt-3">
              Sign in to access your courses, sheet music, and exclusive content.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="login-email"
                className="text-xs uppercase tracking-widest text-white/50 font-sans"
              >
                Email
              </label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="h-11 w-full rounded-none border border-white/15 bg-white/5 px-4 text-sm text-white placeholder:text-white/25 outline-none focus:border-white/40 transition-colors font-sans"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="login-password"
                className="text-xs uppercase tracking-widest text-white/50 font-sans"
              >
                Password
              </label>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                required
                className="h-11 w-full rounded-none border border-white/15 bg-white/5 px-4 text-sm text-white placeholder:text-white/25 outline-none focus:border-white/40 transition-colors font-sans"
              />
            </div>

            {error && (
              <p className="text-red-400 text-xs font-sans bg-red-400/5 border border-red-400/10 px-4 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full bg-white text-black font-sans text-xs uppercase tracking-[0.2em] font-bold px-8 py-3.5 rounded-none hover:bg-white/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-xs text-white/30 font-sans mt-6">
            Don&apos;t have an account?{" "}
            <a href="/#pricing" className="text-white/60 hover:text-white underline transition-colors">
              Get the Lifetime Vault
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}

/* ── Progress Bar ── */

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-3 w-full">
      <div className="flex-1 h-1 bg-white/10 overflow-hidden">
        <div
          className="h-full bg-white transition-all duration-500"
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-xs text-white/50 font-sans tabular-nums w-9 text-right">
        {value}%
      </span>
    </div>
  )
}

/* ── Stats Card ── */

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: string
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <div className="border border-white/10 bg-white/[0.03] p-5 flex items-start gap-4">
      <div className="flex items-center justify-center size-10 border border-white/10 shrink-0">
        <Icon className="size-4 text-white/50" />
      </div>
      <div>
        <p className="font-serif text-2xl tracking-tight leading-none">{value}</p>
        <p className="text-xs uppercase tracking-widest text-white/40 font-sans mt-1.5">
          {label}
        </p>
      </div>
    </div>
  )
}

/* ── Dashboard ── */

function Dashboard() {
  const { logout, user } = useAuth()
  const router = useRouter()

  const { data: courses } = useContent("courses", fallbackCourses)
  const { data: sheetMusic } = useContent("sheet_music", fallbackSheetMusic)
  const { data: bonusMaterial } = useContent("bonus_material", fallbackBonusMaterial)
  const { data: behindTheScenes } = useContent("bts_clips", fallbackBehindTheScenes)
  const { data: tourDates } = useContent("tour_dates", fallbackTourDates)

  function handleLogout() {
    logout()
    router.push("/")
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <div className="max-w-6xl mx-auto px-6 py-12 lg:py-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-white/40 mb-3">
              {user?.name ? `Welcome, ${user.name}` : "Your Dashboard"}
            </p>
            <h1 className="font-serif text-4xl lg:text-5xl tracking-tight leading-none">
              The Lifetime Vault
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-white/40 hover:text-white font-sans text-xs uppercase tracking-widest transition-colors self-start sm:self-auto"
          >
            <LogOut className="size-3.5" />
            Log Out
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <StatCard
            label="Total Courses"
            value={`${courses.length}`}
            icon={BookOpen}
          />
          <StatCard
            label="Pieces Available"
            value={`${sheetMusic.length}`}
            icon={Music}
          />
          <StatCard
            label="Bonus Resources"
            value={`${bonusMaterial.length}`}
            icon={Dumbbell}
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="courses">
          <TabsList className="bg-white/5 border border-white/10 rounded-none h-11 w-full sm:w-auto flex-wrap">
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
              Bonus
            </TabsTrigger>
            <TabsTrigger
              value="behind-the-scenes"
              className="rounded-none text-white/60 data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:border-transparent"
            >
              <Film className="size-4" />
              BTS
            </TabsTrigger>
            <TabsTrigger
              value="tour"
              className="rounded-none text-white/60 data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:border-transparent"
            >
              <MapPin className="size-4" />
              Tour
            </TabsTrigger>
          </TabsList>

          {/* ── Courses ── */}
          <TabsContent value="courses" className="mt-8">
            <div className="flex flex-col gap-4">
              {courses.map((course, index) => (
                <div
                  key={course.id || course.title}
                  className="border border-white/10 bg-white/[0.03] overflow-hidden hover:bg-white/[0.06] transition-colors group"
                >
                  <div className="flex flex-col lg:flex-row">
                    {/* Image */}
                    {(course.image_url) && (
                      <div className="relative w-full lg:w-56 aspect-video lg:aspect-auto shrink-0 overflow-hidden">
                        <Image
                          src={course.image_url}
                          alt={course.title}
                          fill
                          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                          {...(index === 0 ? { priority: true, loading: "eager" as const } : {})}
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 p-6 lg:p-8 flex flex-col justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-serif text-xl lg:text-2xl tracking-tight">
                            {course.title}
                          </h3>
                        </div>
                        <p className="font-sans text-white/50 text-sm leading-relaxed max-w-lg">
                          {course.description}
                        </p>
                        <div className="flex gap-4 mt-3">
                          <span className="text-xs uppercase tracking-widest text-white/40 font-sans">
                            {course.lessons_count}
                          </span>
                          <span className="text-xs uppercase tracking-widest text-white/40 font-sans">
                            {course.duration}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 bg-white text-black font-sans text-xs uppercase tracking-[0.15em] font-bold px-5 py-2.5 hover:bg-white/90 transition-colors shrink-0">
                          <Play className="size-3" />
                          Start Course
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* ── Sheet Music ── */}
          <TabsContent value="sheet-music" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sheetMusic.map((piece) => (
                <div
                  key={piece.id || piece.title}
                  className="border border-white/10 bg-white/[0.03] p-5 flex items-start justify-between gap-4 hover:bg-white/[0.06] transition-colors"
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
                          className={`text-xs font-sans ${piece.difficulty === "Advanced"
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
                  {piece.pdf_url ? (
                    <a
                      href={piece.pdf_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-white/60 hover:text-white text-xs font-sans uppercase tracking-widest transition-colors shrink-0 border border-white/15 px-3 py-1.5 hover:border-white/30"
                    >
                      <Download className="size-3" />
                      PDF
                    </a>
                  ) : (
                    <button className="flex items-center gap-1.5 text-white/60 hover:text-white text-xs font-sans uppercase tracking-widest transition-colors shrink-0 border border-white/15 px-3 py-1.5 hover:border-white/30">
                      <Download className="size-3" />
                      PDF
                    </button>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>

          {/* ── Bonus Material ── */}
          <TabsContent value="bonus" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {bonusMaterial.map((item) => (
                <div
                  key={item.id || item.title}
                  className="border border-white/10 bg-white/[0.03] p-6 flex flex-col hover:bg-white/[0.06] transition-colors"
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

          {/* ── Behind the Scenes ── */}
          <TabsContent value="behind-the-scenes" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {behindTheScenes.map((clip) => (
                <div
                  key={clip.id || clip.title}
                  className="border border-white/10 bg-white/[0.03] p-6 flex flex-col hover:bg-white/[0.06] transition-colors group"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <Film className="size-5 text-white/30 shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span className="text-xs text-white/40 font-sans shrink-0">{clip.duration}</span>
                  </div>
                  <h3 className="font-serif text-lg tracking-tight mb-2">
                    {clip.title}
                  </h3>
                  <p className="font-sans text-white/50 text-sm leading-relaxed flex-1">
                    {clip.description}
                  </p>
                  <button className="mt-4 flex items-center gap-2 text-white/70 hover:text-white text-xs font-sans uppercase tracking-widest transition-colors self-start border border-white/15 px-3 py-1.5 hover:border-white/30 group-hover:border-white/30 group-hover:text-white">
                    <Play className="size-3" />
                    Watch
                  </button>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* ── Concert Tour ── */}
          <TabsContent value="tour" className="mt-8">
            <div className="flex flex-col divide-y divide-white/10 border-t border-b border-white/10">
              {tourDates.map((show) => (
                <div
                  key={show.id || `${show.date}-${show.city}`}
                  className="flex flex-col sm:flex-row sm:items-center justify-between py-5 gap-3"
                >
                  <div className="flex items-center gap-3 text-white/70 font-sans text-sm">
                    <Calendar className="size-4 shrink-0 text-white/40" strokeWidth={1.5} />
                    <span className="w-28">{show.date}</span>
                  </div>

                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <MapPin className="size-4 shrink-0 text-white/40" strokeWidth={1.5} />
                    <span className="font-sans text-white">{show.city}</span>
                    <span className="text-white/40 font-sans text-sm truncate">
                      {show.venue}
                    </span>
                  </div>

                  <span
                    className={`text-xs uppercase tracking-widest font-sans px-3 py-1 border shrink-0 ${show.status === "Sold Out"
                      ? "border-white/10 text-white/30"
                      : show.status === "Coming Soon"
                        ? "border-white/15 text-white/50"
                        : "border-white/30 text-white"
                      }`}
                  >
                    {show.status}
                  </span>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

/* ── Page ── */

export default function LoginPage() {
  const { isLoggedIn, isReady } = useAuth()

  if (!isReady) {
    return (
      <main className="min-h-screen bg-[#050505]" />
    )
  }

  return isLoggedIn ? <Dashboard /> : <LoginForm />
}
