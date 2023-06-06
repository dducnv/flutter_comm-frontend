import { NextResponse, NextRequest } from "next/server";
import { appApi } from "@/untils/configs/app_api_config";
const USER_INFO_API_URL = process.env.API_URL + "/api/v1/me";
export async function GET() {
  const res = await appApi.get(USER_INFO_API_URL, {
    revalidate: 60,
  });
  if (res) {
    const user = await res.json();
    return NextResponse.json(user);
  }
}
