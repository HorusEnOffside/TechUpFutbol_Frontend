import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { NavBarTransparent } from '../components/NavBarTransparent';
import canchaImg from '../assets/cancha.png';
import cartaVacia from '../assets/CartaVacia.png';
import p1 from '../assets/sj_player1.png';
import p2 from '../assets/sj_player2.png';
import p3 from '../assets/sj_player3.png';
import p4 from '../assets/sj_player4.png';
import p5 from '../assets/sj_player5.png';
import p6 from '../assets/sj_player6.png';

type Player = { id: number; img: string; pos: string; name: string; career: string };
type Slot   = { x: number; y: number; pos: string };
type DragSrc =
  | { from: 'bank';    player: Player }
  | { from: 'field';   player: Player; fieldIdx: number }
  | { from: 'reserve'; player: Player; resIdx: number };

const INITIAL_BANK: Player[] = [
  { id: 1, img: p1, pos: 'DL', name: 'Juan David', career: 'Ing. Sistemas'    },
  { id: 2, img: p2, pos: 'MF', name: 'Mariana',    career: 'Diseño Gráfico'   },
  { id: 3, img: p3, pos: 'DF', name: 'Sebastián',  career: 'Ing. Civil'       },
  { id: 4, img: p4, pos: 'DF', name: 'Camilo',     career: 'Administración'   },
  { id: 5, img: p5, pos: 'PT', name: 'Isaac',      career: 'Ing. Industrial'  },
  { id: 6, img: p6, pos: 'MF', name: 'Andrés',     career: 'Economía'         },
];

const FORMATIONS: Record<string, { label: string; slots: Slot[] }> = {
  '3-2-1': { label: '3 - 2 - 1', slots: [
    { x: 50, y: 84, pos: 'PT' },
    { x: 20, y: 64, pos: 'DF' }, { x: 50, y: 64, pos: 'DF' }, { x: 80, y: 64, pos: 'DF' },
    { x: 33, y: 41, pos: 'MF' }, { x: 67, y: 41, pos: 'MF' },
    { x: 50, y: 18, pos: 'DL' },
  ]},
  '1-3-2': { label: '1 - 3 - 2', slots: [
    { x: 50, y: 84, pos: 'PT' },
    { x: 50, y: 64, pos: 'DF' },
    { x: 17, y: 43, pos: 'MF' }, { x: 50, y: 43, pos: 'MF' }, { x: 83, y: 43, pos: 'MF' },
    { x: 33, y: 20, pos: 'DL' }, { x: 67, y: 20, pos: 'DL' },
  ]},
  '2-3-1': { label: '2 - 3 - 1', slots: [
    { x: 50, y: 84, pos: 'PT' },
    { x: 28, y: 66, pos: 'DF' }, { x: 72, y: 66, pos: 'DF' },
    { x: 17, y: 43, pos: 'MF' }, { x: 50, y: 43, pos: 'MF' }, { x: 83, y: 43, pos: 'MF' },
    { x: 50, y: 18, pos: 'DL' },
  ]},
};
const FORMATION_KEYS = Object.keys(FORMATIONS);

const POS_COLOR: Record<string, string> = {
  PT: '#f97316', DF: '#eab308', MF: '#3b82f6', DL: '#22c55e', AR: '#a855f7',
};

