import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../store/AuthContext';

interface LoginFormProps {
  onSwitch: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitch }) => {
  const navigate = useNavigate();
  const { login, loading, error: authError } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const validateEmail = (value: string) => {
    if (!value) return 'El correo es obligatorio';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) return 'Correo inválido';
    return null;
  };

  const validatePassword = (value: string) => {
    if (!value) return 'La contraseña es obligatoria';
    if (value.length < 6) return 'Mínimo 6 caracteres';
    return null;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError(validateEmail(e.target.value));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError(validatePassword(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailErr = validateEmail(email);
    const passErr = validatePassword(password);
    setEmailError(emailErr);
    setPasswordError(passErr);
    if (emailErr || passErr) return;

    try {
      const result = await login({ email, password });
      // Navigate based on the user's role
      if (result.roles.includes('ADMIN')) {
        navigate('/admin');
      } else if (result.roles.includes('ORGANIZER')) {
        navigate('/organizador');
      } else if (result.roles.includes('REFEREE')) {
        navigate('/arbitro');
      } else {
        navigate('/player');
      }
    } catch {
      // authError from context is displayed in the UI below
    }
  };

  const isDisabled = loading || !!emailError || !!passwordError || !email || !password;

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto">
      <h2 className="text-4xl font-bold mb-3 text-center text-[#071F4A]">Iniciar Sesión</h2>
      <h3 className="text-center text-sm mb-6 text-gray-600">Accede a tu cuenta de Tech Cup</h3>

      {/* API error message */}
      {authError && (
        <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          {authError}
        </div>
      )}

      <div className="mb-4">
        <label className="block mb-1 font-semibold text-[#071F4A]">Correo Electrónico</label>
        <div className={`flex items-center bg-[#F7F9FA] border rounded-xl px-4 py-3 ${emailError ? 'border-red-400' : 'border-gray-200'}`}>
          <Mail className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="text"
            className="flex-1 bg-transparent outline-none border-none text-[#071F4A] placeholder-gray-400 font-medium"
            value={email}
            onChange={handleEmailChange}
            autoComplete="email"
            placeholder="correo@escuelaing.edu.co"
          />
        </div>
        {emailError && <div className="text-red-600 text-xs mt-1">{emailError}</div>}
      </div>

      <div className="mb-6">
        <label className="block mb-1 font-semibold text-[#071F4A]">Contraseña</label>
        <div className={`flex items-center bg-[#F7F9FA] border rounded-xl px-4 py-3 ${passwordError ? 'border-red-400' : 'border-gray-200'}`}>
          <Lock className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="password"
            className="flex-1 bg-transparent outline-none border-none text-[#071F4A] placeholder-gray-400 font-medium"
            value={password}
            onChange={handlePasswordChange}
            autoComplete="current-password"
            placeholder="••••••••"
          />
        </div>
        {passwordError && <div className="text-red-600 text-xs mt-1">{passwordError}</div>}
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#17A65B] to-[#17A65B] text-white font-bold py-3 rounded-2xl text-lg hover:opacity-90 transition disabled:opacity-60 mt-2"
        disabled={isDisabled}
      >
        <ArrowRight className="w-5 h-5" />
        {loading ? 'Ingresando...' : 'Iniciar Sesión'}
      </button>

      {/* Separator */}
      <div className="flex items-center my-6">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="mx-4 text-gray-400 text-sm">O continúa con</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* Google button */}
      <button
        type="button"
        className="w-full flex items-center justify-center gap-2 border border-gray-200 bg-white py-3 rounded-2xl font-semibold text-[#071F4A] hover:bg-gray-50 transition"
      >
        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
        Google
      </button>

      <p className="text-center text-sm text-gray-500 mt-6">
        ¿No tienes cuenta?{' '}
        <button type="button" onClick={onSwitch} className="text-[#17A65B] font-semibold hover:underline">
          Regístrate
        </button>
      </p>
    </form>
  );
};

export default LoginForm;
