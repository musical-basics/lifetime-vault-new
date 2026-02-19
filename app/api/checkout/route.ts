import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-01-28.clover",
})

export async function POST(request: Request) {
    const { origin } = new URL(request.url)

    try {
        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "MusicalBasics Lifetime Vault Membership",
                            description:
                                "Lifetime access to every course, sheet music piece, and future release. One-time payment.",
                        },
                        unit_amount: 14700, // $147.00 in cents
                    },
                    quantity: 1,
                },
            ],
            success_url: `${origin}/welcome?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/#pricing`,
        })

        return NextResponse.json({ url: session.url })
    } catch (err) {
        const message = err instanceof Error ? err.message : "Checkout failed"
        return NextResponse.json({ error: message }, { status: 500 })
    }
}
