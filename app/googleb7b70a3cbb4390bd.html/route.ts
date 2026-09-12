export async function GET() {
  return new Response(
    'google-site-verification: googleb7b70a3cbb4390bd.html',
    {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=300',
      },
    }
  )
}
