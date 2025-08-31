import { getGuessStatus } from "@/helpers";
import { supabaseClient } from "@/utils/supabase/client";

class validationService {
  static validateAnswer = async ({
    id,
    guess,
  }: {
    id: number;
    guess: string;
  }) => {
    let response;

    const { data, error } = await supabaseClient
      .from("words")
      .select("word")
      .eq("word", guess)
      .limit(1);
    if (error) throw error;

    if (!data || data.length === 0) {
      response = { message: "Word does not exist", valid: false, status: [] };
    } else {
      const { data, error } = await supabaseClient
        .from("words")
        .select("word")
        .eq("id", id)
        .single();

      const answer = data?.word;
      const status = getGuessStatus({ answer, guess });
      response = { message: "Word exists", valid: true, status };
    }

    return response;
  };
}
export default validationService;
