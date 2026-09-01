import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (process.env.MAINTENANCE_MODE !== "true") {
    return NextResponse.next();
  }

  const response = NextResponse.rewrite(new URL("/maintenance", request.url));
  response.headers.set("X-Robots-Tag", "noindex");
  response.headers.set("Cache-Control", "no-store");
  return response;
}

export const config = {
  matcher: [
    // Everything except the maintenance page itself, Next internals, and any
    // request for a file with an extension (images, logo, favicon).
    "/((?!maintenance|_next/static|_next/image|.*\\.).*)",
  ],
};
