export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET(request: Request) {
  const url = new URL(request.url)
  const location = new URL("/client-8889/projects/card-3-office.webp?v=fixed-20260828", url.origin)

  return new Response(null, {
    status: 307,
    headers: {
      Location: location.toString(),
      "Cache-Control": "no-store, max-age=0",
    },
  })
}
