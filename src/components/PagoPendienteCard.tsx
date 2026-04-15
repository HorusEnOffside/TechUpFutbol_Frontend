import { FileText, CheckCircle, XCircle } from "lucide-react";
import React from "react";

export interface PagoPendienteCardProps {
  equipo: string;
  monto: number;
  fecha: string;
  onVer: () => void;
  onAprobar: () => void;
  onRechazar: () => void;
}

export function PagoPendienteCard({ equipo, monto, fecha, onVer, onAprobar, onRechazar }: PagoPendienteCardProps) {
  return (
    <div className="flex items-center justify-between rounded-xl p-4 shadow border border-gray-100 mb-2">
      <div>
        <div className="font-bold text-[#071F4A]">{equipo}</div>
        <div className="text-sm text-gray-500">${monto}</div>
        <div className="text-xs text-gray-400">Enviado: {fecha}</div>
      </div>
      <div className="flex gap-2">
        {/* Botón Ver */}
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white text-[#144C9F] font-semibold text-sm shadow-sm hover:bg-gray-50 transition"
          onClick={onVer}
        >
          <FileText className="w-5 h-5" /> Ver
        </button>
        {/* Botón Aprobar */}
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-600/50 text-white font-semibold text-sm shadow-sm hover:bg-green-600/80 transition"
          onClick={onAprobar}
        >
          <CheckCircle className="w-5 h-5" /> Aprobar
        </button>
        {/* Botón Rechazar */}
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/50 text-white font-semibold text-sm shadow-sm hover:bg-red-500/80 transition"
          onClick={onRechazar}
        >
          <XCircle className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
