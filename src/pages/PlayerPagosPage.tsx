
import { useRef, useState } from "react";
import { Loader2, AlertCircle, UploadCloud, Users } from "lucide-react";
import { NavBarTransparent } from "../components/NavBarTransparent";
import canchaImg from "../assets/cancha.png";

export default function PlayerPagosPage() {
  const [comprobante, setComprobante] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const equipo = "Mi Equipo"; // TODO: Reemplazar por el nombre real del equipo
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setComprobante(file);
    setPreview(file ? URL.createObjectURL(file) : null);
    setSuccess(false);
    setError(null);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comprobante) return;
    setLoading(true);
    setError(null);
    setSuccess(false);
    // Simulación de subida
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#050d1a]">
      {/* Fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${canchaImg})`,
          filter: "blur(3px) brightness(0.35)",
          transform: "scale(1.06)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgba(5,13,26,0.92) 0%, rgba(7,31,74,0.75) 40%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 85% 55%, rgba(23,166,91,0.22) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <NavBarTransparent />

      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        {/* Badge estado */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <span className="inline-flex items-center gap-2 bg-[#17A65B]/20 border border-[#39D17D]/40 text-[#39D17D] px-4 py-1.5 rounded-full text-sm font-semibold backdrop-blur-sm">
            <Users className="w-4 h-4 text-[#39D17D]" aria-hidden="true" />
            Pagos de Equipo
          </span>
          <span className="inline-flex items-center gap-1.5 text-white/40 text-xs">
            Sube el comprobante de pago de tu equipo
          </span>
        </div>

        {/* Tarjeta */}
        <div
          className="w-full max-w-2xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
          style={{ background: "rgba(5, 13, 26, 0.70)", backdropFilter: "blur(16px)" }}
        >
          {/* Encabezado */}
          <div
            className="px-6 sm:px-8 py-5 flex items-center gap-3"
            style={{ background: "linear-gradient(90deg, #144C9F 0%, #17A65B 100%)" }}
          >
            <UploadCloud className="w-6 h-6 text-[#39D17D] shrink-0" aria-hidden="true" />
            <h1
              className="text-white text-2xl sm:text-3xl tracking-wide"
              style={{ fontFamily: "'Russo One', sans-serif" }}
            >
              Subir Comprobante de Pago
            </h1>
          </div>

          <form className="flex flex-col gap-6 px-6 sm:px-8 py-8" onSubmit={handleUpload}>
            {/* Nombre del equipo */}
            <div>
              <label className="block text-white/80 mb-1 font-semibold">Nombre del equipo</label>
              <div className="bg-[#F7F9FA] border border-gray-200 rounded-xl px-4 py-3 text-[#071F4A] font-bold">
                {equipo}
              </div>
            </div>
            {/* Comprobante */}
            <div>
              <label className="block text-white/80 mb-1 font-semibold">Comprobante de pago</label>
              <input
                type="file"
                accept="image/*,application/pdf"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#17A65B]/10 file:text-[#17A65B] hover:file:bg-[#17A65B]/20"
              />
              {preview && (
                <div className="mt-4">
                  <span className="block text-sm text-gray-400 mb-2">Vista previa:</span>
                  {preview.endsWith('.pdf') ? (
                    <a href={preview} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Ver PDF</a>
                  ) : (
                    <img src={preview} alt="Comprobante" className="max-h-48 rounded-lg border mt-2" />
                  )}
                </div>
              )}
            </div>
            {/* Mensajes */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-4 gap-2 text-white/50">
                <Loader2 className="w-6 h-6 animate-spin text-[#39D17D]" />
                <p className="text-sm">Subiendo comprobante…</p>
              </div>
            )}
            {error && (
              <div className="flex flex-col items-center justify-center py-4 gap-2 text-white/50">
                <AlertCircle className="w-6 h-6 text-red-400" />
                <p className="text-sm">{error}</p>
              </div>
            )}
            {success && (
              <div className="text-green-600 font-semibold mt-2">¡Comprobante subido correctamente!</div>
            )}
            <button
              type="submit"
              className="bg-gradient-to-r from-[#17A65B] to-[#144C9F] text-white font-bold py-3 rounded-2xl text-lg hover:opacity-90 transition disabled:opacity-60"
              disabled={!comprobante || loading}
            >
              Subir comprobante
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
