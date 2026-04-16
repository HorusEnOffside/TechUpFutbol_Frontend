import { Bell, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router";
import logoBlanco from "../assets/logoBlanco.png";

/**
 * Navbar transparente para pantallas con fondo oscuro.
 * Reutiliza el patrón de HomeNavbar pero con logo blanco
 * e iconos blancos para contraste sobre fondos oscuros.
 */
export function NavBarTransparent() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav
      className="absolute top-0 inset-x-0 z-50"
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo — clic vuelve al inicio */}
          <button
            onClick={() =>
              location.pathname === "/"
                ? window.scrollTo({ top: 0, behavior: "smooth" })
                : navigate("/")
            }
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-lg cursor-pointer"
            aria-label="Ir a la página principal"
          >
            <img
              src={logoBlanco}
              alt="Tech Cup Fútbol"
              className="h-14 w-auto"
            />
          </button>

          {/* Acciones de usuario */}
          <div className="flex items-center gap-3">
            {/* Notificaciones */}
            <button
              className="relative p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Notificaciones"
            >
              <Bell className="w-6 h-6 text-white" />
              <span
                className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#39D17D] rounded-full"
                aria-hidden="true"
              />
            </button>

            {/* Perfil */}
            <button
              onClick={() => navigate("/app")}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm text-white font-semibold text-sm hover:bg-white/20 transition-all"
              aria-label="Mi cuenta"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Mi Cuenta</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
