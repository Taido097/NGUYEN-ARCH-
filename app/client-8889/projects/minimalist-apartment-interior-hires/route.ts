import part1 from "../../../nguyen-commercial-building.svg/chunks/part1"
import part2 from "../../../nguyen-commercial-building.svg/chunks/part2"
import part3 from "../../../nguyen-commercial-building.svg/chunks/part3"
import part4 from "../../../nguyen-commercial-building.svg/chunks/part4"
import part5 from "../../../nguyen-commercial-building.svg/chunks/part5"
import part6 from "../../../nguyen-commercial-building.svg/chunks/part6"
import part7 from "../../../nguyen-commercial-building.svg/chunks/part7"
import part8 from "../../../nguyen-commercial-building.svg/chunks/part8"
import part9 from "../../../nguyen-commercial-building.svg/chunks/part9"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET() {
  const data = Buffer.from(part1 + part2 + part3 + part4 + part5 + part6 + part7 + part8 + part9, "base64")
  return new Response(data, {
    headers: {
      "Content-Type": "image/webp",
      "Content-Length": String(data.length),
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  })
}
