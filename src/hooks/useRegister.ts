import { useState } from "react";
import { register } from "../services/auth.service";
import { RegisterPayload } from "../types/auth";

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (payload: RegisterPayload) => {
    setLoading(true);
    setError(null);
    try {
      const result = await register(payload);
      return result;
    } catch (err: any) {
      setError(err.message || "Error al registrarse");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { handleRegister, loading, error };
}
