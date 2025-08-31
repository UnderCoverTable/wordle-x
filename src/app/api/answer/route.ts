import { NextResponse } from "next/server";
import AnswerService from "@/app/api/answer/service";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const dimension = searchParams.get("dimension");

  try {
    const answer = await AnswerService.getAnswer(Number(dimension));
    if (answer.id) {
      return NextResponse.json({ id: answer.id }, { status: 200 });
    }
    return NextResponse.json({ message: answer.message }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
