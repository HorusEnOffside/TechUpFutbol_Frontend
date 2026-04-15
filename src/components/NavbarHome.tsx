import { Link, useNavigate, useLocation } from "react-router";
import { LogIn, UserPlus } from "lucide-react";
import logoMain from "../assets/logo.png";


export function HomeNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="bg-transparent backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                if (location.pathname === "/") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                } else {
                  navigate("/");
                }
              }}
              className="flex items-center gap-2 focus:outline-none cursor-pointer"
              aria-label="Ir a la página principal"
            >
              <img src={logoMain} alt="Logo Tech Cup Fútbol" className="h-16 w-auto" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          </div>

          {/* Action Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/auth")}
              className="bg-gradient-to-r from-[#144C9F] to-[#17A65B] text-white px-12 py-3 rounded-2xl hover:shadow-xl hover:shadow-[#144C9F]/30 transition-all duration-300 flex items-center gap-2 font-bold hover:scale-105 transform"
              aria-label="Comenzar en la plataforma"
            >
              <span className="lg:inline">Comenzar</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}