import { NextResponse } from "next/server";
export async function DELETE() {
  const response = NextResponse.json(
    { success: true },
    { status: 200, headers: { "content-type": "application/json" } }
  );
  response.cookies.delete("access_token");
  return response;
}
