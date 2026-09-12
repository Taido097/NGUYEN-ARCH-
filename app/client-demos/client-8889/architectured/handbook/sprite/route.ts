import { HBZ01 } from "../exact2/hbz01"
import { HBZ02 } from "../exact2/hbz02"
import { HBZ03 } from "../exact2/hbz03"
import { HBZ04 } from "../exact2/hbz04"
import { HBZ05 } from "../exact2/hbz05"
import { HBZ06 } from "../exact2/hbz06"
import { HBZ07 } from "../exact2/hbz07"
import { HBZ08 } from "../exact2/hbz08"
import { HBZ09 } from "../exact2/hbz09"
import { HBZ10 } from "../exact2/hbz10"
import { HBZ11 } from "../exact2/hbz11"
import { HBZ12 } from "../exact2/hbz12"
import { HBZ13 } from "../exact2/hbz13"

export const dynamic = "force-dynamic"
export const revalidate = 0
export const runtime = "nodejs"

const EXPECTED_BYTES = 96030

export async function GET() {
  const base64 =
    HBZ01 + HBZ02 + HBZ03 + HBZ04 + HBZ05 + HBZ06 + HBZ07 +
    HBZ08 + HBZ09 + HBZ10 + HBZ11 + HBZ12 + HBZ13

  const bytes = Buffer.from(base64, "base64")
  const riff = bytes.subarray(0, 4).toString("ascii")
  const webp = bytes.subarray(8, 12).toString("ascii")

  if (bytes.length !== EXPECTED_BYTES || riff !== "RIFF" || webp !== "WEBP") {
    return new Response("Invalid or incomplete handbook image payload", {
      status: 500,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Handbook-Bytes": String(bytes.length),
        "X-Handbook-Expected-Bytes": String(EXPECTED_BYTES),
        "X-Handbook-Signature": `${riff}/${webp}`,
      },
    })
  }

  return new Response(bytes, {
    status: 200,
    headers: {
      "Content-Type": "image/webp",
      "Content-Length": String(bytes.length),
      "Cache-Control": "no-store, max-age=0, must-revalidate",
      "X-Handbook-Bytes": String(bytes.length),
      "X-Handbook-Expected-Bytes": String(EXPECTED_BYTES),
      "X-Handbook-Signature": "RIFF/WEBP",
    },
  })
}
