import React from 'react';
import { useNavigate } from 'react-router';
import { BackButton } from '../components/BackButton';
import cancha     from '../assets/capitanes_bg.png';
import capitanImg from '../assets/capitanes_player.png';
import subirImagen from '../assets/capitanes_upload.png';
import logoBlanco  from '../assets/logoBlanco.png';

import { StepPill } from '../components/capitanes/StepPill';
import { ArrowBtn }  from '../components/capitanes/ArrowBtn';
import { useCapitanes } from '../hooks/useCapitanes';

const STEPS = [
  { num: 1 as const, label: 'Equipo' },
  { num: 2 as const, label: 'Camiseta' },
  { num: 3 as const, label: 'Resumen' },
];

function UserIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className="text-white opacity-90">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function LoadingOverlay() {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-white/20 border-t-green-500 animate-spin" />
        <span style={{ fontFamily: 'Russo One, sans-serif', color: '#fff', fontSize: 16 }}>
          Creando equipo...
        </span>
      </div>
    </div>
  );
}

export function CapitanesPage() {
  const navigate = useNavigate();
  const {
    step, teamName, shield, shieldPreview, mainColor,
    isLoading, error, isSuccess,
    isNameValid, canGoNext, canGoBack, fileRef,
    setTeamName, setMainColor,
    handleNext, handleStepBack, handleShieldChange, handleSubmit,
  } = useCapitanes();

  const handleBack = () => {
    if (canGoBack) handleStepBack();
    else navigate(-1);
  };

  const handleConfirm = async () => {
    await handleSubmit();
  };

  React.useEffect(() => {
    if (isSuccess) navigate('/player/capitanes/jugadores');
  }, [isSuccess, navigate]);

  return (
    <div className="relative w-full h-screen overflow-hidden font-sans bg-black flex flex-col">
      <BackButton />
      {isLoading && <LoadingOverlay />}

      {/* Header */}
      <header className="absolute top-0 left-0 w-full z-40 bg-white/5 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <img src={logoBlanco} alt="Logo" className="h-12 sm:h-14 w-auto object-contain cursor-pointer transition-transform hover:scale-105"
            onClick={() => navigate('/')} />
          <div
            className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 border border-white/20 cursor-pointer hover:bg-white/20 transition-all"
            onClick={() => navigate('/player/sports-profile')}
            role="button"
            aria-label="Mi perfil deportivo"
          >
            <UserIcon />
          </div>
        </div>
      </header>

      {/* Background */}
      <img src={cancha} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/20" aria-hidden />

      {/* Player figure */}
      <img src={capitanImg} alt="" aria-hidden
        className="cap-player-img absolute left-[2%] sm:left-[5%] bottom-0 h-[85%] lg:h-[95%] w-auto object-contain pointer-events-none select-none z-10 hidden md:block" />

      {/* Content - Ajustado para centrar mejor */}
      <div className="relative z-20 flex flex-col items-center justify-center flex-grow pt-16 px-4 md:pl-[35%] lg:pl-[25%]">

        {/* Titles - Tamaño reducido de 8xl a 6xl */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="cap-title text-white drop-shadow-2xl italic leading-none text-4xl sm:text-5xl lg:text-6xl">
            CAPITANES
          </h1>
          <p className="cap-subtitle text-green-400 tracking-[0.3em] uppercase text-[11px] sm:text-xs lg:text-sm mt-1 font-bold" style={{ fontFamily: 'Russo One' }}>
            ¡Crea el legado de tu equipo!
          </p>
        </div>

        {/* Card */}
        <div className="cap-card w-full max-w-[95%] sm:max-w-xl lg:max-w-2xl rounded-[2.5rem] p-8 sm:p-10 shadow-2xl">
          {/* Step indicators */}
          <div className="flex items-center justify-center gap-3 sm:gap-6 mb-8">
            {STEPS.map((s, i) => (
              <React.Fragment key={s.num}>
                <StepPill num={s.num} label={s.label} active={step === s.num} />
                {i < STEPS.length - 1 && (
                  <div className="w-8 sm:w-16 h-[2px] bg-white/20 self-center mb-6" />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Step content */}
          <div className="min-h-[160px] sm:min-h-[200px] flex items-center justify-center">
            {/* Step 1: Equipo */}
            {step === 1 && (
              <div className="flex flex-col sm:flex-row gap-8 w-full justify-center">
                <div className="flex flex-col gap-2 flex-1 max-w-[260px]">
                  <label className="cap-label text-white text-xs uppercase font-bold opacity-80">Nombre:</label>
                  <input
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="Ej: Sistemas FC"
                    className={`h-11 px-5 rounded-xl bg-white/10 text-white border-2 outline-none transition-all w-full placeholder-white/30 ${
                      teamName.length > 0 && !isNameValid ? 'border-red-500' : 'border-white/10 focus:border-green-500 bg-white/15'
                    }`}
                  />
                  {teamName.length > 0 && !isNameValid && (
                    <span className="text-[10px] text-red-400 italic mt-1 font-medium">Mínimo 5 caracteres</span>
                  )}
                </div>

                <div className="flex flex-col gap-2 flex-1 max-w-[260px]">
                  <label className="cap-label text-white text-xs uppercase font-bold opacity-80">Escudo:</label>
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="h-11 px-5 rounded-xl bg-white/10 border-2 border-dashed border-white/30 flex items-center gap-4 w-full hover:bg-white/20 transition-all"
                  >
                    <img src={shieldPreview ?? subirImagen} alt="" className="h-6 w-6 object-contain" />
                    <span className="truncate text-white text-[11px] font-medium opacity-70">
                      {shield ? shield.name : 'Subir archivo'}
                    </span>
                    <input ref={fileRef} type="file" accept="image/*" className="hidden"
                      onChange={(e) => { if (e.target.files?.[0]) handleShieldChange(e.target.files[0]); }} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Camiseta */}
            {step === 2 && (
              <div className="flex flex-col items-center justify-center w-full">
                <p className="cap-label text-white mb-6 text-sm uppercase tracking-widest font-bold opacity-90">
                  Color de Identidad
                </p>
                <input
                  type="color"
                  value={mainColor}
                  onChange={(e) => setMainColor(e.target.value)}
                  className="w-24 h-24 rounded-full bg-transparent cursor-pointer border-4 border-white/40 transition-transform hover:scale-105 shadow-2xl"
                />
              </div>
            )}

            {/* Step 3: Resumen */}
            {step === 3 && (
              <div className="flex flex-col items-center gap-5 text-center">
                <h3 className="cap-summary-name text-2xl sm:text-4xl text-yellow-400 italic font-bold">
                  {teamName}
                </h3>
                <div className="flex items-center justify-center gap-8">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-14 h-14 rounded-full border-4 border-white shadow-xl" style={{ background: mainColor }} />
                    <p className="text-white/50 text-[10px] uppercase font-bold">Color</p>
                  </div>
                  {shieldPreview && (
                    <div className="flex flex-col items-center gap-2">
                      <img src={shieldPreview} alt="escudo" className="h-14 w-14 object-contain rounded-xl shadow-2xl bg-white/5 p-2" />
                      <p className="text-white/50 text-[10px] uppercase font-bold">Escudo</p>
                    </div>
                  )}
                </div>

                {/* Error visible */}
                {error && (
                  <div className="w-full px-4 py-3 rounded-xl bg-red-500/20 border border-red-400/50 text-red-300 text-sm font-medium">
                    {error}
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleConfirm}
                  disabled={isLoading}
                  className="cap-confirm-btn mt-4 px-12 py-3 rounded-full text-white font-bold uppercase transition-all hover:scale-105 shadow-2xl disabled:opacity-50 text-base"
                  style={{ background: 'linear-gradient(90deg, #04156B, #046B10)' }}
                >
                  {isLoading ? 'Guardando...' : 'Confirmar Registro'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Navigation arrows */}
        <div className="flex justify-between w-full max-w-[95%] sm:max-w-xl lg:max-w-2xl mt-10">
          <ArrowBtn direction="left" onClick={handleBack} />
          <ArrowBtn direction="right" onClick={handleNext} disabled={!canGoNext} />
        </div>
      </div>
    </div>
  );
}