import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase"

export async function POST(request: Request) {
    const formData = await request.formData()
    const file = formData.get("file") as File | null
    const folder = (formData.get("folder") as string) || "uploads"

    if (!file) {
        return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    const admin = createAdminClient()
    const ext = file.name.split(".").pop()
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const { error } = await admin.storage
        .from("vault-files")
        .upload(fileName, buffer, {
            contentType: file.type,
            upsert: false,
        })

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const { data: urlData } = admin.storage
        .from("vault-files")
        .getPublicUrl(fileName)

    return NextResponse.json({ url: urlData.publicUrl }, { status: 201 })
}
