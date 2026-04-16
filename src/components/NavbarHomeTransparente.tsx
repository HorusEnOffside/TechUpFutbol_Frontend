import { useNavigate, useLocation } from "react-router";
import { LogIn } from "lucide-react";
import logoBlanco from "../assets/logoBlanco.png";


export function HomeNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="absolute top-0 inset-x-0 z-50" role="navigation" aria-label="Navegación principal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <button
            onClick={() => {
              if (location.pathname === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                navigate("/");
              }
            }}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
            aria-label="Ir a la página principal"
            tabIndex={0}
          >
            <img src={logoBlanco} alt="Tech Cup Fútbol" className="h-14 w-auto" />
          </button>

          {/* Acción principal */}
          <div className="flex items-center gap-3">
            
          </div>
        </div>
      </div>
    </nav>
  );
}