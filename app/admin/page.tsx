"use client"

import { useState, useEffect, useCallback } from "react"
import {
    Plus,
    Trash2,
    Edit3,
    Upload,
    X,
    Video,
    Music,
    Dumbbell,
    Film,
    MapPin,
    LogOut,
    Loader2,
} from "lucide-react"

/* ── Types ── */

interface Course {
    id: string
    title: string
    lessons_count: string
    duration: string
    description: string
    image_url: string | null
    sort_order: number
}

interface SheetMusic {
    id: string
    title: string
    pages: number
    difficulty: string
    pdf_url: string | null
}

interface BonusMaterial {
    id: string
    title: string
    type: string
    description: string
    resource_url: string | null
}

interface BtsClip {
    id: string
    title: string
    description: string
    duration: string
    video_url: string | null
    thumbnail_url: string | null
}

interface TourDate {
    id: string
    date: string
    city: string
    venue: string
    status: string
}

type ContentItem = Course | SheetMusic | BonusMaterial | BtsClip | TourDate

/* ── Tab config ── */

const tabs = [
    { key: "courses", label: "Courses", icon: Video, table: "courses" },
    { key: "sheet_music", label: "Sheet Music", icon: Music, table: "sheet_music" },
    { key: "bonus", label: "Bonus", icon: Dumbbell, table: "bonus_material" },
    { key: "bts", label: "BTS", icon: Film, table: "bts_clips" },
    { key: "tour", label: "Tour", icon: MapPin, table: "tour_dates" },
] as const

/* ── Field configs per table ── */

interface FieldConfig {
    name: string
    label: string
    type: "text" | "number" | "textarea" | "select" | "file"
    options?: string[]
    accept?: string
    folder?: string
}

const fieldConfigs: Record<string, FieldConfig[]> = {
    courses: [
        { name: "title", label: "Title", type: "text" },
        { name: "lessons_count", label: "Lessons (e.g. 42 Lessons)", type: "text" },
        { name: "duration", label: "Duration (e.g. 12+ Hours)", type: "text" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "image_url", label: "Image", type: "file", accept: "image/*", folder: "course-images" },
        { name: "sort_order", label: "Sort Order", type: "number" },
    ],
    sheet_music: [
        { name: "title", label: "Title", type: "text" },
        { name: "pages", label: "Pages", type: "number" },
        { name: "difficulty", label: "Difficulty", type: "select", options: ["Beginner", "Intermediate", "Advanced"] },
        { name: "pdf_url", label: "PDF File", type: "file", accept: ".pdf", folder: "sheet-music" },
    ],
    bonus_material: [
        { name: "title", label: "Title", type: "text" },
        { name: "type", label: "Type", type: "select", options: ["Exercise Set", "Video Breakdown", "PDF Guide"] },
        { name: "description", label: "Description", type: "textarea" },
        { name: "resource_url", label: "Resource File / URL", type: "text" },
    ],
    bts_clips: [
        { name: "title", label: "Title", type: "text" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "duration", label: "Duration (e.g. 24 min)", type: "text" },
        { name: "video_url", label: "Video URL", type: "text" },
        { name: "thumbnail_url", label: "Thumbnail", type: "file", accept: "image/*", folder: "bts-thumbnails" },
    ],
    tour_dates: [
        { name: "date", label: "Date (e.g. Mar 15, 2026)", type: "text" },
        { name: "city", label: "City", type: "text" },
        { name: "venue", label: "Venue", type: "text" },
        { name: "status", label: "Status", type: "select", options: ["On Sale", "Sold Out", "Coming Soon"] },
    ],
}

/* ── Admin Login Gate ── */

function AdminLogin({ onLogin }: { onLogin: () => void }) {
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError("")

        const res = await fetch("/api/admin/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password }),
        })

        if (res.ok) {
            sessionStorage.setItem("admin_auth", "true")
            onLogin()
        } else {
            setError("Invalid admin password")
        }
        setLoading(false)
    }

    return (
        <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
            <div className="w-full max-w-sm px-6">
                <div className="border border-white/10 bg-white/[0.03] p-8">
                    <div className="text-center mb-8">
                        <p className="font-sans text-xs uppercase tracking-[0.3em] text-white/40 mb-3">
                            Admin Access
                        </p>
                        <h1 className="font-serif text-3xl tracking-tight">Content Manager</h1>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Admin password"
                            className="h-11 w-full border border-white/15 bg-white/5 px-4 text-sm text-white placeholder:text-white/25 outline-none focus:border-white/40 transition-colors font-sans"
                        />
                        {error && <p className="text-red-400 text-xs font-sans">{error}</p>}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-white text-black font-sans text-xs uppercase tracking-[0.2em] font-bold px-8 py-3.5 hover:bg-white/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {loading && <Loader2 className="size-3.5 animate-spin" />}
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        </main>
    )
}

/* ── Content Form Dialog ── */

