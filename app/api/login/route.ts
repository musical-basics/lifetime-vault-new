import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { createAdminClient } from "@/lib/supabase"

export async function POST(request: Request) {
    const { email, password, session_id } = await request.json()

    if (!email || !password) {
        return NextResponse.json(
            { error: "Email and password are required" },
            { status: 400 }
        )
    }

    const admin = createAdminClient()
    const { data: user, error } = await admin
        .from("users")
        .select("id, name, email, password_hash")
        .eq("email", email.toLowerCase().trim())
        .single()

    if (error || !user) {
        return NextResponse.json(
            { error: "Invalid email or password" },
            { status: 401 }
        )
    }

    const valid = await bcrypt.compare(password, user.password_hash)
    if (!valid) {
        return NextResponse.json(
            { error: "Invalid email or password" },
            { status: 401 }
        )
    }

    // If a Stripe session_id was passed (from /welcome), link it to the user
    if (session_id) {
        await admin
            .from("users")
            .update({ stripe_session_id: session_id })
            .eq("id", user.id)
    }

    return NextResponse.json({
        user: { id: user.id, name: user.name, email: user.email },
    })
}
