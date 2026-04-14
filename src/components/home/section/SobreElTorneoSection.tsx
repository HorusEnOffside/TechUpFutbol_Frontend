import React from "react";
import AboutTitle from "../AboutTitle";
import AboutDescription from "../AboutDescription";
import { Users, Trophy, Shield, Monitor, UserCog, Star } from "lucide-react";
import CardAboutFeature from "../CardAboutFeature";


interface SobreElTorneoSectionProps {
  className?: string;
}

export function SobreElTorneoSection({ className = "" }: SobreElTorneoSectionProps) {
  return (
    <section id="about" className={`py-24 relative ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-[#17A65B] to-[#144C9F] text-white px-6 py-2 rounded-full text-sm font-bold">
              SOBRE EL TORNEO
            </span>
          </div>
          <AboutTitle>
            <span className="block">
              Una Nueva Era del <span className="text-[#17A65B]">Fútbol</span>
            </span>
            <span className="block text-[#17A65B]">Universitario</span>
          </AboutTitle>
          <AboutDescription textClassName="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Donde el ingenio no solo se juega en el campo. Plataforma digital oficial del torneo de los programas de Ingeniería.
          </AboutDescription>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <CardAboutFeature
            icon={<Users className="w-8 h-8 text-white" />}
            title="Participación Abierta"
            description="Estudiantes, profesores, graduados y familiares de los programas de Ingeniería de Sistemas, IA, Ciberseguridad y Estadística."
            borderColor="border-gray-100"
            hoverColor="hover:border-[#17A65B]"
            iconBg="bg-gradient-to-br from-[#39D17D] to-[#17A65B]"
          />
          <CardAboutFeature
            icon={<Trophy className="w-8 h-8 text-white" />}
            title="Competencia Profesional"
            description="Torneo estructurado con fase de grupos y eliminatoria directa, siguiendo reglamentos oficiales de fútbol 7."
            borderColor="border-gray-100"
            hoverColor="hover:border-[#144C9F]"
            iconBg="bg-gradient-to-br from-[#144C9F] to-[#071F4A]"
          />
          <CardAboutFeature
            icon={<Monitor className="w-8 h-8 text-white" />}
            title="Plataforma Digital"
            description="Gestión completa de inscripciones, pagos, calendario y estadísticas en un solo lugar."
            borderColor="border-gray-100"
            hoverColor="hover:border-[#17A65B]"
            iconBg="bg-gradient-to-br from-[#17A65B] to-[#144C9F]"
          />
          <CardAboutFeature
            icon={<UserCog className="w-8 h-8 text-white" />}
            title="Cada rol tiene su propio menú"
            description="Si eres jugador, árbitro u organizador, tendrás tus propios espacios personalizados."
            borderColor="border-gray-100"
            hoverColor="hover:border-[#17A65B]"
            iconBg="bg-gradient-to-br from-[#17A65B] to-[#144C9F]"
          />
          <CardAboutFeature
            icon={<Star className="w-8 h-8 text-white" />}
            title="Demuestra tu talento en un día"
            description="Prepárate con tu equipo, juega todos los partidos en un día y conviértete en el campeón."
            borderColor="border-gray-100"
            hoverColor="hover:border-[#17A65B]"
            iconBg="bg-gradient-to-br from-[#17A65B] to-[#144C9F]"
          />
          <CardAboutFeature
            icon={<Shield className="w-8 h-8 text-white" />}
            title="Seguridad de tus datos"
            description="No te preocupes por tus datos personales, tenemos seguridad integrada que respalda la confidencialidad. "
            borderColor="border-gray-100"
            hoverColor="hover:border-[#17A65B]"
            iconBg="bg-gradient-to-br from-[#17A65B] to-[#144C9F]"
          />
        </div>
      </div>
    </section>
  );
}

export default SobreElTorneoSection;
