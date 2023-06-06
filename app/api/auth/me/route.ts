import { NextResponse, NextRequest } from "next/server";
import { appApi } from "@/untils/configs/app_api_config";
const USER_INFO_API_URL = "/me";
export async function GET() {
  const res = await appApi.get(USER_INFO_API_URL);
  if (res) {
    const user = await res.json();
    return NextResponse.json(user);
  }
}
