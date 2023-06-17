import { appApi } from "@/untils/configs/app_api_config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { post_uuid: string } }
) {
  const body = await request.json();
  const res = await appApi.post(`/${params.post_uuid}/comments/reply`, body);
  const comment = await res.json();
  return NextResponse.json(comment);
}
