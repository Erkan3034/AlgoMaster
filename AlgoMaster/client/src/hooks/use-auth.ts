import { useState, useEffect } from "react";
import { auth, loginWithEmail, logout as firebaseLogout, onAuthChange, User } from "@/lib/firebase";

interface AuthUser {
  id: string;
  email: string;
  role: "admin";
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loginError, setLoginError] = useState<Error | null>(null);
  const [isLoginPending, setIsLoginPending] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthChange((firebaseUser: User | null) => {
      if (firebaseUser) {
        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email || "",
          role: "admin", // All authenticated users are admins
        });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async ({ email, password }: { email: string; password: string }) => {
    setIsLoginPending(true);
    setLoginError(null);
    
    try {
      await loginWithEmail(email, password);
    } catch (error: any) {
      let message = "Login failed";
      
      // Firebase error codes
      switch (error.code) {
        case "auth/user-not-found":
          message = "No account found with this email";
          break;
        case "auth/wrong-password":
          message = "Incorrect password";
          break;
        case "auth/invalid-email":
          message = "Invalid email address";
          break;
        case "auth/too-many-requests":
          message = "Too many failed attempts. Please try again later";
          break;
        case "auth/invalid-credential":
          message = "Invalid email or password";
          break;
        default:
          message = error.message || "Login failed";
      }
      
      const err = new Error(message);
      setLoginError(err);
      throw err;
    } finally {
      setIsLoginPending(false);
    }
  };

  const logout = async () => {
    await firebaseLogout();
    setUser(null);
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    isAdmin: !!user, // All authenticated users are admins
    login,
    logout,
    loginError,
    isLoginPending,
  };
}
