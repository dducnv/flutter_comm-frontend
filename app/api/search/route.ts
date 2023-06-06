import { appApi } from "@/untils/configs/app_api_config";
import { NextRequest, NextResponse } from "next/server";
const SEARCH_API_URL = "/search";
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const keyword = searchParams.get("q");
  const page = searchParams.get("page");
  const res = await appApi.get(
    SEARCH_API_URL + "?q=" + keyword + "&page=" + page
  );
  const result = await res.json();
  return NextResponse.json(result);
}
