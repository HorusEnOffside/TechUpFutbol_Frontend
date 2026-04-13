import { useState } from "react";
import { login } from "../services/auth.service";
import { LoginPayload } from "../types/auth";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (payload: LoginPayload) => {
    setLoading(true);
    setError(null);
    try {
      const result = await login(payload);
      return result;
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading, error };
}
