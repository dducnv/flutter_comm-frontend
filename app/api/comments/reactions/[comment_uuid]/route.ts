import { appApi } from "@/untils/configs/app_api_config";
import { NextRequest, NextResponse } from "next/server";
const COMMENT_API_URL = "/comments";
export async function POST(
  request: NextRequest,
  { params }: { params: { comment_uuid: string } }
) {
  const body = await request.json();
  const res = await appApi.post(
    COMMENT_API_URL + "/" + params.comment_uuid + "/reactions",
    body
  );
  const reactions = await res.json();
  return NextResponse.json(reactions);
}
