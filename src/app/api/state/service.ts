import { GameRow } from "@/constants";
import { supabaseClient } from "@/utils/supabase/client";

class SaveStateService {
  static saveGameState = async (
    wordID: number,
    state: GameRow[],
    sessionID: string,
    gameStatus: string
  ) => {
    const { data, error } = await supabaseClient.from("games").upsert({
      session_id: sessionID,
      word_id: wordID,
      state: state,
      word_length: state[0]?.row?.length,
      status: gameStatus,
    });

    if (error) throw error;
    return data;
  };

  static getGameState = async (sessionID: string, dimension: number) => {
    const { data, error } = await supabaseClient
      .from("games")
      .select("state")
      .eq("status", 'in-progress')
      .eq("session_id", sessionID)
      .eq("word_length", dimension)

      if (error) throw error;
    return data?.[0]?.state ?? null;
  };
}

export default SaveStateService;
