import { useState, useRef } from "react";
import { Pencil, Check, X, Upload, User } from "lucide-react";
import canchaImg from "../assets/cancha.png";
import logoBlanco from "../assets/logoBlanco.png";
import { NavBarTransparent } from "../components/NavBarTransparentNoAccount";
import { useNavigate } from "react-router";

// Datos quemados de ejemplo
const ORGANIZER = {
  name: "María González",
  mail: "maria.organizadora@techcup.com",
  dateOfBirth: "1990-05-12",
  gender: "Femenino",
  photo: "",
};

function calcAge(dob?: string): number {
  if (!dob) return 0;
  const today = new Date();
  const birth = new Date(dob);
  let age = today.getFullYear() - birth.getFullYear();
  if (
    today.getMonth() < birth.getMonth() ||
    (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())
  ) age--;
  return age;
}

export default function OrganizadorProfilePage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(ORGANIZER.photo || null);

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setPhotoPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#050d1a]">
      {/* Fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${canchaImg})`,
          filter: "blur(3px) brightness(0.28)",
          transform: "scale(1.06)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(110deg, rgba(5,13,26,0.97) 0%, rgba(7,31,74,0.85) 40%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 88% 60%, rgba(23,166,91,0.28) 0%, transparent 55%)",
        }}
        aria-hidden="true"
      />

      {/* Navbar */}
      <NavBarTransparent />

      {/* Contenido */}
      <main className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center gap-16">
          {/* Panel izquierdo: info */}
          <div className="w-full lg:w-7/12 flex flex-col gap-0">
            <h1
              className="text-white text-4xl sm:text-5xl mb-6 leading-tight"
              style={{ fontFamily: "'Russo One', sans-serif", textShadow: "0 2px 20px rgba(0,0,0,0.7)" }}
            >
              {ORGANIZER.name}
            </h1>
            <div
              className="rounded-2xl border border-white/10 overflow-hidden"
              style={{ background: "rgba(5,13,26,0.72)", backdropFilter: "blur(16px)" }}
            >
              <div
                className="px-6 py-4"
                style={{ background: "linear-gradient(90deg, #144C9F 0%, #17A65B 100%)" }}
              >
                <p className="text-white font-semibold text-sm tracking-wide" style={{ fontFamily: "'Russo One', sans-serif" }}>
                  Perfil del Organizador
                </p>
              </div>
              <div className="px-6 py-2 flex flex-col gap-2">
                <div className="flex items-center justify-between border-b border-white/10 py-3 gap-4">
                  <span className="text-white/50 text-sm min-w-[120px]">Nombre</span>
                  <span className="text-white font-semibold text-sm" style={{ fontFamily: "'Russo One', sans-serif" }}>{ORGANIZER.name}</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 py-3 gap-4">
                  <span className="text-white/50 text-sm min-w-[120px]">Correo</span>
                  <span className="text-white font-semibold text-sm" style={{ fontFamily: "'Russo One', sans-serif" }}>{ORGANIZER.mail}</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 py-3 gap-4">
                  <span className="text-white/50 text-sm min-w-[120px]">Edad</span>
                  <span className="text-white font-semibold text-sm" style={{ fontFamily: "'Russo One', sans-serif" }}>{calcAge(ORGANIZER.dateOfBirth)}</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 py-3 gap-4">
                  <span className="text-white/50 text-sm min-w-[120px]">Género</span>
                  <span className="text-white font-semibold text-sm" style={{ fontFamily: "'Russo One', sans-serif" }}>{ORGANIZER.gender}</span>
                </div>
              </div>
            </div>
          </div>
          {/* Panel derecho: foto */}
          <div className="w-full lg:w-5/12 flex flex-col items-center justify-center gap-6">
            <div
              className="relative w-80 h-80 rounded-full border-4 border-[#39D17D]/50 overflow-hidden cursor-pointer group shadow-2xl"
              style={{ boxShadow: "0 0 70px rgba(57,209,125,0.22)" }}
              onClick={() => fileInputRef.current?.click()}
            >
              {photoPreview ? (
                <img src={photoPreview} alt="Foto perfil" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-white/5 flex flex-col items-center justify-center text-white/30">
                  <User className="w-28 h-28 mb-2" />
                  <span className="text-base">Subir foto</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Upload className="w-12 h-12 text-white" />
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-7 py-3 rounded-xl border border-white/20 bg-white/5 text-white/60 text-base hover:bg-white/10 transition-all"
            >
              <Upload className="w-5 h-5" />
              {photoPreview ? "Cambiar foto" : "Subir foto"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
