import { AnswerServiceResponse } from "@/app/api/answer/types";
import { supabaseClient } from "@/utils/supabase/client";

class UserStatsService {
  static getUserStats = async (sessionID: string) => {
    let response;

    const { data, error } = await supabaseClient.rpc("get_user_stats", {
      user_id: sessionID,
    });

    if (error) throw error;
    if (!data) {
      response = { message: "No word found" };
    } else {
      response = { message: "Word found", data };
    }

    return response;
  };
}
export default UserStatsService;
