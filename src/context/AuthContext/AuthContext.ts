import { createContext } from "react";
import type { User } from "@supabase/supabase-js";

export const AuthContext = createContext<{
  user: User | null;
  authLoading: boolean;
} | null>(null);
