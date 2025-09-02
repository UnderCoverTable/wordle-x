import { createClientServer } from "@/utils/supabase/server";

class SignInService {
  static signInUser = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const supabaseServer = await createClientServer();

    const { data, error } = await supabaseServer.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return { data };
  };
}

export default SignInService;
