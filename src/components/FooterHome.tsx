import { Trophy } from "lucide-react";

export function FooterHome() {
  return (
    <footer className="relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #071F4A 0%, #144C9F 50%, #17A65B 100%)'
    }}>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -ml-32 -mt-32"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-white rounded-full -mr-24 -mb-24"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-white text-center">
        <div className="flex justify-center items-center gap-4 mb-6">
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-[#39D17D]"></div>
          <Trophy className="w-10 h-10 text-[#39D17D]" />
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-[#39D17D]"></div>
        </div>
        <p className="text-xl font-bold mb-2">© 2026 Tech Cup Fútbol</p>
        <p className="text-white/80 mb-6">Escuela Colombiana de Ingeniería Julio Garavito</p>
        <p className="text-white/60 text-sm">Desarrollado por Horus en offside</p>
        <div className="flex justify-center gap-8 mt-8 text-sm">
          <a href="#about" className="hover:text-[#39D17D] transition-colors font-medium">Sobre el Torneo</a>
          <span className="text-white/40">•</span>
          <a href="#como-participar" className="hover:text-[#39D17D] transition-colors font-medium">Cómo Participar</a>
          <span className="text-white/40">•</span>
          <a href="#schedule" className="hover:text-[#39D17D] transition-colors font-medium">Información del Torneo Actual</a>
          <span className="text-white/40">•</span>
          <a href="#standings" className="hover:text-[#39D17D] transition-colors font-medium">Tabla de Posiciones</a>
        </div>
      </div>
    </footer>
  );
}
