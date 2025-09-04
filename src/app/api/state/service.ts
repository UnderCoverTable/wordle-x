import { GameRow } from "@/constants";
import { supabaseClient } from "@/utils/supabase/client";

class SaveStateService {
  static saveGameState = async (
    wordID: number,
    state: GameRow[],
    sessionID: string
  ) => {
    const { data, error } = await supabaseClient
      .from("games")
      .upsert({
        session_id: sessionID,
        word_id: wordID,
        state: state,
        word_length: state[0]?.row?.length,
      });

    if (error) throw error;
    return data;
  };
}

export default SaveStateService;