function ContentFormDialog({
    table,
    item,
    onClose,
    onSaved,
}: {
    table: string
    item: ContentItem | null
    onClose: () => void
    onSaved: () => void
}) {
    const fields = fieldConfigs[table] || []
    const [formData, setFormData] = useState<Record<string, string | number>>(() => {
        if (item) {
            const data: Record<string, string | number> = {}
            for (const field of fields) {
                const val = (item as unknown as Record<string, unknown>)[field.name]
                data[field.name] = (val as string | number) ?? ""
            }
            return data
        }
        const defaults: Record<string, string | number> = {}
        for (const field of fields) {
            defaults[field.name] = field.type === "number" ? 0 : ""
        }
        return defaults
    })
    const [uploading, setUploading] = useState(false)
    const [saving, setSaving] = useState(false)

    async function handleFileUpload(field: FieldConfig, file: File) {
        setUploading(true)
        const fd = new FormData()
        fd.append("file", file)
        fd.append("folder", field.folder || "uploads")

        const res = await fetch("/api/upload", { method: "POST", body: fd })
        if (res.ok) {
            const { url } = await res.json()
            setFormData((prev) => ({ ...prev, [field.name]: url }))
        }
        setUploading(false)
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setSaving(true)

        const method = item ? "PUT" : "POST"
        const body = item ? { id: item.id, ...formData } : formData

        await fetch(`/api/content/${table}`, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        })

        setSaving(false)
        onSaved()
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div className="bg-[#0A0A0A] border border-white/10 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <h3 className="font-serif text-xl tracking-tight">
                        {item ? "Edit" : "Add New"} Item
                    </h3>
                    <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
                        <X className="size-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
                    {fields.map((field) => (
                        <div key={field.name} className="flex flex-col gap-1.5">
                            <label className="text-xs uppercase tracking-widest text-white/50 font-sans">
                                {field.label}
                            </label>

                            {field.type === "textarea" ? (
                                <textarea
                                    value={formData[field.name] as string}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, [field.name]: e.target.value }))
                                    }
                                    rows={3}
                                    className="w-full border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none focus:border-white/40 transition-colors font-sans resize-none"
                                />
                            ) : field.type === "select" ? (
                                <select
                                    value={formData[field.name] as string}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, [field.name]: e.target.value }))
                                    }
                                    className="h-11 w-full border border-white/15 bg-white/5 px-4 text-sm text-white outline-none focus:border-white/40 transition-colors font-sans"
                                >
                                    <option value="">Select...</option>
                                    {field.options?.map((opt) => (
                                        <option key={opt} value={opt}>
                                            {opt}
                                        </option>
                                    ))}
                                </select>
                            ) : field.type === "file" ? (
                                <div className="flex flex-col gap-2">
                                    {formData[field.name] && (
                                        <p className="text-xs text-white/40 font-sans break-all">
                                            {formData[field.name] as string}
                                        </p>
                                    )}
                                    <label className="flex items-center gap-2 cursor-pointer border border-white/15 bg-white/5 px-4 py-2.5 text-xs text-white/60 hover:text-white hover:border-white/30 transition-colors font-sans uppercase tracking-widest w-fit">
                                        <Upload className="size-3.5" />
                                        {uploading ? "Uploading..." : "Choose File"}
                                        <input
                                            type="file"
                                            accept={field.accept}
                                            className="hidden"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0]
                                                if (file) handleFileUpload(field, file)
                                            }}
                                        />
                                    </label>
                                </div>
                            ) : (
                                <input
                                    type={field.type}
                                    value={formData[field.name]}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            [field.name]:
                                                field.type === "number"
                                                    ? Number(e.target.value)
                                                    : e.target.value,
                                        }))
                                    }
                                    className="h-11 w-full border border-white/15 bg-white/5 px-4 text-sm text-white placeholder:text-white/25 outline-none focus:border-white/40 transition-colors font-sans"
                                />
                            )}
                        </div>
                    ))}

                    <button
                        type="submit"
                        disabled={saving || uploading}
                        className="mt-2 w-full bg-white text-black font-sans text-xs uppercase tracking-[0.2em] font-bold px-8 py-3.5 hover:bg-white/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {saving && <Loader2 className="size-3.5 animate-spin" />}
                        {item ? "Save Changes" : "Create"}
                    </button>
                </form>
            </div>
        </div>
    )
}

