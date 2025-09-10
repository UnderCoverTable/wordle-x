import { GameRow } from "@/constants";
import { supabaseClient } from "@/utils/supabase/client";

class SaveStateService {
  static saveGameState = async (
    wordID: number,
    state: GameRow[],
    sessionID: string,
    gameStatus: string
  ) => {
    const { data, error } = await supabaseClient.rpc("save_game", {
      p_session_id: sessionID,
      p_word_id: wordID,
      p_word_length: state[0]?.row?.length,
      p_state: state,
      p_status: gameStatus,
    });

    if (error) throw error;
    return data;
  };

  static getGameState = async (sessionID: string, dimension: number) => {
    const { data, error } = await supabaseClient
      .from("games")
      .select("state")
      .eq("status", "in-progress")
      .eq("session_id", sessionID)
      .eq("word_length", dimension);

    if (error) throw error;
    return data?.[0]?.state ?? null;
  };
}

export default SaveStateService;
