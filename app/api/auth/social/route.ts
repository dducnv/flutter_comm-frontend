import { NextResponse, NextRequest } from "next/server";
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get("token");
  const response = NextResponse.redirect(request.nextUrl.origin);
  const d = new Date(Date.now());
  response.cookies.set("access_token", `${token}`, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: true,
    expires: new Date(d.valueOf() + 1000 * 60 * 60 * 24 * 7), //Long type
  });
  return response;
}
