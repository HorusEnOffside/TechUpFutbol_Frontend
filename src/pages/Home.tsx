import { Calendar, Trophy, Users, FileText, BarChart3, Shield, ArrowRight, Zap } from "lucide-react";
import { FooterHome } from "../components/FooterHome";
import { HeroSection } from "../components/home/section/HeroSection";
import { SobreElTorneoSection } from "../components/home/section/SobreElTorneoSection";
import { ComoParticiparSection } from "../components/home/section/ComoParticiparSection";
import { TorneoActualSection } from "../components/home/section/TorneoActualSection";
import { StandingsSection } from "../components/home/section/StandingsSection";

export function Home() {
  return (
    <div className="w-full overflow-hidden bg-white">
      

      {/* PRIMERA PARTE INFORMATIVA*/}
      <HeroSection />

      {/* SEGUNDA PARTE TORNEO */}
      <SobreElTorneoSection />
      <ComoParticiparSection />
      <TorneoActualSection />
      
      
      {/* TERCERA PARTE CLASIFICACIÓN */}
      <StandingsSection />


      <FooterHome />
    </div>
  );
}
