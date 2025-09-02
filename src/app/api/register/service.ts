import { createClientServer } from "@/utils/supabase/server";

class RegisterService {
  static registerUser = async ({
    email,
    password,
    username,
  }: {
    email: string;
    password: string;
    username: string;
  }) => {
    const supabaseServer = await createClientServer();

    const { data, error } = await supabaseServer.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: username,
        },
      },
    });

    if (error) throw error;

    return { data };
  };
}

export default RegisterService;
