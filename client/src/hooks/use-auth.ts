import { useState, useEffect } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    isAdmin: false,
  });
  const [loginError, setLoginError] = useState<Error | null>(null);
  const [isLoginPending, setIsLoginPending] = useState(false);

  useEffect(() => {
    if (!supabase || !isSupabaseConfigured) {
      setState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        isAdmin: false,
      });
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setState({
        user: session?.user ?? null,
        isLoading: false,
        isAuthenticated: !!session?.user,
        isAdmin: !!session?.user,
      });
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setState({
          user: session?.user ?? null,
          isLoading: false,
          isAuthenticated: !!session?.user,
          isAdmin: !!session?.user,
        });
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const login = async ({ email, password }: { email: string; password: string }) => {
    if (!supabase) {
      throw new Error("Supabase is not configured");
    }

    setIsLoginPending(true);
    setLoginError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (error: any) {
      setLoginError(error);
      throw error;
    } finally {
      setIsLoginPending(false);
    }
  };

  const logout = async () => {
    if (!supabase) return;

    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return {
    user: state.user,
    isLoading: state.isLoading,
    isAuthenticated: state.isAuthenticated,
    isAdmin: state.isAdmin,
    login,
    logout,
    loginError,
    isLoginPending,
    isSupabaseConfigured,
  };
}
