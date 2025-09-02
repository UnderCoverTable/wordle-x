import RegisterService from "@/app/api/register/service";
import SignInService from "@/app/api/signIn/service";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    const data = await SignInService.signInUser({
      email,
      password,
    });

    return NextResponse.json({ data: data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
