"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Loader2, CheckCircle2 } from "lucide-react"

type Mode = "register" | "login"

export default function WelcomePage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const sessionId = searchParams.get("session_id")

    const [mode, setMode] = useState<Mode>("register")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        if (!sessionId) {
            router.push("/")
        }
    }, [sessionId, router])

    async function handleRegister(e: React.FormEvent) {
        e.preventDefault()
        setError("")

        if (password.length < 6) {
            setError("Password must be at least 6 characters")
            return
        }
        if (password !== confirm) {
            setError("Passwords do not match")
            return
        }

        setLoading(true)

        const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name,
                email: email.toLowerCase().trim(),
                password,
                session_id: sessionId,
            }),
        })

        const data = await res.json()
        if (!res.ok) {
            setError(data.error || "Registration failed")
            setLoading(false)
            return
        }

        sessionStorage.setItem("vault_user", JSON.stringify(data.user))
        setSuccess(true)
        setTimeout(() => router.push("/login"), 2000)
    }

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault()
        setError("")
        setLoading(true)

        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email.toLowerCase().trim(),
                password,
                session_id: sessionId,
            }),
        })

        const data = await res.json()
        if (!res.ok) {
            setError(data.error || "Login failed")
            setLoading(false)
            return
        }

        sessionStorage.setItem("vault_user", JSON.stringify(data.user))
        setSuccess(true)
        setTimeout(() => router.push("/login"), 2000)
    }

    if (!sessionId) {
        return <main className="min-h-screen bg-[#050505]" />
    }

    if (success) {
        return (
            <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
                <div className="text-center px-6">
                    <CheckCircle2 className="size-16 text-green-400 mx-auto mb-6" strokeWidth={1.5} />
                    <h1 className="font-serif text-4xl tracking-tight mb-3">Welcome to the Vault</h1>
                    <p className="font-sans text-white/50 text-sm">
                        {mode === "register"
                            ? "Your account has been created. Redirecting to your dashboard..."
                            : "Payment linked! Redirecting to your dashboard..."}
                    </p>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center py-16 px-6">
            <div className="w-full max-w-md">
                {/* Payment Confirmed Badge */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 font-sans text-[10px] uppercase tracking-[0.3em] px-4 py-1.5 mb-6">
                        <CheckCircle2 className="size-3" />
                        Payment Confirmed
                    </div>
                    <h1 className="font-serif text-3xl md:text-4xl tracking-tight mb-3">
                        {mode === "register" ? "Create Your Account" : "Link Your Account"}
                    </h1>
                    <p className="font-sans text-white/50 text-sm leading-relaxed">
                        {mode === "register"
                            ? "Set up your login to access the Lifetime Vault."
                            : "Sign in to link this purchase to your existing account."}
                    </p>
                </div>

                {/* Mode Toggle */}
                <div className="flex mb-6 border border-white/10">
                    <button
                        type="button"
                        onClick={() => { setMode("register"); setError("") }}
                        className={`flex-1 py-3 text-xs uppercase tracking-widest font-sans font-bold transition-colors ${mode === "register"
                                ? "bg-white text-black"
                                : "text-white/50 hover:text-white hover:bg-white/[0.06]"
                            }`}
                    >
                        New Account
                    </button>
                    <button
                        type="button"
                        onClick={() => { setMode("login"); setError("") }}
                        className={`flex-1 py-3 text-xs uppercase tracking-widest font-sans font-bold transition-colors ${mode === "login"
                                ? "bg-white text-black"
                                : "text-white/50 hover:text-white hover:bg-white/[0.06]"
                            }`}
                    >
                        Existing Account
                    </button>
                </div>

                {/* Form */}
                <div className="border border-white/10 bg-white/[0.03]">
                    {mode === "register" ? (
                        <form onSubmit={handleRegister} className="p-8 flex flex-col gap-5">
                            <Field label="Full Name">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Your full name"
                                    required
                                    className="h-12 w-full border border-white/15 bg-white/5 px-4 text-sm text-white placeholder:text-white/25 outline-none focus:border-white/40 transition-colors font-sans"
                                />
                            </Field>
                            <Field label="Email Address">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    required
                                    className="h-12 w-full border border-white/15 bg-white/5 px-4 text-sm text-white placeholder:text-white/25 outline-none focus:border-white/40 transition-colors font-sans"
                                />
                            </Field>
                            <Field label="Password">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="At least 6 characters"
                                    required
                                    className="h-12 w-full border border-white/15 bg-white/5 px-4 text-sm text-white placeholder:text-white/25 outline-none focus:border-white/40 transition-colors font-sans"
                                />
                            </Field>
                            <Field label="Confirm Password">
                                <input
                                    type="password"
                                    value={confirm}
                                    onChange={(e) => setConfirm(e.target.value)}
                                    placeholder="Re-enter password"
                                    required
                                    className="h-12 w-full border border-white/15 bg-white/5 px-4 text-sm text-white placeholder:text-white/25 outline-none focus:border-white/40 transition-colors font-sans"
                                />
                            </Field>

                            {error && <ErrorMessage message={error} />}

                            <SubmitButton loading={loading} text="Create My Account" loadingText="Creating Account..." />
                        </form>
                    ) : (
                        <form onSubmit={handleLogin} className="p-8 flex flex-col gap-5">
                            <Field label="Email Address">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    required
                                    className="h-12 w-full border border-white/15 bg-white/5 px-4 text-sm text-white placeholder:text-white/25 outline-none focus:border-white/40 transition-colors font-sans"
                                />
                            </Field>
                            <Field label="Password">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Your password"
                                    required
                                    className="h-12 w-full border border-white/15 bg-white/5 px-4 text-sm text-white placeholder:text-white/25 outline-none focus:border-white/40 transition-colors font-sans"
                                />
                            </Field>

                            {error && <ErrorMessage message={error} />}

                            <SubmitButton loading={loading} text="Sign In & Link Purchase" loadingText="Signing In..." />
                        </form>
                    )}
                </div>
            </div>
        </main>
    )
}

/* ── Shared sub-components ── */

function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase tracking-widest text-white/50 font-sans">
                {label}
            </label>
            {children}
        </div>
    )
}

function ErrorMessage({ message }: { message: string }) {
    return (
        <p className="text-red-400 text-xs font-sans bg-red-400/5 border border-red-400/10 px-4 py-2">
            {message}
        </p>
    )
}

function SubmitButton({ loading, text, loadingText }: { loading: boolean; text: string; loadingText: string }) {
    return (
        <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full bg-white text-black font-sans text-xs uppercase tracking-[0.2em] font-bold px-8 py-4 hover:bg-white/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
            {loading ? (
                <><Loader2 className="size-4 animate-spin" /> {loadingText}</>
            ) : (
                text
            )}
        </button>
    )
}
