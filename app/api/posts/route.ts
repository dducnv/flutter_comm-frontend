import { appApi } from "@/untils/configs/app_api_config";
import { NextResponse, NextRequest } from "next/server";
const POST_API_URL = "/posts";
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page") || 1;
  const type = searchParams.get("type") || "posts";
  const sort = searchParams.get("sort") || "all";
  const tags = searchParams.get("tags") || "";
  const res = await appApi.get(
    `${POST_API_URL}?page=${page}&type=${type}&sort=${sort} ${
      tags ? `&tags=${tags}` : ""
    }`
  );

  const posts = await res.json();
  return NextResponse.json(posts);
}
