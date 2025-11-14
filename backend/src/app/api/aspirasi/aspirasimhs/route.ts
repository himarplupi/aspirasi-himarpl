import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(request: NextRequest) {
  try {
    // Validasi token dari header
    const aspirationToken = request.headers.get("X-Aspiration-Token");

    if (!aspirationToken) {
      return applyCors(
        NextResponse.json(
          {
            success: false,
            error: "Token tidak ditemukan",
          },
          { status: 401 }
        )
      );
    }

    // Verifikasi token
    try {
      const decoded = jwt.verify(aspirationToken, JWT_SECRET) as {
        type: string;
        timestamp: number;
      };

      if (decoded.type !== "aspiration-form") {
        return applyCors(
          NextResponse.json(
            {
              success: false,
              error: "Token tidak valid",
            },
            { status: 401 }
          )
        );
      }
    } catch (error) {
      return applyCors(
        NextResponse.json(
          {
            success: false,
            error: "Token expired atau tidak valid",
          },
          { status: 401 }
        )
      );
    }

    // Terapkan rate limit
    const rateLimitResponse = await applyPostAspirasiRateLimit(request);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    const body = await request.json();

    // Verifikasi reCAPTCHA token
    const recaptchaToken = body.recaptchaToken;

    if (!recaptchaToken) {
      return applyCors(
        NextResponse.json(
          {
            success: false,
            error: "reCAPTCHA token tidak ditemukan",
          },
          { status: 400 }
        )
      );
    }

    // ...existing code untuk verifikasi reCAPTCHA dan insert data...
  } catch (error) {
    console.error("Error in POST aspirasi:", error);
    return applyCors(
      NextResponse.json(
        {
          success: false,
          error: "Terjadi kesalahan server",
          details: error instanceof Error ? error.message : "Unknown error",
        },
        { status: 500 }
      )
    );
  }
}
