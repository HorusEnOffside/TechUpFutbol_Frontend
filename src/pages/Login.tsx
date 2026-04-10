import React, { useState } from "react";
import { useAuth } from "../store/AuthContext";

const Login: React.FC = () => {
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");
    try {
      await login({ email, password });
    } catch (err: any) {
      setLocalError(err.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#144C9F]">Iniciar Sesión</h2>
        {(error || localError) && <div className="mb-4 text-red-600 text-sm">{error || localError}</div>}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Correo electrónico</label>
          <input
            type="email"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#17A65B]"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-semibold">Contraseña</label>
          <input
            type="password"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#17A65B]"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#17A65B] to-[#144C9F] text-white font-bold py-2 rounded-lg hover:opacity-90 transition disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  );
};

export default Login;
