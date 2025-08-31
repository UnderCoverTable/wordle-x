import validationService from "@/app/api/validate/service";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { id, guess } = await req.json();

  try {
    const data = await validationService.validateAnswer({ id, guess });

    return NextResponse.json(
      { message: data?.message, valid: data?.valid, status: data?.status },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
