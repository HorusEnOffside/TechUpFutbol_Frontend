import React from "react";
import { Trophy } from "lucide-react";

interface AuthSidePanelProps {
  mode: "login" | "register";
  onSwitch: () => void;
}

export const AuthSidePanel: React.FC<AuthSidePanelProps> = ({ mode, onSwitch }) => {
  // Gradiente animado con transición suave usando un pseudo-elemento
  const gradientFrom = mode === "login" ? '#0f5833' : '#071F4A';
  const gradientVia = '#144C9F';
  const gradientTo = mode === "login" ? '#071F4A' : '#0f5833';


  // Posición animada del círculo decorativo
  const circlePosition = mode === "login"
    ? "bottom-0 right-0 -mr-24 -mb-24"
    : "top-0 left-0 -ml-24 -mt-24";

  return (
    <div
      className={"flex flex-col justify-center items-center h-full w-full px-8 py-12 rounded-2xl text-white relative overflow-hidden"}
      style={{ position: 'relative' }}
    >
      <div
        aria-hidden
        className="absolute inset-0 w-full h-full z-0 rounded-2xl pointer-events-none"
        style={{
          transition: 'background 1.5s cubic-bezier(0.68,-0.55,0.27,1.55)',
          background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientVia} 60%, ${gradientTo} 100%)`,
        }}
      />
      <div
        className={`absolute w-48 h-48 bg-white/10 rounded-full transition-all duration-[1200ms] ${circlePosition}`}
        style={{ transition: 'all 1.0s cubic-bezier(0.68,-0.55,0.27,1.55)' }}
      />
      <div className="flex flex-col items-center z-10 relative">
        <Trophy className="w-14 h-14 mb-4 text-white/80" />
        {mode === "login" ? (
          <>
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-5 text-center">¡Bienvenido de nuevo!</h2>

            <p className="text-lg text-center text-white/90">¿No tienes cuenta?</p>
            <p className="text-lg mb-8 text-center text-white/90">Regístrate para acceder a todas las funcionalidades del torneo Tech Cup Fútbol</p>
            <button
              onClick={onSwitch}
              className="flex items-center gap-2 px-8 py-3 rounded-xl border-2 border-white text-white font-bold text-lg hover:bg-white/10 transition mt-2"
            >
              Registrarse <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor' className='w-5 h-5'><path strokeLinecap='round' strokeLinejoin='round' d='M17.25 6.75L21 12m0 0l-3.75 5.25M21 12H3' /></svg>
            </button>
          </>
        ) : (
          <>
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-5 text-center">¡Únete a nosotros!</h2>
            <p className="text-lg text-center text-white/90">¿Ya tienes cuenta?</p>
            <p className="text-lg mb-8 text-center text-white/90">Inicia sesión con tu cuenta para gestionar tu equipo y participar en el torneo</p>
            <button
              onClick={onSwitch}
              className="flex items-center gap-2 px-8 py-3 rounded-xl border-2 border-white text-white font-bold text-lg hover:bg-white/10 transition mt-2"
            >
              Iniciar Sesión <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor' className='w-5 h-5'><path strokeLinecap='round' strokeLinejoin='round' d='M17.25 6.75L21 12m0 0l-3.75 5.25M21 12H3' /></svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
};
