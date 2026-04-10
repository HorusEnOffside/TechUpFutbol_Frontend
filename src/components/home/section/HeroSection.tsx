import { Zap, ArrowRight, Calendar } from "lucide-react";
import logoTechCup from "../../../assets/logoBlanco.png";
import carruselLogin1 from "../../../assets/carruselLogin1.jpeg";
import { HeroHighlight } from "../HeroHighlight";
import { HeroTitle } from "../HeroTitle";
import { HeroDescription } from "../HeroDescription";
import { HeroButton } from "../HeroButton";
import { HeroImage } from "../HeroImage";

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(57,209,125,0.85) 0%, rgba(23,166,91,0.75) 35%, rgba(20,76,159,0.65) 70%, rgba(7,31,74,0.6) 100%), url(${carruselLogin1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 flex flex-col lg:flex-row items-center justify-between gap-16 min-h-[calc(100vh-200px)]">
        {/* Left Content */}
        <div className="flex-1 space-y-8 text-white animate-fade-in">
          <HeroHighlight text="Torneo 2026-I • Inscripciones Abiertas" icon={<Zap className="w-4 h-4 text-[#39D17D]" />} />
          <HeroTitle>
            TECH CUP<br />
            <span className="text-[#39D17D]">FÚTBOL</span>
          </HeroTitle>
          <HeroDescription>
            Donde la tecnología y el fútbol se encuentran
          </HeroDescription>
          <p className="text-lg lg:text-xl text-white/80 max-w-2xl leading-relaxed">
            El torneo semestral más innovador de fútbol universitario. Competencia, tecnología y deporte unidos en una sola plataforma digital.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <HeroButton href="#about" variant="primary">
              <span>Conocer Más</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </HeroButton>
            <HeroButton href="#schedule" variant="secondary">
              <Calendar className="w-5 h-5" />
              <span>Ver Calendario</span>
            </HeroButton>
          </div>
        </div>
        {/* Right Content - Logo */}
        <div className="flex-1 flex justify-center items-center animate-float max-w-xl">
          <HeroImage src={logoTechCup} alt="Logo oficial Tech Cup Fútbol 2026" className="w-[340px] h-[340px] md:w-[420px] md:h-[420px] lg:w-[500px] lg:h-[500px] max-w-full max-h-[60vh]" />
        </div>
      </div>

      {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
    </section>
  );
}
