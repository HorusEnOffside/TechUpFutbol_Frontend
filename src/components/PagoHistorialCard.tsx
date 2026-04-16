import React, { useState } from "react";
import type { PaymentStatus } from "../types/payment";

interface PagoHistorialCardProps {
  id: string;
  status: PaymentStatus;
  description: string;
  descripcionComprobante?: string;
  monto?: number;
  fecha?: string;
  urlComprobante?: string;
}

const statusOptions: { value: PaymentStatus; label: string }[] = [
  { value: "PENDING", label: "Pendiente" },
  { value: "IN_REVIEW", label: "En revisión" },
  { value: "APPROVED", label: "Aprobado" },
  { value: "REJECTED", label: "Rechazado" },
];

export const PagoHistorialCard: React.FC<PagoHistorialCardProps> = ({
  id,
  status,
  description,
  descripcionComprobante,
  monto,
  fecha,
  urlComprobante,
}) => {
  return (
    <div className="rounded-2xl p-6 bg-white/5 border-2 border-[#144C9F]/30 shadow-xl flex flex-col md:flex-row gap-6 text-white">
      {/* Columna izquierda: datos */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
          <div className="font-bold text-base md:text-lg">
            Id Comprobante: <span className="text-[#39D17D]">{id}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">Estado:</span>
            <span className={`px-3 py-1 rounded-lg font-bold ${
              status === "APPROVED" ? "bg-green-600/30 text-green-300" :
              status === "REJECTED" ? "bg-red-600/30 text-red-300" :
              status === "IN_REVIEW" ? "bg-blue-600/30 text-blue-300" :
              "bg-yellow-500/20 text-yellow-300"}`}>{
                statusOptions.find(opt => opt.value === status)?.label || status
            }</span>
          </div>
        </div>
        <div className="font-medium text-white/90">{description}</div>
        {descripcionComprobante && (
          <div>
            <span className="font-semibold">Descripción del comprobante:</span>
            <div className="w-full mt-1 px-1 py-1 text-white/90 font-medium bg-transparent">
              {descripcionComprobante}
            </div>
          </div>
        )}
        {monto !== undefined && (
          <div className="bg-[#144C9F]/80 rounded-xl p-4 text-white font-bold text-lg mt-2">
            Monto: {monto.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })}
          </div>
        )}
        {fecha && (
          <div className="text-xs text-white/60">Fecha: {new Date(fecha).toLocaleString('es-CO')}</div>
        )}
      </div>
      {/* Columna derecha: foto comprobante */}
      <div className="flex-shrink-0 flex items-center justify-center md:w-64 w-full mt-6 md:mt-0">
        {urlComprobante ? (
          <ComprobanteImage url={urlComprobante} />
        ) : (
          <div className="w-full h-40 rounded-xl border border-white/20 flex items-center justify-center bg-white/10 text-white/60 text-center">
            [Foto del comprobante]
          </div>
        )}
      </div>
    </div>
  );
};

// Componente auxiliar para manejar carga y error de la imagen
const ComprobanteImage: React.FC<{ url: string }> = ({ url }) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  return error ? (
    <div className="w-full h-40 rounded-xl border border-white/20 flex items-center justify-center bg-white/10 text-red-300 text-center">
      Error al cargar la imagen
    </div>
  ) : (
    <img
      src={url}
      alt="Comprobante de pago"
      className="rounded-xl border border-white/20 max-h-64 object-contain bg-white/10 w-full h-40"
      onError={() => setError(true)}
      onLoad={() => setLoaded(true)}
      style={{ display: loaded ? 'block' : 'none' }}
    />
  );
};
