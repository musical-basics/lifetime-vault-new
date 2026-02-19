import { NextResponse } from "next/server"
import Stripe from "stripe"
import bcrypt from "bcryptjs"
import { createAdminClient } from "@/lib/supabase"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-01-28.clover",
})

export async function POST(request: Request) {
    const { name, email, password, session_id } = await request.json()

    // Validate fields
    if (!name || !email || !password || !session_id) {
        return NextResponse.json(
            { error: "All fields are required" },
            { status: 400 }
        )
    }

    // Verify Stripe payment
    try {
        const session = await stripe.checkout.sessions.retrieve(session_id)
        if (session.payment_status !== "paid") {
            return NextResponse.json(
                { error: "Payment not completed" },
                { status: 402 }
            )
        }
    } catch {
        return NextResponse.json(
            { error: "Invalid checkout session" },
            { status: 400 }
        )
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 12)

    // Insert user
    const admin = createAdminClient()
    const { data, error } = await admin
        .from("users")
        .insert({ name, email, password_hash, stripe_session_id: session_id })
        .select("id, name, email")
        .single()

    if (error) {
        if (error.code === "23505") {
            return NextResponse.json(
                { error: "An account with this email already exists" },
                { status: 409 }
            )
        }
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ user: data }, { status: 201 })
}
