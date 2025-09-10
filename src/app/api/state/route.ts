import SaveStateService from "@/app/api/state/service";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { wordID, state, sessionID, gameStatus } = await req.json();

    await SaveStateService.saveGameState(wordID, state, sessionID, gameStatus);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const dimension = searchParams.get("dimension");
  const sessionID = searchParams.get("sessionID");

  try {
    const data = await SaveStateService.getGameState(sessionID, dimension);

    return NextResponse.json({ data, success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
