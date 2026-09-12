import part1 from "./chunks/part1"
import part2a from "./chunks/part2a"
import part2b from "./chunks/part2b"
import part2c from "./chunks/part2c"
import part3 from "./chunks/part3"
import part4a from "./chunks/part4a"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET() {
  const base64 = part1 + part2a + part2b + part2c + part3 + part4a
  const bytes = Buffer.from(base64, "base64")

  return new Response(bytes, {
    status: 200,
    headers: {
      "Content-Type": "image/avif",
      "Content-Length": String(bytes.byteLength),
      "Cache-Control": "no-store, max-age=0",
    },
  })
}
