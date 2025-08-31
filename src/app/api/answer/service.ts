import { AnswerServiceResponse } from "@/app/api/answer/types";
import { supabaseClient } from "@/utils/supabase/client";

class AnswerService {
  static getAnswer = async (
    dimension: number
  ): Promise<AnswerServiceResponse> => {
    let response: AnswerServiceResponse;

    const { data, error } = await supabaseClient.rpc("get_random_word_id", {
      dimension,
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
