import SaveStateService from "@/app/api/state/service";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { wordID, state, sessionID } = await req.json();

    await SaveStateService.saveGameState(wordID, state, sessionID);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}