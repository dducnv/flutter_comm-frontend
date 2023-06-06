import { NextRequest, NextResponse } from "next/server";
import { appApi } from "@/untils/configs/app_api_config";
const POST_API_URL = process.env.API_URL + "/api/v1/posts";
export async function GET(
  request: NextRequest,
  { params }: { params: { uuid: string } }
) {
  const res = await appApi.get(POST_API_URL + "/" + params.uuid + "/details");
  const posts = await res.json();
  return NextResponse.json(posts);
}
export async function PUT(
  request: NextRequest,
  { params }: { params: { uuid: string } }
) {}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { uuid: string } }
) {}
