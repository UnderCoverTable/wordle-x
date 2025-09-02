import RegisterService from "@/app/api/register/service";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username, email, password } = await req.json();

  try {
    const data = await RegisterService.registerUser({
      username,
      email,
      password,
    });

    return NextResponse.json({ data: data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
