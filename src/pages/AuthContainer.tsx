import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { AuthSidePanel } from "../components/AuthSidePanel";
import { ImageCarousel } from "../components/ImageCarousel";
import canchaImg from "../assets/cancha.png";
import { HomeNavbar } from "../components/NavbarHomeTransparente";

export default function AuthContainer() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="h-screen overflow-hidden flex items-center justify-center relative">
      <HomeNavbar />

      {/* Fondo de pantalla */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${canchaImg})`,
          filter: "blur(3px) brightness(0.35)",
          transform: "scale(1.06)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          background:
            "linear-gradient(105deg, rgba(5,13,26,0.92) 0%, rgba(7,31,74,0.75) 40%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          background:
            "radial-gradient(ellipse at 85% 55%, rgba(23,166,91,0.22) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      {/* Padding para navbar fijo */}
      <div className="relative w-full max-w-7xl flex z-10 gap-8 items-center pt-20" style={{ minHeight: 600 }}>
        {/* Carrusel: 2/5 */}
        <div className="w-2/5 flex items-center justify-center" style={{ height: '500px' }}>
          <div className="w-full h-full flex items-center justify-center">
            <ImageCarousel />
          </div>
        </div>

        {/* Contenido: 3/5 */}
        <div className="w-3/5 flex items-center justify-center" style={{ height: '600px' }}>
          <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl flex overflow-hidden h-full">
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
