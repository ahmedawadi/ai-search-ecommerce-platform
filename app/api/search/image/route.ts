import { type NextRequest, NextResponse } from "next/server"
import { apiWithFallback } from "@/services/api-with-fallback"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const { data, error } = await apiWithFallback.searchByImage(formData)

    if (error) {
      return NextResponse.json({ error }, { status: 500 })
    }

    return NextResponse.json({
      products: data || [],
    })
  } catch (error) {
    console.error("Error in image search route:", error)
    return NextResponse.json({ error: "Failed to search by image" }, { status: 500 })
  }
}
