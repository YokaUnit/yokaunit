import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
})

export async function GET(request: NextRequest, { params }: { params: { sessionId: string } }) {
  try {
    const session = await stripe.checkout.sessions.retrieve(params.sessionId)
    return NextResponse.json(session)
  } catch (error) {
    console.error("Error retrieving session:", error)
    return NextResponse.json({ error: "Session not found" }, { status: 404 })
  }
}
