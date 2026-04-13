import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { AuthSidePanel } from "../components/AuthSidePanel";
import { ImageCarousel } from "../components/ImageCarousel";
import bgImage from '../assets/Background1.png';


export default function AuthContainer() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Fondo de pantalla */}
      <div className="grupos-bg" style={{ backgroundImage: `url(${bgImage})` }} />

      <div className="relative w-full max-w-6xl flex z-10 gap-8" style={{ minHeight: 600 }}>
        {/* Primera columna: carrusel */}
        <div className="w-1/3 h-full flex items-center justify-center">
          <div className="w-full h-[100%] flex items-center justify-center">
            <ImageCarousel />
          </div>
        </div>

        {/* Segunda y tercera columna: contenido actual */}
        <div className="w-2/3 h-full flex items-center justify-center">
          <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl flex overflow-hidden" style={{ minHeight: 600 }}>
            <div className="w-1/2 h-full flex flex-col justify-center p-10 z-10">
              <LoginForm onSwitch={() => setShowLogin(false)} />
            </div>
            <div className="w-1/2 h-full flex flex-col justify-center p-10 z-10">
              <RegisterForm onSwitch={() => setShowLogin(true)} />
            </div>
            <div
              className={`w-1/2 h-full transition-transform duration-700 absolute top-0 flex flex-col justify-center z-20 bg-transparent`}
              style={{
                minHeight: 600,
                left: showLogin ? '50%' : '0%',
                transform: showLogin ? 'translateX(0%)' : 'translateX(0%)',
                transition: 'left 0.7s, transform 0.7s',
              }}
            >
              <AuthSidePanel mode={showLogin ? "login" : "register"} onSwitch={() => setShowLogin((v) => !v)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
