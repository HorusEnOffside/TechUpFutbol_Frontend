import { useState, useRef, useEffect } from "react";
import { Pencil, Check, X, Upload, User, LogOut, Loader2 } from "lucide-react";
import { BackButton } from "../components/BackButton";
import { useNavigate } from "react-router";
import PlayerService from "../services/player.service";
import type { PlayerResponseDTO, Position } from "../types/player";
import { useAuth } from "../store/AuthContext";
import logoBlanco from "../assets/logoBlanco.png";
import canchaImg from "../assets/cancha.png";

const POSITION_LABELS: Record<Position, string> = {
  GOALKEEPER: "Portero",
  DEFENDER:   "Defensa",
  MIDFIELDER: "Mediocampo",
  FORWARD:    "Delantero",
};

const POSITIONS: Position[] = ["GOALKEEPER", "DEFENDER", "MIDFIELDER", "FORWARD"];

const SEMESTERS = Array.from({ length: 10 }, (_, i) => i + 1);

type Availability = "Para jugar" | "No disponible" | "Lesionado";
const AVAILABILITIES: Availability[] = ["Para jugar", "No disponible", "Lesionado"];

// campo editable
function EditableField({
  label,
  value,
  onSave,
  children,
}: {
  label: string;
  value: string;
  onSave?: (v: string) => void;
  children?: (setEdit: (v: boolean) => void) => React.ReactNode;
}) {
  const [editing, setEditing] = useState(false);
  const [draft,   setDraft]   = useState(value);

  function confirm() {
    onSave?.(draft);
    setEditing(false);
  }

  return (
    <div className="flex items-center justify-between border-b border-white/10 py-3 gap-4">
      <span className="text-white/50 text-sm min-w-[120px]">{label}</span>
      {editing ? (
        <div className="flex items-center gap-2 flex-1 justify-end">
          {children ? (
            children(setEditing)
          ) : (
            <input
              autoFocus
              value={draft}
              onChange={e => setDraft(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-white text-sm focus:outline-none focus:border-[#39D17D] w-32 text-right"
            />
          )}
          <button onClick={confirm} className="text-[#39D17D] hover:text-white transition-colors">
            <Check className="w-4 h-4" />
          </button>
          <button onClick={() => setEditing(false)} className="text-white/40 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <span
            className="text-white font-semibold text-sm"
            style={{ fontFamily: "'Russo One', sans-serif" }}
          >
            {value}
          </span>
          {onSave && (
            <button
              onClick={() => { setDraft(value); setEditing(true); }}
              className="text-white/30 hover:text-[#39D17D] transition-colors"
              aria-label={`Editar ${label}`}
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function getUserIdFromToken(): string | null {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1])) as Record<string, unknown>;
    return (payload.sub ?? payload.id ?? null) as string | null;
  } catch {
    return null;
  }
}

// pagina principal
export default function SportsProfilePage() {
  const { user, logout } = useAuth();
  const navigate         = useNavigate();

  function handleLogout() {
    logout();
    navigate("/auth", { replace: true });
  }
  const fileInputRef     = useRef<HTMLInputElement>(null);

  const [player,       setPlayer]       = useState<PlayerResponseDTO | null>(null);
  const [loading,      setLoading]      = useState(true);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // campos editables
  const [position,     setPosition]     = useState<Position>("FORWARD");
  const [semester,     setSemester]     = useState<number>(1);
  const [availability, setAvailability] = useState<Availability>("Para jugar");
  const [dateOfBirth,  setDateOfBirth]  = useState<string>("");
  const [dorsalNumber, setDorsalNumber] = useState<number>(1);

  const [saving,       setSaving]       = useState(false);
  const [saveMsg,      setSaveMsg]      = useState<{ ok: boolean; text: string } | null>(null);

  // Estadísticas (mock hasta que el backend las exponga)
  const stats = { goals: 0, assists: 0, cards: 0 };

  const AVAILABILITY_TO_STATUS: Record<Availability, 'AVAILABLE' | 'INJURED' | 'NOT_AVAILABLE'> = {
    "Para jugar":    "AVAILABLE",
    "No disponible": "NOT_AVAILABLE",
    "Lesionado":     "INJURED",
  };

  async function handleSave() {
    const userId = getUserIdFromToken() ?? user?.id;
    if (!userId) return;
    setSaving(true);
    setSaveMsg(null);
    try {
      if (!player) {
        const created = await PlayerService.linkSportsProfile(userId, position, dorsalNumber);
        setPlayer(created);
        setSaveMsg({ ok: true, text: "Perfil deportivo creado correctamente." });
      } else {
        await PlayerService.updateStatus(userId, AVAILABILITY_TO_STATUS[availability]);
        setSaveMsg({ ok: true, text: "Cambios guardados correctamente." });
      }
    } catch {
      setSaveMsg({ ok: false, text: "No se pudieron guardar los cambios." });
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    const userId = getUserIdFromToken() ?? user?.id;
    if (!userId) { setLoading(false); return; }
    PlayerService.getPlayerByUserId(userId)
      .then(data => {
        setPlayer(data);
        setPosition(data.position);
        setDateOfBirth(data.dateOfBirth ?? "");
      })
      .catch(() => setPlayer(null))
      .finally(() => setLoading(false));
  }, [user?.id]);

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setPhotoPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  // Calcular edad desde dateOfBirth
  function calcAge(dob?: string): number {
    if (!dob) return 0;
    const today = new Date();
    const birth = new Date(dob);
    let age = today.getFullYear() - birth.getFullYear();
    if (
      today.getMonth() < birth.getMonth() ||
      (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())
    ) age--;
    return age;
  }

  const displayName = player?.name ?? user?.mail ?? "Jugador";
  const age         = calcAge(dateOfBirth);

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#050d1a]">
      <BackButton />

      {/* ── Fondo ── */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${canchaImg})`,
          filter: "blur(3px) brightness(0.28)",
          transform: "scale(1.06)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(110deg, rgba(5,13,26,0.97) 0%, rgba(7,31,74,0.85) 40%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 88% 60%, rgba(23,166,91,0.28) 0%, transparent 55%)",
        }}
        aria-hidden="true"
      />

      {/* ── Navbar simplificado (sin "Mi Cuenta" — esta pantalla ES la cuenta) ── */}
      <nav className="absolute top-0 inset-x-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <button onClick={() => navigate("/")} aria-label="Inicio">
              <img src={logoBlanco} alt="Tech Cup Fútbol" className="h-14 w-auto" />
            </button>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm text-white text-sm hover:bg-white/20 transition-all"
              aria-label="Volver"
            >
              <LogOut className="w-4 h-4 rotate-180" />
              <span className="hidden sm:inline">Volver</span>
            </button>
          </div>
        </div>
      </nav>

      {/* ── Contenido ── */}
      <main className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {loading ? (
          <div className="text-white/50 text-sm animate-pulse">Cargando perfil…</div>
        ) : (
          <div className="w-full max-w-5xl flex flex-col lg:flex-row items-center gap-10">

            {/* ── Panel izquierdo: info ── */}
            <div className="w-full lg:w-1/2 flex flex-col gap-0">

              {/* Nombre grande */}
              <h1
                className="text-white text-4xl sm:text-5xl mb-6 leading-tight"
                style={{ fontFamily: "'Russo One', sans-serif", textShadow: "0 2px 20px rgba(0,0,0,0.7)" }}
              >
                {displayName}
              </h1>

              {/* Card con datos */}
              <div
                className="rounded-2xl border border-white/10 overflow-hidden"
                style={{ background: "rgba(5,13,26,0.72)", backdropFilter: "blur(16px)" }}
              >
                {/* Encabezado */}
                <div
                  className="px-6 py-4"
                  style={{ background: "linear-gradient(90deg, #144C9F 0%, #17A65B 100%)" }}
                >
                  <p className="text-white font-semibold text-sm tracking-wide" style={{ fontFamily: "'Russo One', sans-serif" }}>
                    Mi Perfil
                  </p>
                </div>

                <div className="px-6 py-2">
                  {/* Semestre */}
                  <EditableField
                    label="Semestre"
                    value={`Semestre ${semester}`}
                    onSave={() => {}}
                  >
                    {(setEdit) => (
                      <select
                        autoFocus
                        value={semester}
                        onChange={e => { setSemester(Number(e.target.value)); setEdit(false); }}
                        className="bg-[#071F4A] border border-white/20 rounded-lg px-3 py-1 text-white text-sm focus:outline-none"
                      >
                        {SEMESTERS.map(s => (
                          <option key={s} value={s}>Semestre {s}</option>
                        ))}
                      </select>
                    )}
                  </EditableField>

                  {/* Fecha de nacimiento / Edad */}
                  <EditableField
                    label="Fecha de nac."
                    value={dateOfBirth ? `${dateOfBirth}${age > 0 ? ` (${age} años)` : ""}` : "—"}
                    onSave={() => {}}
                  >
                    {(setEdit) => (
                      <input
                        autoFocus
                        type="date"
                        value={dateOfBirth}
                        onChange={e => setDateOfBirth(e.target.value)}
                        onBlur={() => setEdit(false)}
                        className="bg-[#071F4A] border border-white/20 rounded-lg px-3 py-1 text-white text-sm focus:outline-none colorScheme-dark"
                        style={{ colorScheme: "dark" }}
                      />
                    )}
                  </EditableField>

                  {/* Posición */}
                  <EditableField
                    label="Posición"
                    value={POSITION_LABELS[position]}
                    onSave={() => {}}
                  >
                    {(setEdit) => (
                      <select
                        autoFocus
                        value={position}
                        onChange={e => { setPosition(e.target.value as Position); setEdit(false); }}
                        className="bg-[#071F4A] border border-white/20 rounded-lg px-3 py-1 text-white text-sm focus:outline-none"
                      >
                        {POSITIONS.map(p => (
                          <option key={p} value={p}>{POSITION_LABELS[p]}</option>
                        ))}
                      </select>
                    )}
                  </EditableField>

                  {/* Dorsal */}
                  <EditableField
                    label="Dorsal"
                    value={String(dorsalNumber)}
                    onSave={() => {}}
                  >
                    {(setEdit) => (
                      <input
                        autoFocus
                        type="number"
                        min={1}
                        max={99}
                        value={dorsalNumber}
                        onChange={e => setDorsalNumber(Number(e.target.value))}
                        onBlur={() => setEdit(false)}
                        className="bg-[#071F4A] border border-white/20 rounded-lg px-3 py-1 text-white text-sm focus:outline-none w-20 text-right"
                      />
                    )}
                  </EditableField>

                  {/* Disponibilidad */}
                  <EditableField
                    label="Disponibilidad"
                    value={availability}
                    onSave={() => {}}
                  >
                    {(setEdit) => (
                      <select
                        autoFocus
                        value={availability}
                        onChange={e => { setAvailability(e.target.value as Availability); setEdit(false); }}
                        className="bg-[#071F4A] border border-white/20 rounded-lg px-3 py-1 text-white text-sm focus:outline-none"
                      >
                        {AVAILABILITIES.map(a => (
                          <option key={a} value={a}>{a}</option>
                        ))}
                      </select>
                    )}
                  </EditableField>
                </div>

                {/* Confirmar cambios */}
                <div className="px-6 pb-4 pt-2 flex flex-col gap-2">
                  {!player && (
                    <p className="text-xs text-white/35 italic">
                      Perfil deportivo no creado aún.
                    </p>
                  )}
                  {saveMsg && (
                    <p className={`text-xs font-medium ${saveMsg.ok ? "text-[#39D17D]" : "text-red-400"}`}>
                      {saveMsg.text}
                    </p>
                  )}
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-white font-bold text-sm transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ background: "linear-gradient(90deg, #144C9F, #17A65B)" }}
                  >
                    {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Guardando...</> : (!player ? "Crear perfil deportivo" : "Confirmar cambios")}
                  </button>
                </div>

                {/* Estadísticas */}
                <div className="px-6 pb-6 pt-4">
                  <p
                    className="text-white/50 text-xs uppercase tracking-widest mb-3"
                    style={{ fontFamily: "'Russo One', sans-serif" }}
                  >
                    Estadísticas del Torneo
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Goles",       icon: "⚽", value: stats.goals   },
                      { label: "Asistencias", icon: "🎯", value: stats.assists  },
                      { label: "Tarjetas",    icon: "🟨", value: stats.cards    },
                    ].map(({ label, icon, value }) => (
                      <div
                        key={label}
                        className="flex flex-col items-center gap-1 py-4 rounded-xl border border-white/10 bg-white/5"
                      >
                        <span className="text-2xl">{icon}</span>
                        <span
                          className="text-white text-xl font-bold"
                          style={{ fontFamily: "'Russo One', sans-serif" }}
                        >
                          {value}
                        </span>
                        <span className="text-white/40 text-xs">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── Panel derecho: foto ── */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center gap-4">
              <div
                className="relative w-64 h-64 rounded-full border-4 border-[#39D17D]/50 overflow-hidden cursor-pointer group shadow-2xl"
                style={{ boxShadow: "0 0 50px rgba(57,209,125,0.20)" }}
                onClick={() => fileInputRef.current?.click()}
              >
                {photoPreview ? (
                  <img src={photoPreview} alt="Foto perfil" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-white/5 flex flex-col items-center justify-center text-white/30">
                    <User className="w-20 h-20 mb-2" />
                    <span className="text-xs">Subir foto</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Upload className="w-10 h-10 text-white" />
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />

              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-5 py-2 rounded-xl border border-white/20 bg-white/5 text-white/60 text-sm hover:bg-white/10 transition-all"
              >
                <Upload className="w-4 h-4" />
                {photoPreview ? "Cambiar foto" : "Subir foto"}
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-5 py-2 rounded-xl border border-red-500/40 bg-red-900/20 text-red-400 text-sm hover:bg-red-900/40 hover:border-red-500/70 transition-all"
              >
                <LogOut className="w-4 h-4" />
                Cerrar sesión
              </button>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}
