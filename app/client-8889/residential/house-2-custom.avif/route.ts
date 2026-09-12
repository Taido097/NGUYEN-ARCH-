import { createHash } from "node:crypto"
import chunk0 from "../../../../lib/client8889-house2-avif/chunk0"
import chunk1 from "../../../../lib/client8889-house2-avif/chunk1"
import chunk2 from "../../../../lib/client8889-house2-avif/chunk2"
import chunk3 from "../../../../lib/client8889-house2-avif/chunk3"
import chunk4 from "../../../../lib/client8889-house2-avif/chunk4"

export const dynamic = "force-static"

const EXPECTED_LENGTH = 20628
const EXPECTED_SHA256 = "aaa18508f3ea5a28203db6032c6ca2c7c4c9f7ba605030ce4e7d0a87e89f8cd5"
const image = Buffer.from([chunk0, chunk1, chunk2, chunk3, chunk4].join(""), "base64")
const digest = createHash("sha256").update(image).digest("hex")

if (image.byteLength !== EXPECTED_LENGTH || digest !== EXPECTED_SHA256) {
  throw new Error(`Custom Home image integrity check failed: ${image.byteLength} bytes / ${digest}`)
}

export async function GET() {
  return new Response(new Uint8Array(image), {
    status: 200,
    headers: {
      "Content-Type": "image/avif",
      "Content-Length": String(EXPECTED_LENGTH),
      "Cache-Control": "public, max-age=31536000, immutable",
      ETag: `\"${EXPECTED_SHA256}\"`,
      "X-Image-SHA256": EXPECTED_SHA256,
    },
  })
}
