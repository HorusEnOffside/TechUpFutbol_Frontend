import React from "react";
import AboutTitle from "../AboutTitle";
import AboutStep from "../AboutStep";

import carruselLogin3 from "../../../assets/carruselLogin3.jpeg";

interface Step {
  title: string;
  description: string;
}

interface ComoParticiparSectionProps {
  steps?: Step[];
  className?: string;
}

const defaultSteps: Step[] = [
  {
    title: "Regístrate",
    description: "Crea tu cuenta con correo institucional o Gmail",
  },
  {
    title: "Forma tu Equipo",
    description: "Crea o únete a un equipo de 7 a 12 jugadores",
  },
  {
    title: "Completa el Pago",
    description: "El capitán sube el comprobante de inscripción",
  },
  {
    title: "¡A Jugar!",
    description: "Consulta horarios y arma tu alineación",
  },
];


export function ComoParticiparSection({ steps = defaultSteps, className = "" }: ComoParticiparSectionProps) {
  return (
    <div
      id="como-participar"
      className={`relative rounded-3xl overflow-hidden max-w-7xl mx-auto ${className}`}
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(57,209,125,0.85) 0%, rgba(23,166,91,0.75) 35%, rgba(20,76,159,0.65) 70%, rgba(7,31,74,0.6) 100%), url(${carruselLogin3})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full -ml-24 -mb-24"></div>
      </div>
      <section className="relative p-10 lg:p-16 text-white">
        <h3 className="text-3xl lg:text-4xl font-black mb-12 text-center font-montserrat">
          ¿Cómo Participar?
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div className="text-center group" key={step.title}>
              <div className={`w-20 h-20 ${idx === 3 ? "bg-[#39D17D]" : "bg-white/20 backdrop-blur-md border-2 border-white/30"} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 ${idx === 3 ? "shadow-lg" : ""}`}>
                <span className="text-4xl font-black">{idx + 1}</span>
              </div>
              <h4 className="font-bold text-xl mb-3">{step.title}</h4>
              <p className="text-white/90 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ComoParticiparSection;
