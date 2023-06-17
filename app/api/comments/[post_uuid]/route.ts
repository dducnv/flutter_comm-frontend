import { appApi } from "@/untils/configs/app_api_config";
import { NextRequest, NextResponse } from "next/server";
export async function GET(
  request: NextRequest,
  { params }: { params: { post_uuid: string } }
) {
  const res = await appApi.get(`/${params.post_uuid}/comments`);
  const comment = await res.json();
  return NextResponse.json(comment);
}
export async function POST(
  request: NextRequest,
  { params }: { params: { post_uuid: string } }
) {
  const body = await request.json();
  const res = await appApi.post(`/${params.post_uuid}/comments`, body);
  const comment = await res.json();
  return NextResponse.json(comment);
}