/* ── Admin Dashboard ── */

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
    const [activeTab, setActiveTab] = useState<string>(tabs[0].key)
    const [items, setItems] = useState<ContentItem[]>([])
    const [loading, setLoading] = useState(false)
    const [editingItem, setEditingItem] = useState<ContentItem | null>(null)
    const [showForm, setShowForm] = useState(false)

    const activeTabConfig = tabs.find((t) => t.key === activeTab)!
    const table = activeTabConfig.table

    const fetchItems = useCallback(async () => {
        setLoading(true)
        const res = await fetch(`/api/content/${table}`)
        if (res.ok) {
            const data = await res.json()
            setItems(data)
        }
        setLoading(false)
    }, [table])

    useEffect(() => {
        fetchItems()
    }, [fetchItems])

    async function handleDelete(id: string) {
        if (!confirm("Delete this item?")) return

        await fetch(`/api/content/${table}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        })

        fetchItems()
    }

    function handleEdit(item: ContentItem) {
        setEditingItem(item)
        setShowForm(true)
    }

    function handleAdd() {
        setEditingItem(null)
        setShowForm(true)
    }

    function handleFormClose() {
        setShowForm(false)
        setEditingItem(null)
    }

    function handleFormSaved() {
        setShowForm(false)
        setEditingItem(null)
        fetchItems()
    }

    function getItemTitle(item: ContentItem): string {
        if ("title" in item) return item.title
        if ("city" in item) return `${(item as TourDate).city} — ${(item as TourDate).venue}`
        return "Untitled"
    }

    function getItemSubtitle(item: ContentItem): string {
        if ("lessons_count" in item) return `${(item as Course).lessons_count} · ${(item as Course).duration}`
        if ("pages" in item) return `${(item as SheetMusic).pages} pages · ${(item as SheetMusic).difficulty}`
        if ("type" in item && "description" in item) return (item as BonusMaterial).type
        if ("duration" in item && "video_url" in item) return (item as BtsClip).duration
        if ("status" in item) return `${(item as TourDate).date} · ${(item as TourDate).status}`
        return ""
    }

    return (
        <main className="min-h-screen bg-[#050505] text-white">
            <div className="max-w-5xl mx-auto px-6 py-12">
                {/* Header */}
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <p className="font-sans text-xs uppercase tracking-[0.3em] text-white/40 mb-3">
                            Admin Panel
                        </p>
                        <h1 className="font-serif text-4xl tracking-tight">Content Manager</h1>
                    </div>
                    <button
                        onClick={onLogout}
                        className="flex items-center gap-2 text-white/40 hover:text-white font-sans text-xs uppercase tracking-widest transition-colors"
                    >
                        <LogOut className="size-3.5" />
                        Log Out
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap gap-0 border border-white/10 bg-white/[0.03] mb-8">
                    {tabs.map((tab) => {
                        const Icon = tab.icon
                        const isActive = activeTab === tab.key
                        return (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`flex items-center gap-2 px-5 py-3 text-xs uppercase tracking-widest font-sans transition-colors border-r border-white/10 last:border-r-0 ${isActive
                                    ? "bg-white text-black font-bold"
                                    : "text-white/60 hover:text-white hover:bg-white/[0.06]"
                                    }`}
                            >
                                <Icon className="size-4" />
                                {tab.label}
                            </button>
                        )
                    })}
                </div>

                {/* Add button */}
                <div className="flex items-center justify-between mb-6">
                    <p className="font-sans text-sm text-white/50">
                        {loading ? "Loading..." : `${items.length} item${items.length !== 1 ? "s" : ""}`}
                    </p>
                    <button
                        onClick={handleAdd}
                        className="flex items-center gap-2 bg-white text-black font-sans text-xs uppercase tracking-[0.15em] font-bold px-5 py-2.5 hover:bg-white/90 transition-colors"
                    >
                        <Plus className="size-3.5" />
                        Add New
                    </button>
                </div>

                {/* Item list */}
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="size-6 text-white/30 animate-spin" />
                    </div>
                ) : items.length === 0 ? (
                    <div className="border border-white/10 bg-white/[0.02] py-20 text-center">
                        <p className="text-white/30 font-sans text-sm">No items yet.</p>
                        <button
                            onClick={handleAdd}
                            className="mt-4 text-white/60 hover:text-white font-sans text-xs uppercase tracking-widest transition-colors"
                        >
                            + Add your first item
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col divide-y divide-white/[0.06] border border-white/10">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between px-6 py-4 hover:bg-white/[0.03] transition-colors"
                            >
                                <div className="min-w-0 flex-1">
                                    <p className="font-sans text-sm text-white truncate">
                                        {getItemTitle(item)}
                                    </p>
                                    <p className="font-sans text-xs text-white/40 mt-0.5">
                                        {getItemSubtitle(item)}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 shrink-0 ml-4">
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="p-2 text-white/40 hover:text-white transition-colors"
                                        title="Edit"
                                    >
                                        <Edit3 className="size-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="p-2 text-white/40 hover:text-red-400 transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 className="size-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Form dialog */}
                {showForm && (
                    <ContentFormDialog
                        table={table}
                        item={editingItem}
                        onClose={handleFormClose}
                        onSaved={handleFormSaved}
                    />
                )}
            </div>
        </main>
    )
}

/* ── Page ── */

export default function AdminPage() {
    const [authed, setAuthed] = useState(false)
    const [ready, setReady] = useState(false)

    useEffect(() => {
        const stored = sessionStorage.getItem("admin_auth")
        if (stored === "true") setAuthed(true)
        setReady(true)
    }, [])

    function handleLogout() {
        sessionStorage.removeItem("admin_auth")
        setAuthed(false)
    }

    if (!ready) return <main className="min-h-screen bg-[#050505]" />

    return authed ? (
        <AdminDashboard onLogout={handleLogout} />
    ) : (
        <AdminLogin onLogin={() => setAuthed(true)} />
    )
}
