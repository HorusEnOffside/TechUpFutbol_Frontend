import React from "react";
import { useNavigate } from "react-router";
import AboutTitle from "../AboutTitle";

const estado = "Inscripciones Abiertas";
const fechaInicio = "15 de Marzo, 2026";
const fechaFin = "30 de Abril, 2026";
const equiposInscritos = 12;
const equiposMax = 16;
const costo = "$150,000";

const importantDates = [
  { date: "06 MAR", title: "Inicio de Inscripciones", desc: "Los equipos pueden comenzar a registrarse", color: "from-[#39D17D] to-[#17A65B]" },
  { date: "12 MAR", title: "Cierre de Inscripciones", desc: "Última fecha para completar pagos", color: "from-[#17A65B] to-[#144C9F]" },
  { date: "15 MAR", title: "Inicio del Torneo", desc: "Primera jornada de partidos", color: "from-[#144C9F] to-[#071F4A]" },
  { date: "10 ABR", title: "Inicio de Eliminatorias", desc: "Comienzan las fases finales", color: "from-gray-400 to-gray-600" },
  { date: "30 ABR", title: "Gran Final", desc: "Partido definitorio del campeonato", color: "from-[#39D17D] to-[#144C9F]" }
];

export function TorneoActualSection() {
  const navigate = useNavigate();
  return (
    <section id="schedule" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-[#39D17D] to-[#17A65B] text-white px-6 py-2 rounded-full text-sm font-bold">
              TORNEO 2026-I
            </span>
          </div>
          <AboutTitle>
            Información del <span className="text-[#17A65B]">Torneo Actual</span>
          </AboutTitle>
        </div>
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Tournament Details Card */}
          <div className="bg-gradient-to-br from-white to-gray-50 p-10 rounded-3xl border-2 border-gray-100 shadow-xl">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-3xl font-black text-[#071F4A] font-montserrat">
                TechCup 2026-I
              </h3>
              <div className="bg-gradient-to-r from-[#39D17D] to-[#17A65B] text-white px-5 py-2 rounded-xl font-bold text-sm shadow-lg">
                ACTIVO
              </div>
            </div>
            <div className="space-y-5">
              <div className="flex justify-between py-4 border-b-2 border-gray-100">
                <span className="text-gray-600 font-semibold">Estado:</span>
                <span className="text-[#17A65B] font-bold text-lg">{estado}</span>
              </div>
              <div className="flex justify-between py-4 border-b-2 border-gray-100">
                <span className="text-gray-600 font-semibold">Fecha de inicio:</span>
                <span className="font-bold text-[#071F4A]">{fechaInicio}</span>
              </div>
              <div className="flex justify-between py-4 border-b-2 border-gray-100">
                <span className="text-gray-600 font-semibold">Finalización:</span>
                <span className="font-bold text-[#071F4A]">{fechaFin}</span>
              </div>
              <div className="flex justify-between py-4 border-b-2 border-gray-100">
                <span className="text-gray-600 font-semibold">Equipos inscritos:</span>
                <div className="text-right">
                  <span className="font-bold text-[#071F4A] text-lg">{equiposInscritos} / {equiposMax}</span>
                  <div className="w-32 h-2.5 bg-gray-200 rounded-full mt-2">
                    <div className="h-full rounded-full" style={{ width: `${(equiposInscritos/equiposMax)*100}%`, background: 'linear-gradient(90deg, #39D17D 0%, #17A65B 50%, #144C9F 100%)' }}></div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between py-4">
                <span className="text-gray-600 font-semibold">Costo por equipo:</span>
                <span className="font-black text-[#071F4A] text-2xl">{costo}</span>
              </div>
            </div>
            <button
              className="w-full mt-8 bg-gradient-to-r from-[#39D17D] to-[#17A65B] text-white py-5 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-[#39D17D]/50 transition-all duration-300 hover:scale-105 transform"
              aria-label="Inscribir equipo al torneo"
              onClick={() => navigate("/login")}
            >
              Inscribir mi Equipo Ahora
            </button>
          </div>
          {/* Important Dates Card */}
          <div className="bg-gradient-to-br from-white to-gray-50 p-10 rounded-3xl border-2 border-gray-100 shadow-xl">
            <h3 className="text-3xl font-black text-[#071F4A] mb-8 font-montserrat">
              Fechas Importantes
            </h3>
            <div className="space-y-6">
              {importantDates.map((item, index) => (
                <div key={index} className="flex gap-5 items-start group hover:translate-x-3 transition-transform duration-200">
                  <div className={`bg-gradient-to-br ${item.color} text-white px-4 py-3 rounded-xl text-xs font-black h-fit min-w-[70px] text-center shadow-lg`}>
                    {item.date}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-[#071F4A] text-lg mb-1" style={{fontFamily: 'Montserrat, sans-serif'}}>{item.title}</p>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TorneoActualSection;
