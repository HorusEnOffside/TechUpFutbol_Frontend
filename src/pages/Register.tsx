import React, { useState } from "react";
import UserService from "../services/user.service";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    setLoading(true);
    try {
      await UserService.createPlayerUser({
        name,
        mail: email,
        password,
        gender: 'OTHER', // Puedes agregar un campo de género si lo deseas
        dateOfBirth: '2000-01-01', // Puedes agregar un campo de fecha si lo deseas
      });
      setSuccess("Registro exitoso. Ahora puedes iniciar sesión.");
      setName(""); setEmail(""); setPassword(""); setConfirmPassword("");
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Error al registrarse");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#144C9F]">Registro</h2>
        {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}
        {success && <div className="mb-4 text-green-600 text-sm">{success}</div>}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Nombre completo</label>
          <input
            type="text"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#17A65B]"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
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
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Contraseña</label>
          <input
            type="password"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#17A65B]"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-semibold">Confirmar contraseña</label>
          <input
            type="password"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#17A65B]"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#17A65B] to-[#144C9F] text-white font-bold py-2 rounded-lg hover:opacity-90 transition disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>
    </div>
  );
};

export default Register;
