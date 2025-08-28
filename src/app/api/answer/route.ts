import { supabaseClient } from "@/utils/supabase/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data, error } = await supabaseClient.rpc("get_random_word_id");

    if (error) throw error;
    if (!data || data.length === 0) {
      return NextResponse.json({ error: "No word found" }, { status: 404 });
    }

    return NextResponse.json({ id: data[0].id });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
