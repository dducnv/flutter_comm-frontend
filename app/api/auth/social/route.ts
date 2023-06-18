import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const token = searchParams.get("token");

  const backUrl = cookies().get("backUrl"); //get redirect url from cookie
  const response = NextResponse.redirect(`${backUrl?.value}` || "/", {
    status: 302,
  });
  if (token === null) {
    return response;
  }

  const d = new Date(Date.now());
  if (token === null) return response;
  response.cookies.set("access_token", `${token}`, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: true,
    expires: new Date(d.valueOf() + 1000 * 60 * 60 * 24 * 7), //Long type
  });
  return response;
}
