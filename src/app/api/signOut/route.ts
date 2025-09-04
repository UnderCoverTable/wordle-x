import RegisterService from "@/app/api/register/service";
import SignInService from "@/app/api/signIn/service";
import SignOutService from "@/app/api/signOut/service";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await SignOutService.signInUser();

    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
