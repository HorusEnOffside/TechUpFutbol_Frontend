import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import cancha from '../assets/capitanes_bg.png';
import capitanImg from '../assets/capitanes_player.png';
import subirImagen from '../assets/capitanes_upload.png';
import logoBlanco from '../assets/logoBlanco.png';

// ─── Types ────────────────────────────────────────────────────────────────────
type StepNum = 1 | 2 | 3;

interface StepDef {
  num: StepNum;
  label: string;
}

const STEPS: StepDef[] = [
  { num: 1, label: 'Equipo' },
  { num: 2, label: 'Camiseta' },
  { num: 3, label: 'Resumen' },
];

// ─── Componentes de UI ────────────────────────────────────────────────────────

function UserIcon() {
  return (
    <svg 
      width="28" 
      height="28" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className="text-white opacity-90"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function StepPill({ num, label, active }: { num: number; label: string; active: boolean }) {
  return (
    <div className="flex flex-col items-center gap-1 sm:gap-2">
      <div
        className={`flex items-center justify-center rounded-full select-none transition-all duration-300 w-12 h-10 sm:w-16 sm:h-12 md:w-[68px] md:h-[52px] cap-step-num${active ? ' cap-step-num--active' : ''}`}
      >
        {num}
      </div>
      <span className={`text-[10px] sm:text-xs md:text-[16px] cap-step-label${active ? ' cap-step-label--active' : ''}`}>
        {label}
      </span>
    </div>
  );
}

function ArrowBtn({ direction, onClick, disabled = false }: { direction: 'left' | 'right'; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="cap-arrow-btn flex items-center justify-center rounded text-white shadow-lg transition-all active:scale-90 disabled:opacity-40 hover:brightness-110"
    >
      {direction === 'left' ? '‹' : '›'}
    </button>
  );
}

// ─── Pantalla Principal ─────────────────────────────────────────────────────
export function CapitanesPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<StepNum>(1);

  // Estados del Formulario
  const [teamName, setTeamName] = useState('');
  const [shield, setShield] = useState<File | null>(null);
  const [shieldPreview, setShieldPreview] = useState<string | null>(null);
  const [mainColor, setMainColor] = useState('#04156B'); // Solo un color como pide el back

  const fileRef = useRef<HTMLInputElement>(null);

  // Validación: Mínimo 5 letras (Regla de negocio corregida)
  const isNameValid = teamName.trim().length >= 5;
  const canGoNext = step === 1 ? isNameValid : true;

  const handleNext = () => { if (step < 3) setStep((s) => (s + 1) as StepNum); };
  const handleBack = () => { if (step > 1) setStep((s) => (s - 1) as StepNum); else navigate(-1); };

  const handleShieldChange = (file: File) => {
    if (file) {
      setShield(file);
      if (shieldPreview) URL.revokeObjectURL(shieldPreview);
      setShieldPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden font-sans bg-black flex flex-col">
      
      <header className="absolute top-0 left-0 w-full z-50 bg-white/5 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <img 
            src={logoBlanco} 
            alt="Logo" 
            className="h-12 sm:h-14 w-auto object-contain cursor-pointer transition-transform hover:scale-105" 
            onClick={() => navigate('/')} 
          />
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 border border-white/20 cursor-pointer hover:bg-white/20 transition-all">
            <UserIcon />
          </div>
        </div>
      </header>

      <img src={cancha} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/10" />

      <img
        src={capitanImg}
        alt=""
        className="cap-player-img absolute left-[2%] sm:left-[5%] bottom-0 h-[85%] lg:h-[95%] w-auto object-contain pointer-events-none select-none z-10 hidden md:block"
      />

      <div className="relative z-20 flex flex-col items-center justify-center flex-grow pt-28 px-4 md:pl-[35%] lg:pl-[25%] transition-all duration-500">
        
        <div className="text-center mb-4 sm:mb-6">
          <h1 className="cap-title text-white drop-shadow-2xl italic leading-none text-3xl sm:text-4xl lg:text-5xl">
            CAPITANES
          </h1>
          <p className="cap-subtitle text-white tracking-widest uppercase text-[10px] sm:text-xs lg:text-sm mt-1">
            ¡Crea el legado de tu equipo!
          </p>
        </div>

        <div className="cap-card w-full max-w-[95%] sm:max-w-xl lg:max-w-2xl rounded-[2rem] p-6 sm:p-8 shadow-2xl transition-all">
          
          <div className="flex items-center justify-center gap-3 sm:gap-5 mb-6">
            {STEPS.map((s, i) => (
              <React.Fragment key={s.num}>
                <StepPill num={s.num} label={s.label} active={step === s.num} />
                {i < STEPS.length - 1 && <div className="w-6 sm:w-12 h-[2px] bg-white/30 self-center mb-6" />}
              </React.Fragment>
            ))}
          </div>

          <div className="min-h-[140px] sm:min-h-[180px] flex items-center justify-center">
            {step === 1 && (
              <div className="flex flex-col sm:flex-row gap-6 w-full justify-center">
                <div className="flex flex-col gap-1 flex-1 max-w-[240px]">
                  <label className="cap-label text-white text-sm uppercase">Nombre:</label>
                  <input
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className={`h-10 px-4 rounded-xl bg-white/20 text-white border outline-none transition-all w-full placeholder-white/40 shadow-inner ${
                      teamName.length > 0 && !isNameValid ? 'border-red-500' : 'border-white/20 focus:border-green-500'
                    }`}
                    placeholder="Ej: Sistemas FC"
                  />
                  {teamName.length > 0 && !isNameValid && (
                    <span className="text-[10px] text-red-400 italic mt-1">Mínimo 5 caracteres</span>
                  )}
                </div>

                <div className="flex flex-col gap-1 flex-1 max-w-[240px]">
                  <label className="cap-label text-white text-sm uppercase">Escudo:</label>
                  <button onClick={() => fileRef.current?.click()}
                    className="h-10 px-4 rounded-xl bg-white/20 border border-dashed border-white/30 flex items-center gap-3 w-full hover:bg-white/30 transition-all">
                    <img src={shieldPreview || subirImagen} alt="" className="h-6 w-6 object-contain" />
                    <span className="truncate text-white text-[10px]">{shield ? shield.name : 'Subir archivo'}</span>
                    <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleShieldChange(e.target.files![0])} />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col items-center justify-center w-full">
                <p className="cap-label text-white mb-4 text-sm uppercase tracking-wider">
                  Color Principal del Equipo
                </p>
                <div className="relative group">
                  <input 
                    type="color" 
                    value={mainColor} 
                    onChange={(e) => setMainColor(e.target.value)} 
                    className="w-24 h-24 rounded-full bg-transparent cursor-pointer border-4 border-white/50 transition-transform group-hover:scale-105 shadow-2xl" 
                  />
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-black/60 px-2 py-1 rounded text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    {mainColor.toUpperCase()}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col items-center gap-3 text-center">
                <h3 className="cap-summary-name text-xl sm:text-3xl text-yellow-400 italic">{teamName}</h3>
                <div className="flex flex-col items-center gap-2">
                  <p className="text-white/70 text-[10px] uppercase">Color Identificativo</p>
                  <div className="w-12 h-12 rounded-full border-2 border-white shadow-lg" style={{ background: mainColor }} />
                </div>
                <button onClick={() => navigate('/player/capitanes/jugadores')}
                  className="cap-confirm-btn mt-4 px-10 py-2 rounded-full text-white font-bold uppercase transition-all hover:scale-105 shadow-lg">
                  Confirmar Registro
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between w-full max-w-[95%] sm:max-w-xl lg:max-w-2xl mt-8">
          <ArrowBtn direction="left" onClick={handleBack} />
          <ArrowBtn direction="right" onClick={handleNext} disabled={!canGoNext || step === 3} />
        </div>
      </div>
    </div>
  );
}