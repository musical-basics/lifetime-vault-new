import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase"
import { supabase } from "@/lib/supabase"

const ALLOWED_TABLES = [
    "courses",
    "sheet_music",
    "bonus_material",
    "bts_clips",
    "tour_dates",
] as const

type TableName = (typeof ALLOWED_TABLES)[number]

function isAllowedTable(table: string): table is TableName {
    return ALLOWED_TABLES.includes(table as TableName)
}

// GET — public read
export async function GET(
    _request: Request,
    { params }: { params: Promise<{ table: string }> }
) {
    const { table } = await params

    if (!isAllowedTable(table)) {
        return NextResponse.json({ error: "Invalid table" }, { status: 400 })
    }

    const orderCol = table === "courses" ? "sort_order" : "created_at"
    const { data, error } = await supabase
        .from(table)
        .select("*")
        .order(orderCol, { ascending: true })

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
}

// POST — admin create
export async function POST(
    request: Request,
    { params }: { params: Promise<{ table: string }> }
) {
    const { table } = await params

    if (!isAllowedTable(table)) {
        return NextResponse.json({ error: "Invalid table" }, { status: 400 })
    }

    const body = await request.json()
    const admin = createAdminClient()

    const { data, error } = await admin.from(table).insert(body).select().single()

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data, { status: 201 })
}

// PUT — admin update
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ table: string }> }
) {
    const { table } = await params

    if (!isAllowedTable(table)) {
        return NextResponse.json({ error: "Invalid table" }, { status: 400 })
    }

    const { id, ...updates } = await request.json()

    if (!id) {
        return NextResponse.json({ error: "Missing id" }, { status: 400 })
    }

    const admin = createAdminClient()
    const { data, error } = await admin
        .from(table)
        .update(updates)
        .eq("id", id)
        .select()
        .single()

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
}

// DELETE — admin delete
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ table: string }> }
) {
    const { table } = await params

    if (!isAllowedTable(table)) {
        return NextResponse.json({ error: "Invalid table" }, { status: 400 })
    }

    const { id } = await request.json()

    if (!id) {
        return NextResponse.json({ error: "Missing id" }, { status: 400 })
    }

    const admin = createAdminClient()
    const { error } = await admin.from(table).delete().eq("id", id)

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
}
