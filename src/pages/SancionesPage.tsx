import { useNavigate } from 'react-router';
import { BackButton } from '../components/BackButton';
import logoBlanco from '../assets/logoBlanco.png';
import bgImage    from '../assets/Background1.png';
import { useSanciones } from '../hooks/useSanciones';
import type { TipoSancion } from '../hooks/useSanciones';

function UserIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ color: '#fff', opacity: 0.9 }}>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export function SancionesPage() {
  const navigate = useNavigate();

  const {
    tabActivo, query, buscando, noEncontrado,
    seleccionado, motivo, fecha, enviando, exito,
    puedeAceptar,
    cambiarTab,
    setQuery, setMotivo, setFecha,
    buscar, limpiar, aceptar,
  } = useSanciones();

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', background: '#000' }}>
      <BackButton />

      {/* Fondo */}
      <img src={bgImage} alt="" aria-hidden
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.75 }} />

      {/* Header — estilo CapitanesPage */}
      <header style={{
        position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 40,
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.10)',
        boxSizing: 'border-box',
      }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto',
          padding: '0 32px', height: 80,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <img
            src={logoBlanco} alt="TechCup Fútbol"
            style={{ height: 52, width: 'auto', objectFit: 'contain', cursor: 'pointer', transition: 'transform 150ms' }}
            onClick={() => navigate('/organizador/menu')}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />
          <span style={{
            fontFamily: 'Russo One', fontSize: 22, color: '#fff',
            letterSpacing: '0.06em', textTransform: 'uppercase',
          }}>
            Sanciones
          </span>
          <button
            aria-label="Perfil"
            onClick={() => navigate('/organizador/perfil')}
            style={{
              width: 48, height: 48, borderRadius: '50%',
              background: 'rgba(255,255,255,0.10)',
              border: '1px solid rgba(255,255,255,0.20)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 150ms',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.20)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.10)')}
          >
            <UserIcon />
          </button>
        </div>
      </header>

      {/* Contenido — centrado vertical y horizontal */}
      <main style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        paddingTop: 80,
        boxSizing: 'border-box',
        zIndex: 10,
      }}>
        <div style={{ width: '100%', maxWidth: 780, padding: '0 24px', boxSizing: 'border-box' }}>

          {/* Tabs */}
          <div style={{
            display: 'flex',
            borderRadius: '14px 14px 0 0',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.12)',
            borderBottom: 'none',
          }}>
            {(['equipo', 'jugador'] as TipoSancion[]).map((t) => (
              <button key={t} onClick={() => cambiarTab(t)} aria-pressed={tabActivo === t}
                style={{
                  flex: 1, padding: '14px 0',
                  fontFamily: 'Russo One', fontSize: 14, fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.06em',
                  border: 'none', cursor: 'pointer', transition: 'background 200ms, color 200ms',
                  color: tabActivo === t ? '#fff' : 'rgba(178,178,178,0.8)',
                  background: tabActivo === t
                    ? 'linear-gradient(to right, rgba(4,21,107,0.85), rgba(4,107,16,0.75))'
                    : 'rgba(30,30,30,0.55)',
                  borderBottom: tabActivo === t ? '3px solid #22c55e' : '3px solid transparent',
                }}>
                {t === 'equipo' ? 'Equipo' : 'Jugador'}
              </button>
            ))}
          </div>

          {/* Tarjeta */}
          <div style={{
            background: 'rgba(15,15,25,0.75)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '0 0 16px 16px',
            padding: '32px 36px 36px',
            display: 'flex', flexDirection: 'column', gap: 24,
            backdropFilter: 'blur(10px)',
          }}>

            {/* Buscador */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label style={{
                fontFamily: 'Russo One', fontSize: 11, color: 'rgba(255,255,255,0.50)',
                textTransform: 'uppercase', letterSpacing: '0.08em',
              }}>
                {tabActivo === 'equipo' ? 'Nombre del equipo' : 'Nombre del jugador'}
              </label>
              <div style={{ display: 'flex', gap: 10 }}>
                <input
                  type="text"
                  placeholder={tabActivo === 'equipo' ? 'Ej: Tigres FC...' : 'Ej: Carlos López...'}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' && !buscando) buscar(); }}
                  disabled={buscando}
                  aria-label={`Buscar ${tabActivo}`}
                  style={{
                    flex: 1,
                    background: 'rgba(255,255,255,0.07)',
                    border: noEncontrado
                      ? '1.5px solid rgba(239,68,68,0.6)'
                      : seleccionado
                        ? '1.5px solid rgba(34,197,94,0.6)'
                        : '1.5px solid rgba(255,255,255,0.18)',
                    borderRadius: 10, padding: '13px 18px',
                    color: '#fff', fontFamily: 'Russo One', fontSize: 15,
                    outline: 'none', transition: 'border-color 200ms',
                  }}
                />
                <button
                  onClick={buscar}
                  disabled={!query.trim() || buscando}
                  aria-label="Buscar"
                  style={{
                    padding: '0 28px', borderRadius: 10, border: 'none',
                    cursor: !query.trim() || buscando ? 'not-allowed' : 'pointer',
                    fontFamily: 'Russo One', fontSize: 14, fontWeight: 700,
                    textTransform: 'uppercase', color: '#fff',
                    background: 'linear-gradient(to right, #04156B, #046B10)',
                    opacity: !query.trim() || buscando ? 0.4 : 1,
                    transition: 'opacity 200ms', whiteSpace: 'nowrap',
                  }}>
                  {buscando ? 'Buscando...' : 'Buscar'}
                </button>
                {(query || seleccionado) && (
                  <button onClick={limpiar} aria-label="Limpiar búsqueda" title="Limpiar"
                    style={{
                      padding: '0 16px', borderRadius: 10,
                      border: '1.5px solid rgba(255,255,255,0.15)',
                      background: 'transparent', color: 'rgba(255,255,255,0.5)',
                      cursor: 'pointer', fontSize: 16, transition: 'color 200ms',
                    }}>
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* No encontrado */}
            {noEncontrado && !seleccionado && (
              <div role="alert" style={{
                padding: '14px 18px', borderRadius: 10,
                border: '1.5px solid rgba(239,68,68,0.35)',
                background: 'rgba(239,68,68,0.10)',
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <span style={{ fontSize: 18 }}>⚠️</span>
                <div>
                  <p style={{ fontFamily: 'Russo One', fontSize: 14, color: '#f87171', margin: 0 }}>
                    {tabActivo === 'equipo' ? 'Equipo' : 'Jugador'} no encontrado
                  </p>
                  <p style={{ fontFamily: 'Russo One', fontSize: 12, color: 'rgba(248,113,113,0.7)', margin: '2px 0 0' }}>
                    Verifica el nombre e intenta de nuevo
                  </p>
                </div>
              </div>
            )}

            {/* Formulario */}
            {seleccionado && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                {/* Badge */}
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '8px 16px', borderRadius: 999,
                  border: '1.5px solid rgba(34,197,94,0.4)',
                  background: 'rgba(34,197,94,0.10)', alignSelf: 'flex-start',
                }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80' }} />
                  <span style={{ fontFamily: 'Russo One', fontSize: 13, color: '#86efac' }}>
                    {seleccionado.tipo === 'equipo' ? 'Equipo' : 'Jugador'}:&nbsp;
                    <strong style={{ color: '#fff' }}>{seleccionado.nombre}</strong>
                  </span>
                </div>

                {/* Motivo */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label style={{
                    fontFamily: 'Russo One', fontSize: 11, color: 'rgba(255,255,255,0.50)',
                    textTransform: 'uppercase', letterSpacing: '0.08em',
                  }}>
                    Motivo de la sanción *
                  </label>
                  <textarea
                    value={motivo}
                    onChange={(e) => setMotivo(e.target.value)}
                    rows={4}
                    placeholder="Describe detalladamente el motivo de la sanción..."
                    aria-required="true"
                    style={{
                      background: 'rgba(255,255,255,0.07)',
                      border: motivo.trim().length > 0
                        ? '1.5px solid rgba(34,197,94,0.5)'
                        : '1.5px solid rgba(255,255,255,0.18)',
                      borderRadius: 10, padding: '14px 18px',
                      color: '#fff', fontFamily: 'Russo One', fontSize: 14,
                      outline: 'none', resize: 'vertical', minHeight: 110,
                      transition: 'border-color 200ms',
                    }}
                  />
                </div>

                {/* Fecha */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label style={{
                    fontFamily: 'Russo One', fontSize: 11, color: 'rgba(255,255,255,0.50)',
                    textTransform: 'uppercase', letterSpacing: '0.08em',
                  }}>
                    Fecha de la sanción *
                  </label>
                  <input
                    type="date"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    aria-required="true"
                    style={{
                      background: 'rgba(255,255,255,0.07)',
                      border: fecha
                        ? '1.5px solid rgba(34,197,94,0.5)'
                        : '1.5px solid rgba(255,255,255,0.18)',
                      borderRadius: 10, padding: '13px 18px',
                      color: fecha ? '#fff' : 'rgba(255,255,255,0.35)',
                      fontFamily: 'Russo One', fontSize: 14,
                      outline: 'none', colorScheme: 'dark', width: '100%',
                      transition: 'border-color 200ms', boxSizing: 'border-box',
                    }}
                  />
                </div>

                <p style={{ fontFamily: 'Russo One', fontSize: 11, color: 'rgba(255,255,255,0.30)', margin: 0 }}>
                  * Campos obligatorios
                </p>

                {/* Botón */}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    onClick={aceptar}
                    disabled={!puedeAceptar || enviando}
                    aria-disabled={!puedeAceptar || enviando}
                    style={{
                      padding: '14px 48px', borderRadius: 10, border: 'none',
                      cursor: !puedeAceptar || enviando ? 'not-allowed' : 'pointer',
                      fontFamily: 'Russo One', fontSize: 15, fontWeight: 700,
                      textTransform: 'uppercase', letterSpacing: '0.08em', color: '#fff',
                      background: exito
                        ? 'linear-gradient(to right, #15803d, #166534)'
                        : 'linear-gradient(to right, #04156B, #046B10)',
                      opacity: !puedeAceptar || enviando ? 0.4 : 1,
                      transition: 'opacity 200ms',
                    }}>
                    {enviando ? 'Guardando...' : exito ? '✓ Guardado' : 'Aplicar sanción'}
                  </button>
                </div>

                {exito && (
                  <div role="status" style={{
                    padding: '12px 18px', borderRadius: 10,
                    border: '1.5px solid rgba(34,197,94,0.35)',
                    background: 'rgba(34,197,94,0.10)', textAlign: 'center',
                  }}>
                    <p style={{ fontFamily: 'Russo One', fontSize: 14, color: '#4ade80', margin: 0 }}>
                      Sanción registrada correctamente
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Estado vacío */}
            {!seleccionado && !query && !noEncontrado && (
              <div style={{
                padding: '32px 0', textAlign: 'center',
                color: 'rgba(255,255,255,0.25)', fontFamily: 'Russo One', fontSize: 14,
              }}>
                Busca un equipo o jugador para aplicar una sanción
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}
