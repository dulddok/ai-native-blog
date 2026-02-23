import { NextRequest, NextResponse } from 'next/server'

// In-memory store (resets on server restart — swap with a DB for production)
const likesStore: Record<string, number> = {}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const count = likesStore[slug] ?? 0
  return NextResponse.json({ slug, likes: count })
}

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  likesStore[slug] = (likesStore[slug] ?? 0) + 1
  return NextResponse.json({ slug, likes: likesStore[slug] })
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  if (likesStore[slug] && likesStore[slug] > 0) {
    likesStore[slug] -= 1
  }
  return NextResponse.json({ slug, likes: likesStore[slug] ?? 0 })
}
