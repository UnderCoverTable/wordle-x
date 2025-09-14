import UserStatsService from "@/app/api/stats/service";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionID = searchParams.get("sessionID");

  if (!sessionID) {
    return NextResponse.json(
      { error: "Missing sessionID parameter" },
      { status: 400 }
    );
  }

  try {
    const data = await UserStatsService.getUserStats(sessionID);
    console.log('data: ', data);

    return NextResponse.json(
      { data: data.data, success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
