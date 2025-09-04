import { createClientServer } from "@/utils/supabase/server";

class SignOutService {
  static signInUser = async () => {
    const supabaseServer = await createClientServer();

    const { error } = await supabaseServer.auth.signOut();

    if (error) throw error;
  };
}

export default SignOutService;
