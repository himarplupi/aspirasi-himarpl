import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { applyCors } from "@/lib/cors";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(request: NextRequest) {
  try {
    // Generate token dengan expiry 10 menit
    const token = jwt.sign(
      {
        type: "aspiration-form",
        timestamp: Date.now(),
      },
      JWT_SECRET,
      { expiresIn: "10m" }
    );

    return applyCors(
      NextResponse.json(
        {
          success: true,
          token,
        },
        { status: 200 }
      )
    );
  } catch (error) {
    console.error("Error generating token:", error);
    return applyCors(
      NextResponse.json(
        {
          success: false,
          error: "Gagal generate token",
        },
        { status: 500 }
      )
    );
  }
}
