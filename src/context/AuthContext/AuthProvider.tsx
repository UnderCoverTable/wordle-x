"use client";
import { AuthContext } from "@/context/AuthContext/AuthContext";
import { supabaseClient } from "@/utils/supabase/client";
import { ReactNode, useContext, useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabaseClient.auth.getUser().then(({ data }) => {
      setUser(data?.user);
    });

    const { data: listener } = supabaseClient.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
