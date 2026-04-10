import { Bell, User } from "lucide-react";
import logoMain from "../assets/logo.png";
import { Link, useNavigate } from "react-router";


export function NavBarAuthenticated() {
  const navigate = useNavigate();

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img src={logoMain} alt="Logo Tech Cup Fútbol" className="h-14 w-auto" />
            </div>
            {/* Right: Notifications & Account */}
            <div className="flex items-center gap-6">
              <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Notificaciones">
                <Bell className="w-6 h-6 text-[#144C9F]" />
                {/* Notificación roja */}
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-[#144C9F] to-[#071F4A] text-white font-bold hover:scale-105 transition-transform" aria-label="Cuenta de usuario">
                <User className="w-5 h-5" />
                <span className="hidden md:inline">Mi Cuenta</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
  );
}