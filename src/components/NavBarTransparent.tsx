import { User, ChevronLeft } from "lucide-react";
import { NotificationDropdown } from "./NotificationDropdown";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../store/AuthContext";
import logoBlanco from "../assets/logoBlanco.png";

interface NavBarTransparentProps {
  onLogoClick?: () => void;
  showBack?: boolean;
}

function getProfilePath(roles: string[]): string {
  if (roles.includes('ORGANIZER')) return '/organizador/perfil';
  if (roles.includes('REFEREE'))   return '/arbitro/perfil';
  return '/player/sports-profile';
}

export function NavBarTransparent({ onLogoClick, showBack = true }: NavBarTransparentProps = {}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const handleLogoClick = onLogoClick ?? (() =>
    location.pathname === "/"
      ? window.scrollTo({ top: 0, behavior: "smooth" })
      : navigate("/")
  );

  return (
    <nav
      className="absolute top-0 inset-x-0 z-50"
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Izquierda: botón volver + logo */}
          <div className="flex items-center gap-3">
            {showBack && (
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm "
                aria-label="Volver a la pantalla anterior"
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Volver</span>
              </button>
            )}
            <button
              onClick={handleLogoClick}
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-lg"
              aria-label="Ir a la página principal"
            >
              <img src={logoBlanco} alt="Tech Cup Fútbol" className="h-14 w-auto cursor-pointer" />
            </button>
          </div>

          {/* Derecha: notificaciones + perfil */}
          <div className="flex items-center gap-3">
            <NotificationDropdown
              iconClass="text-white"
              bellBg="hover:bg-white/10"
              bellDot="bg-[#39D17D]"
              dropdownBg="bg-white"
              border="border-gray-200"
              shadow="shadow-lg"
              headerBg="bg-gradient-to-r from-[#144C9F]/90 to-[#071F4A]/90 text-white"
            />

            <button
              onClick={() => navigate(getProfilePath(user?.roles ?? []))}
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
