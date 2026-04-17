import { NavBarTransparent } from "../components/NavBarTransparent";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Textarea";
import { Button } from "../components/ui/Button";
import canchaImg from "../assets/cancha.png";
import { useNavigate } from "react-router";
import { useState } from "react";

export default function OrganizadorCreationTournamentPage() {
  const navigate = useNavigate();

  // Estados del formulario
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [maxEquipos, setMaxEquipos] = useState("");
  const [costoEquipo, setCostoEquipo] = useState("");
  const [enviando] = useState(false);
  const [costoEquipoError, setCostoEquipoError] = useState("");
  const [maxEquiposError, setMaxEquiposError] = useState("");
  // Paso 2: configuración avanzada
  const [showConfig, setShowConfig] = useState(false);
  const [reglamento, setReglamento] = useState("");
  const [closingDate, setClosingDate] = useState("");
  const [sanciones, setSanciones] = useState("");
  // Canchas: [{ nombre, foto }]
  type Cancha = { nombre: string; foto: File | null };
  const [canchas, setCanchas] = useState<Cancha[]>([{ nombre: "", foto: null }]);
  // Horarios: [{ fecha, descripcion }]
  const [horarios, setHorarios] = useState([{ fecha: "", descripcion: "" }]);

  // Validación simple: todos los campos requeridos deben estar llenos
  const formularioValido =
    fechaInicio && fechaFin && maxEquipos && costoEquipo;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formularioValido) return;
    setShowConfig(true);
  };

  // Handlers para canchas
  const handleCanchaChange = (idx: number, field: string, value: string) => {
    setCanchas((prev) => prev.map((c, i) => i === idx ? { ...c, [field]: value } : c));
  };
  const addCancha = () => setCanchas((prev) => [...prev, { nombre: "", foto: null }]);
  const removeCancha = (idx: number) => setCanchas((prev) => prev.filter((_, i) => i !== idx));

  // Handlers para horarios
  const handleHorarioChange = (idx: number, field: string, value: string) => {
    setHorarios((prev) => prev.map((h, i) => i === idx ? { ...h, [field]: value } : h));
  };
  const addHorario = () => setHorarios((prev) => [...prev, { fecha: "", descripcion: "" }]);
  const removeHorario = (idx: number) => setHorarios((prev) => prev.filter((_, i) => i !== idx));
  return (
    <div className="min-h-screen w-full overflow-hidden relative">
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

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
  

            <section className="mb-12 mt-16">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Banner principal */}
                <div className="flex-1 rounded-2xl shadow-2xl overflow-hidden border-2 border-[#144C9F]/30" style={{background: "rgba(7,31,74,0.92)"}}>
                  <div className="flex flex-col items-start gap-2 px-10 py-8">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="inline-flex items-center gap-2 bg-[#17A65B]/20 border border-[#39D17D]/40 text-[#39D17D] px-4 py-1.5 rounded-full text-sm font-semibold backdrop-blur-sm">
                        <span className="w-2 h-2 bg-[#39D17D] rounded-full animate-pulse" aria-hidden="true" />
                        Organizador
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-white/40 text-xs"></span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-1" style={{fontFamily: 'Montserrat, sans-serif'}}>Creacion de Torneo</h2>
                    <p className="text-base md:text-lg text-white/80">Crea y gestiona tu torneo</p>
                  </div>
                </div>
              </div>
            </section>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">    
            <div className="lg:col-span-3 rounded-2xl p-8 shadow-2xl border-2 border-[#144C9F]/30 flex flex-col" style={{background: "rgba(7,31,74,0.92)"}}>
                <div className="text-[#39D17D] font-black text-2xl mb-6" style={{fontFamily: 'Montserrat, sans-serif'}}>
                  {showConfig ? 'Configuración de Torneo' : 'Formulario de Creación de Torneo'}
                </div>
                <div className="flex flex-col gap-8">
                  {!showConfig ? (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                      {/* Fechas */}
                      <div className="rounded-xl bg-white/10 border border-white/20 p-6">
                        <h3 className="font-bold text-lg mb-4 text-[#39D17D]">Fechas</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input
                            label="Fecha de inicio"
                            type="datetime-local"
                            required
                            value={fechaInicio}
                            onChange={e => setFechaInicio(e.target.value)}
                          />
                          <Input
                            label="Fecha de fin"
                            type="datetime-local"
                            required
                            value={fechaFin}
                            onChange={e => setFechaFin(e.target.value)}
                          />
                        </div>
                      </div>
                      {/* Equipos y costo */}
                      <div className="rounded-xl bg-white/10 border border-white/20 p-6">
                        <h3 className="font-bold text-lg mb-4 text-[#39D17D]">Equipos</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input
                            label="Máximo de equipos"
                            type="number"
                            min={2}
                            required
                            value={maxEquipos}
                            error={maxEquiposError}
                            onChange={e => {
                              setMaxEquipos(e.target.value);
                              if (e.target.value && parseInt(e.target.value) < 2) {
                                setMaxEquiposError('Debe ser al menos 2 equipos.');
                              } else {
                                setMaxEquiposError('');
                              }
                            }}
                            onInvalid={e => {
                              e.preventDefault();
                              setMaxEquiposError('Debe ser al menos 2 equipos.');
                            }}
                          />
                          <Input
                            label="Costo por equipo"
                            type="number"
                            min={1}
                            required
                            value={costoEquipo}
                            error={costoEquipoError}
                            onChange={e => {
                              setCostoEquipo(e.target.value);
                              if (e.target.value && parseInt(e.target.value) < 1) {
                                setCostoEquipoError('El costo debe ser mayor a 0.');
                              } else {
                                setCostoEquipoError('');
                              }
                            }}
                            onInvalid={e => {
                              e.preventDefault();
                              setCostoEquipoError('El costo debe ser mayor a 0.');
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button
                          type="submit"
                          className={formularioValido && !enviando ? "bg-green-600/80 text-white hover:bg-green-600" : "bg-gray-400 text-white cursor-not-allowed"}
                          disabled={!formularioValido || enviando}
                          loading={enviando}
                        >
                          Siguiente
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <form className="flex flex-col gap-8">
                      {/* Reglamento y sanciones */}
                      <div className="rounded-xl bg-white/10 border border-white/20 p-6">
                        <h3 className="font-bold text-lg mb-4 text-[#39D17D]">Reglamento y Sanciones</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Textarea
                            label="Reglamento"
                            maxLength={2000}
                            placeholder="Escribe aquí el reglamento del torneo..."
                            value={reglamento}
                            onChange={e => setReglamento(e.target.value)}
                          />
                          <Textarea
                            label="Sanciones"
                            maxLength={2000}
                            placeholder="Describe aquí las sanciones del torneo..."
                            value={sanciones}
                            onChange={e => setSanciones(e.target.value)}
                          />
                        </div>
                        <div className="mt-4">
                          <Input
                            label="Fecha de cierre de inscripciones"
                            type="datetime-local"
                            value={closingDate}
                            onChange={e => setClosingDate(e.target.value)}
                          />
                        </div>
                      </div>
                      
                      {/* Horarios */}
                      <div className="rounded-xl bg-white/10 border border-white/20 p-6">
                        <h3 className="font-bold text-lg mb-4 text-[#39D17D]">Horarios</h3>
                        {horarios.map((horario, idx) => (
                          <div key={horario.fecha + horario.descripcion + idx} className="flex flex-col md:flex-row gap-4 mb-4 items-end">
                            <div className="flex-1">
                              <Input
                                label="Fecha"
                                type="date"
                                value={horario.fecha}
                                onChange={e => handleHorarioChange(idx, 'fecha', e.target.value)}
                              />
                            </div>
                            <div className="flex-1">
                              <Input
                                label="Descripción"
                                type="text"
                                value={horario.descripcion}
                                onChange={e => handleHorarioChange(idx, 'descripcion', e.target.value)}
                              />
                            </div>
                            <Button type="button" className="text-red-400 font-bold px-2" onClick={() => removeHorario(idx)} disabled={horarios.length === 1}>Eliminar</Button>
                          </div>
                        ))}
                        <Button type="button" className="mt-2 px-4 py-2 rounded bg-[#39D17D] text-white font-semibold" onClick={addHorario}>Agregar horario</Button>
                      </div>
                      <div className="flex justify-end">
                        <Button type="button" className="bg-green-600/80 text-white hover:bg-green-600">Guardar configuración</Button>
                      </div>
                    </form>
                  )}
                </div>
            </div>
          </section>
        </div>
    </div>
  );
}
