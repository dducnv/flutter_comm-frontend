import { appApi } from "@/untils/configs/app_api_config";
import { NextResponse, NextRequest } from "next/server";
const POST_API_URL = "/posts";
export async function GET(
  request: NextRequest,
  { params }: { params: { uuid: string } }
) {
  const res = await appApi.get(POST_API_URL + "/" + params.uuid + "/reactions");
  const reactions = await res.json();
  return NextResponse.json(reactions);
}

export async function POST(
  request: NextRequest,
  { params }: { params: { uuid: string } }
) {
  const body = await request.json();
  const res = await appApi.post(
    POST_API_URL + "/" + params.uuid + "/reactions",
    body
  );
  const reactions = await res.json();
  return NextResponse.json(reactions);
}
