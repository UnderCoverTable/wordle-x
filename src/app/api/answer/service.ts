import { AnswerServiceResponse } from "@/app/api/answer/types";
import { supabaseClient } from "@/utils/supabase/client";

class AnswerService {
  static getAnswer = async (
    dimension: number,
    sessionID: string,
  ): Promise<AnswerServiceResponse> => {
    let response: AnswerServiceResponse;

    const { data, error } = await supabaseClient.rpc("get_game_or_word", {
      p_session_id: sessionID,
      p_word_length: dimension,
    });

    if (error) throw error;
    if (!data) {
      response = { message: "No word found" };
    } else {
      response = { message: "Word found", id: data };
    }

    return response;
  };
}
export default AnswerService;