// ── Carta de jugador dinámica ──────────────────────────────────────────────────
function PlayerCard({ player, size = 'md' }: { player: Player; size?: 'sm' | 'md' }) {
  const color = POS_COLOR[player.pos] ?? '#fff';
  const isSmall = size === 'sm';
  return (
    <div className="relative w-full select-none" style={{ aspectRatio: '63/88' }}>
      {/* Fondo carta */}
      <img src={p1} alt="" className="absolute inset-0 w-full h-full object-fill" draggable={false} />

      {/* Posición */}
      <div className="absolute top-[7%] left-0 right-0 flex justify-center">
        <span style={{
          fontFamily: "'Russo One',sans-serif",
          fontSize: isSmall ? '28%' : '32%',
          color: '#ffffff',
          letterSpacing: '0.05em',
        }}>
          {player.pos}
        </span>
      </div>

      {/* Nombre */}
      <div className="absolute left-0 right-0 flex justify-center" style={{ bottom: '42%' }}>
        <p style={{
          fontFamily: "'Russo One',sans-serif",
          fontSize: isSmall ? '24%' : '27%',
          color: '#fff',
          lineHeight: 1.1,
          textAlign: 'center',
          background: 'rgba(0,0,0,0.45)',
          padding: '1% 6%',
          borderRadius: '3px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          maxWidth: '90%',
        }}>
          {player.name}
        </p>
      </div>

      {/* Carrera */}
      <div className="absolute left-0 right-0 text-center" style={{ bottom: '28%' }}>
        <p style={{
          fontFamily: 'sans-serif',
          fontSize: isSmall ? '22%' : '24%',
          color: 'rgba(255,255,255,0.60)',
          lineHeight: 1.1,
          padding: '0 4%',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {player.career}
        </p>
      </div>
    </div>
  );
}

function FieldSVG() {
  return (
    <svg viewBox="0 0 300 430" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      {Array.from({ length: 6 }).map((_, i) => (
        <rect key={i} x="0" y={i * 72} width="300" height="72" fill={i % 2 === 0 ? '#166534' : '#15803d'} />
      ))}
      <g stroke="rgba(255,255,255,0.75)" strokeWidth="1.5" fill="none">
        <rect x="8" y="8" width="284" height="414" rx="3" />
        <line x1="8" y1="215" x2="292" y2="215" />
        <circle cx="150" cy="215" r="40" /><circle cx="150" cy="215" r="2.5" fill="white" />
        <rect x="62" y="8" width="176" height="68" /><rect x="106" y="8" width="88" height="30" />
        <circle cx="150" cy="56" r="2.5" fill="white" />
        <rect x="62" y="354" width="176" height="68" /><rect x="106" y="392" width="88" height="30" />
        <circle cx="150" cy="374" r="2.5" fill="white" />
        <rect x="116" y="2" width="68" height="10" /><rect x="116" y="418" width="68" height="10" />
        <path d="M 96 76 A 42 42 0 0 1 204 76" /><path d="M 96 354 A 42 42 0 0 0 204 354" />
        <path d="M 8 22 A 11 11 0 0 1 20 8" /><path d="M 280 8 A 11 11 0 0 1 292 22" />
        <path d="M 292 400 A 11 11 0 0 1 280 422" /><path d="M 20 422 A 11 11 0 0 1 8 400" />
      </g>
    </svg>
  );
}

export function PlantillaPage() {
  const navigate = useNavigate();
  const [formIdx, setFormIdx]        = useState(0);
  const [fieldPlayers, setField]     = useState<(Player | null)[]>(() => Array(7).fill(null));
  const [reservePlayers, setReserve] = useState<(Player | null)[]>(() => Array(5).fill(null));
  const [bankPlayers, setBank]       = useState<Player[]>([...INITIAL_BANK]);
  const [rejected, setRejected]      = useState<string | null>(null);
  const [toast, setToast]            = useState<string | null>(null);
  const [draggingPlayer, setDraggingPlayer] = useState<Player | null>(null);
  const dragRef                      = useRef<DragSrc | null>(null);

  const formKey = FORMATION_KEYS[formIdx];
  const { label, slots } = FORMATIONS[formKey];

  // Requisitos — titulares siempre sobre 7
  const titularCount = fieldPlayers.filter(Boolean).length;
  const reserveCount = reservePlayers.filter(Boolean).length;
  const totalCount   = titularCount + reserveCount;
  const titOk  = titularCount === 7;
  const resOk  = reserveCount <= 5;
  const totOk  = totalCount <= 12;

  const REQS = [
    { label: `Titulares ${titularCount}/7`, ok: titOk },
    { label: `Reservas ${reserveCount}/5`,  ok: resOk },
    { label: `Total ${totalCount}/12`,      ok: totOk },
  ];

  const flash = (key: string, msg: string) => {
    setRejected(key);
    setToast(msg);
    setTimeout(() => setRejected(null), 500);
    setTimeout(() => setToast(null), 2200);
  };

  const changeFormation = (dir: 1 | -1) => {
    const all = [...fieldPlayers, ...reservePlayers].filter(Boolean) as Player[];
    setField(Array(slots.length).fill(null));
    setReserve(Array(5).fill(null));
    setBank(prev => [...prev, ...all]);
    setFormIdx(i => (i + dir + FORMATION_KEYS.length) % FORMATION_KEYS.length);
  };

  const applyDrop = (
    getTarget: (field: (Player|null)[], reserve: (Player|null)[], bank: Player[]) =>
      { field: (Player|null)[]; reserve: (Player|null)[]; bank: Player[] }
  ) => {
    setField(prev => {
      let f = [...prev], r = [...reservePlayers], b = [...bankPlayers];
      const result = getTarget(f, r, b);
      setReserve(result.reserve);
      setBank(result.bank);
      return result.field;
    });
    dragRef.current = null;
  };

  const removeSrc = (
    d: DragSrc,
    field: (Player|null)[], reserve: (Player|null)[], bank: Player[]
  ) => {
    if (d.from === 'bank')    bank.splice(bank.findIndex(p => p.id === d.player.id), 1);
    if (d.from === 'field')   field[d.fieldIdx]   = null;
    if (d.from === 'reserve') reserve[d.resIdx]   = null;
  };

  const dropOnField = (slotIdx: number) => {
    const d = dragRef.current;
    if (!d) return;
    if (d.player.pos !== slots[slotIdx].pos) {
      flash(`field-${slotIdx}`, `❌ Este slot es para ${slots[slotIdx].pos} — tu jugador es ${d.player.pos}`);
      dragRef.current = null; return;
    }
    applyDrop((f, r, b) => {
      const displaced = f[slotIdx];
      removeSrc(d, f, r, b);
      if (displaced) b.push(displaced);
      f[slotIdx] = d.player;
      return { field: f, reserve: r, bank: b };
    });
  };

  const dropOnReserve = (resIdx: number) => {
    const d = dragRef.current;
    if (!d) return;
    applyDrop((f, r, b) => {
      const displaced = r[resIdx];
      removeSrc(d, f, r, b);
      if (displaced) b.push(displaced);
      r[resIdx] = d.player;
      return { field: f, reserve: r, bank: b };
    });
  };

  const dropOnBank = () => {
    const d = dragRef.current;
    if (!d || d.from === 'bank') { dragRef.current = null; return; }
    applyDrop((f, r, b) => {
      removeSrc(d, f, r, b);
      b.push(d.player);
      return { field: f, reserve: r, bank: b };
    });
  };

  const CARD_W = 'clamp(44px, 4.8vw, 66px)';
  const BOTTOM_CARD_W = 'clamp(46px, 5vw, 68px)';

  return (
    <div className="relative overflow-hidden bg-[#050d1a] flex flex-col" style={{ height: '100dvh' }}>

      {/* Fondo */}
      <div className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${canchaImg})`, filter: 'blur(4px) brightness(0.18)', transform: 'scale(1.06)' }}
        aria-hidden="true" />
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg,rgba(5,13,26,0.97)0%,rgba(7,31,74,0.88)50%,rgba(5,13,26,0.97)100%)' }}
        aria-hidden="true" />

      <NavBarTransparent onLogoClick={() => navigate('/player/menu')} />

      {/* Toast de error posición */}
      <div
        className="absolute top-20 left-1/2 z-50 pointer-events-none"
        style={{
          transition: 'opacity 0.25s, transform 0.25s',
          opacity: toast ? 1 : 0,
          transform: toast ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(-12px)',
        }}
      >
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-500/40 shadow-2xl"
          style={{ background: 'rgba(30,5,5,0.95)', backdropFilter: 'blur(12px)' }}>
          <span className="text-red-400 text-sm" style={{ fontFamily: "'Russo One',sans-serif" }}>
            {toast}
          </span>
        </div>
      </div>

      {/* ── Cuerpo principal ── */}
      <div className="relative z-10 flex flex-1 min-h-0 gap-3 px-3 sm:px-4 pt-[72px]">

        {/* Sidebar */}
        <aside className="w-40 flex-shrink-0 flex flex-col gap-2.5 py-2 overflow-y-auto">

          {/* Formación */}
          <div className="rounded-xl p-3 border border-white/10"
            style={{ background: 'rgba(5,13,26,0.9)', backdropFilter: 'blur(12px)' }}>
            <p className="text-white/40 text-[9px] uppercase tracking-widest mb-2"
              style={{ fontFamily: "'Russo One',sans-serif" }}>Formación</p>
            <div className="flex items-center justify-between gap-1">
              <button onClick={() => changeFormation(-1)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all">‹</button>
              <span className="text-white text-sm" style={{ fontFamily: "'Russo One',sans-serif" }}>{label}</span>
              <button onClick={() => changeFormation(1)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all">›</button>
            </div>
          </div>

          {/* Requisitos */}
          <div className="rounded-xl p-3 border border-white/10"
            style={{ background: 'rgba(5,13,26,0.9)', backdropFilter: 'blur(12px)' }}>
            <p className="text-white/40 text-[9px] uppercase tracking-widest mb-2"
              style={{ fontFamily: "'Russo One',sans-serif" }}>Requisitos</p>
            <div className="flex flex-col gap-1.5">
              {REQS.map((req) => (
                <div key={req.label} className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${req.ok ? 'bg-green-400' : 'bg-red-500'}`} />
                  <span className="text-[11px]"
                    style={{ color: req.ok ? '#4ade80' : '#f87171', fontFamily: "'Russo One',sans-serif" }}>
                    {req.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Leyenda */}
          <div className="rounded-xl p-3 border border-white/10"
            style={{ background: 'rgba(5,13,26,0.9)', backdropFilter: 'blur(12px)' }}>
            <p className="text-white/40 text-[9px] uppercase tracking-widest mb-2"
              style={{ fontFamily: "'Russo One',sans-serif" }}>Posiciones</p>
            {Object.entries(POS_COLOR).map(([pos, color]) => (
              <div key={pos} className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full" style={{ background: color }} />
                <span className="text-white/55 text-[11px]" style={{ fontFamily: "'Russo One',sans-serif" }}>{pos}</span>
              </div>
            ))}
          </div>

          {/* Reglas */}
          <div className="rounded-xl overflow-hidden border border-white/10"
            style={{ background: 'rgba(5,13,26,0.9)', backdropFilter: 'blur(12px)' }}>
            <div className="px-3 py-2 flex items-center gap-1.5"
              style={{ background: 'linear-gradient(90deg,rgba(4,107,16,0.7)0%,rgba(4,21,107,0.7)100%)' }}>
              <svg className="w-3 h-3 text-white shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-white text-[10px]" style={{ fontFamily: "'Russo One',sans-serif" }}>Reglas</span>
            </div>
            <div className="p-2.5 flex flex-col gap-1.5">
              {['Máx. 12 jugadores.','7 titulares.','Hasta 5 suplentes.','Sin doble inscripción.','Cierre 1h antes.'].map((r, i) => (
                <div key={i} className="flex items-start gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-full text-[7px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5 text-white"
                    style={{ background: 'linear-gradient(135deg,rgba(4,107,16,0.9),rgba(4,21,107,0.9))' }}>{i+1}</span>
                  <p className="text-white/60 text-[10px] leading-snug">{r}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* ── Campo ── */}
        <div className="flex-1 flex items-center justify-center min-w-0 py-2" style={{ perspective: '1100px' }}>
          <div className="relative"
            style={{
              height: 'min(calc(100svh - 230px), 64svh, 530px)',
              aspectRatio: '300/430',
              transform: 'rotateX(24deg)',
              transformOrigin: 'center 85%',
              borderRadius: '10px',
              overflow: 'hidden',
              boxShadow: '0 50px 120px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.12)',
            }}>
            <FieldSVG />
            {slots.map((slot, i) => {
              const player     = fieldPlayers[i];
              const isRej      = rejected === `field-${i}`;
              const color      = POS_COLOR[slot.pos] ?? '#fff';
              const isMatch    = draggingPlayer && draggingPlayer.pos === slot.pos;
              const isMismatch = draggingPlayer && draggingPlayer.pos !== slot.pos;
              return (
                <div key={i} className="absolute"
                  style={{ left: `${slot.x}%`, top: `${slot.y}%`, transform: 'translate(-50%,-50%)', width: CARD_W, zIndex: 10 }}
                  onDragOver={e => e.preventDefault()}
                  onDrop={() => dropOnField(i)}>
                  {!player && (
                    <div className="absolute inset-0 pointer-events-none rounded"
                      style={{
                        border: `2px dashed ${isRej ? '#ef4444' : isMatch ? color : 'rgba(255,255,255,0.25)'}`,
                        opacity: isRej ? 1 : isMatch ? 1 : 0.4,
                        boxShadow: isMatch ? `0 0 12px 3px ${color}` : 'none',
                        transition: 'all 0.2s',
                      }} />
                  )}
                  {/* Pulso verde en slots compatibles */}
                  {isMatch && !player && (
                    <div className="absolute inset-0 pointer-events-none rounded animate-pulse"
                      style={{ background: `${color}22`, borderRadius: '6px' }} />
                  )}
                  {/* Oscurecer slots incompatibles */}
                  {isMismatch && !player && (
                    <div className="absolute inset-0 pointer-events-none rounded"
                      style={{ background: 'rgba(0,0,0,0.45)', borderRadius: '6px' }} />
                  )}
                  <div draggable={!!player}
                    onDragStart={player ? () => { dragRef.current = { from: 'field', player, fieldIdx: i }; setDraggingPlayer(player); } : undefined}
                    onDragEnd={() => setDraggingPlayer(null)}
                    style={{
                      cursor: player ? 'grab' : 'default',
                      filter: isRej ? 'drop-shadow(0 0 8px rgba(239,68,68,0.9))' : 'drop-shadow(0 3px 6px rgba(0,0,0,0.8))',
                      transform: isRej ? 'scale(0.92)' : 'scale(1)',
                      transition: 'transform 0.15s, filter 0.15s',
                      opacity: player ? 1 : 0.45,
                    }}>
                    {player
                      ? <PlayerCard player={player} size="sm" />
                      : <img src={cartaVacia} alt={slot.pos} className="w-full h-auto" style={{ opacity: 0.35 }} />}
                  </div>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-1 py-px rounded-full text-white whitespace-nowrap"
                    style={{ background: isRej ? '#ef4444' : color, fontFamily: "'Russo One',sans-serif", fontSize: '7px', fontWeight: 'bold' }}>
                    {slot.pos}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Barra inferior estilo FIFA ── */}
      <div className="relative z-10 flex-shrink-0 border-t border-white/10"
        style={{ background: 'rgba(5,13,26,0.95)', backdropFilter: 'blur(16px)' }}>

        <div className="flex items-stretch">

          {/* Reservas */}
          <div className="flex flex-col items-center justify-center px-3 py-1.5 border-r border-white/10 min-w-0">
            <p className="text-white/35 text-[8px] uppercase tracking-widest mb-1"
              style={{ fontFamily: "'Russo One',sans-serif" }}>Reservas</p>
            <div className="flex gap-1.5"
              onDragOver={e => e.preventDefault()}
              onDrop={() => dropOnBank()}>
              {reservePlayers.map((player, i) => (
                <div key={i} style={{ width: BOTTOM_CARD_W }}
                  onDragOver={e => e.preventDefault()}
                  onDrop={() => dropOnReserve(i)}>
                  <div draggable={!!player}
                    onDragStart={player ? () => { dragRef.current = { from: 'reserve', player, resIdx: i }; setDraggingPlayer(player); } : undefined}
                    onDragEnd={() => setDraggingPlayer(null)}
                    style={{ cursor: player ? 'grab' : 'default', filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.8))', opacity: player ? 1 : 0.45 }}>
                    {player
                      ? <PlayerCard player={player} size="sm" />
                      : <img src={cartaVacia} alt={`R${i}`} className="w-full h-auto" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Separador */}
          <div className="flex flex-col items-center justify-center px-2 py-1.5 border-r border-white/10">
            <p className="text-white/20 text-[8px] uppercase tracking-widest" style={{ fontFamily: "'Russo One',sans-serif", writingMode: 'vertical-rl' }}>banco</p>
          </div>

          {/* Banco — scrollable */}
          <div className="flex-1 overflow-x-auto py-1.5 px-2 min-w-0"
            onDragOver={e => e.preventDefault()}
            onDrop={dropOnBank}>
            <div className="flex gap-2 items-end h-full">
              {bankPlayers.map((player) => (
                <div key={player.id} style={{ width: BOTTOM_CARD_W, flexShrink: 0 }}
                  draggable
                  onDragStart={() => { dragRef.current = { from: 'bank', player }; setDraggingPlayer(player); }}
                  onDragEnd={() => setDraggingPlayer(null)}>
                  <div className="cursor-grab hover:scale-110 transition-transform active:cursor-grabbing"
                    style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.8))' }}>
                    <PlayerCard player={player} size="md" />
                  </div>
                  <p className="text-white/40 text-[8px] text-center truncate mt-0.5"
                    style={{ fontFamily: "'Russo One',sans-serif" }}>{player.name}</p>
                </div>
              ))}
              {bankPlayers.length === 0 && (
                <p className="text-white/15 text-[10px] pl-2 self-center"
                  style={{ fontFamily: "'Russo One',sans-serif" }}>Banco vacío</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
