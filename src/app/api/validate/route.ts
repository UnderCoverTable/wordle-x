import { supabaseClient } from '@/utils/supabase/client'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { id, guess } = await req.json() // id of the word, guess entered by user
  console.log('id: ', id);
  console.log('guess: ', guess);

  if (!id || !guess) {
    return NextResponse.json({ error: 'Missing id or guess' }, { status: 400 })
  }

  const { data, error } = await supabaseClient
    .from('words')
    .select('word')
    .eq('id', id)
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })



  return NextResponse.json({ correct: false })
}