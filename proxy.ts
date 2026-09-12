import { NextRequest, NextResponse } from "next/server"

const NGUYEN_CONCEPT01 = "/client-demos/client-8889/arcsphere"
const NGUYEN_CONCEPT04 = "/client-demos/client-8889/architectured"

// The single, current version of Concept 01. This is the same route the client
// demo index links to directly, so every entry point now resolves here.
//
// This used to be rewritten per device: mobile reached arcsphere-socal (the
// version under active development) while desktop was sent to
// arcsphere-targetfix — a branch that forked off at arcsphere-fixed and stopped
// receiving updates. Anyone opening the bare /arcsphere URL on desktop (a
// bookmark, a shared link, or a restored tab) therefore landed on a stale
// template instead of the current build. Serve one version to everyone.
const NGUYEN_CONCEPT01_CURRENT = "/client-demos/client-8889/arcsphere-socal"

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === NGUYEN_CONCEPT01) {
    const url = request.nextUrl.clone()
    url.pathname = NGUYEN_CONCEPT01_CURRENT
    return NextResponse.rewrite(url)
  }

  if (request.nextUrl.pathname === NGUYEN_CONCEPT04) {
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/client-demos/client-8889/arcsphere",
    "/client-demos/client-8889/architectured",
  ],
}
