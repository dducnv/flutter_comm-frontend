import { appApi } from "@/untils/configs/app_api_config";
import { NextResponse, NextRequest } from "next/server";
const POST_API_URL = process.env.API_URL + "/api/v1/tags";
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const keyword = searchParams.get("q") || "";
  const res = await appApi.get(`${POST_API_URL}?q=${keyword}`);
  const tags = await res.json();
  return NextResponse.json(tags);
}
