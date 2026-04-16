import React, { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import type { PaymentStatus } from "../types/payment";

interface PagoDetalleCardProps {
  id: string;
  status: PaymentStatus;
  description: string;
  descripcionComprobante?: string;
  monto?: number;
  fecha?: string;
  urlComprobante?: string;
  onGuardar?: (nuevoEstado: PaymentStatus, observacion: string) => void;
  onAprobar?: () => void;
  onRechazar?: () => void;
  editable?: boolean;
}

const statusOptions: { value: PaymentStatus; label: string }[] = [
  { value: "PENDING", label: "Pendiente" },
  { value: "APPROVED", label: "Aprobado" },
  { value: "REJECTED", label: "Rechazado" },
];



export const PagoDetalleCard: React.FC<PagoDetalleCardProps> = ({
  id,
  status,
  description,
  descripcionComprobante,
  monto,
  fecha,
  urlComprobante,
  onAprobar,
  onRechazar,
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
              "bg-yellow-500/20 text-yellow-300"}`}>{
                statusOptions.find(opt => opt.value === status)?.label || status
            }</span>
          </div>
        </div>
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
        <div className="flex gap-2 mt-2">
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-600/50 text-white font-semibold text-sm shadow-sm hover:bg-green-600/80 transition"
            onClick={onAprobar}
          >
            <CheckCircle className="w-5 h-5" /> Aprobar
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/50 text-white font-semibold text-sm shadow-sm hover:bg-red-500/80 transition"
            onClick={onRechazar}
          >
            <XCircle className="w-5 h-5" /> Rechazar
          </button>
        </div>
      </div>
      {/* Columna derecha: foto comprobante */}
      {urlComprobante && (
        <div className="flex-shrink-0 flex items-center justify-center md:w-64 w-full mt-6 md:mt-0">
          <img
            src={urlComprobante}
            alt="Comprobante de pago"
            className="rounded-xl border border-white/20 max-h-64 object-contain bg-white/10"
          />
        </div>
      )}
    </div>
  );
};
