import { useTournamentTerm } from '../../../hooks/useTournamentTerm';
import { useTournamentDates } from '../../../hooks/useTournamentDates';
import { useTournamentStatus } from '../../../hooks/useTournamentStatus';
import { useNavigate } from "react-router";
import { useTournamentTeamCost } from '../../../hooks/useTournamentTeamCost';
import { useTournamentRegisteredTeams } from '../../../hooks/useTournamentRegisteredTeams';
import { useTournamentMaxTeams } from '../../../hooks/useTournamentMaxTeams';
import AboutTitle from "../AboutTitle";
import { useTournamentImportantDates } from '../../../hooks/useTournamentImportantDates';

export function TorneoActualSection() {

  const { dates: importantDates, loading: importantDatesLoading, error: importantDatesError } = useTournamentImportantDates();
  const navigate = useNavigate();
  const { teamCost, loading: teamCostLoading, error: teamCostError } = useTournamentTeamCost();
  const { term, loading: termLoading, error } = useTournamentTerm();
  const { dates, loading: datesLoading, error: datesError } = useTournamentDates();
  const { status, loading: statusLoading, error: statusError } = useTournamentStatus();
  const { registeredTeams, loading: registeredTeamsLoading, error: registeredTeamsError } = useTournamentRegisteredTeams();
  const { maxTeams, loading: maxTeamsLoading, error: maxTeamsError } = useTournamentMaxTeams();

  let torneoText = 'Torneo';
  let torneoClass = '';
  if (termLoading) {
    torneoText = 'Cargando...';
  } else if (error) {
    torneoText = 'No se pudo cargar';
    torneoClass = 'text-red-500';
  } else if (term) {
    torneoText = `Torneo ${term}`;
  }

  let fechaInicio = 'No disponible';
  let fechaFin = 'No disponible';
  let fechaColor = '';
  if (datesLoading) {
    fechaInicio = fechaFin = 'Cargando...';
  } else if (datesError) {
    fechaInicio = fechaFin = 'No se pudo cargar';
    fechaColor = 'text-red-500';
  } else if (dates) {
    fechaInicio = dates.startDate;
    fechaFin = dates.endDate;
  }

  let estado = 'No disponible';
  let estadoColor = '';
  let badgeText = '';
  let badgeClass = 'bg-gradient-to-r from-[#39D17D] to-[#17A65B] text-white px-5 py-2 rounded-xl font-bold text-sm shadow-lg';
  if (statusLoading) {
    estado = 'Cargando...';
    badgeText = '';
  } else if (statusError) {
    estado = 'No se pudo cargar';
    estadoColor = 'text-red-500';
    badgeText = '';
  } else {
    switch (status) {
      case 'DRAFT':
        estado = 'En planeación';
        badgeText = 'EN PLANEACIÓN';
        badgeClass += ' bg-gray-400';
        break;
      case 'ACTIVE':
        estado = 'Inscripciones abiertas';
        badgeText = 'ACTIVO';
        break;
      case 'IN_PROGRESS':
        estado = 'Inscripciones cerradas';
        badgeText = 'EN JUEGO';
        badgeClass += ' bg-blue-500';
        break;
      case 'COMPLETED':
        estado = 'Finalizado';
        badgeText = 'FINALIZADO';
        badgeClass += ' bg-gray-700';
        break;
      default:
        estado = '';
        badgeText = '';
    }
  }

  return (
    <section id="schedule" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className={`bg-gradient-to-r from-[#39D17D] to-[#17A65B] text-white px-6 py-2 rounded-full text-sm font-bold ${torneoClass}`}>
              {torneoText}
            </span>
          </div>
          <AboutTitle>
            Información del <span className="text-[#17A65B]">Torneo Actual</span>
          </AboutTitle>
        </div>
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Tournament Details Card */}
          <div className="bg-gradient-to-br from-white to-gray-50 p-10 rounded-3xl border-2 border-gray-100 shadow-xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl font-black text-[#071F4A] font-montserrat">
                  TechCup 2026-I
                </h3>
                {badgeText && (
                  <div className={badgeClass}>
                    {badgeText}
                  </div>
                )}
              </div>
            <div className="space-y-5">
              <div className="flex justify-between py-4 border-b-2 border-gray-100">
                <span className="text-gray-600 font-semibold">Estado:</span>
                <span className={`text-[#17A65B] font-bold text-lg ${estadoColor}`}>{estado}</span>
              </div>
              <div className="flex justify-between py-4 border-b-2 border-gray-100">
                <span className="text-gray-600 font-semibold">Fecha de inicio:</span>
                <span className={`font-bold text-[#071F4A] ${fechaColor}`}>{fechaInicio}</span>
              </div>
              <div className="flex justify-between py-4 border-b-2 border-gray-100">
                <span className="text-gray-600 font-semibold">Finalización:</span>
                <span className={`font-bold text-[#071F4A] ${fechaColor}`}>{fechaFin}</span>
              </div>
              <div className="flex justify-between py-4 border-b-2 border-gray-100">
                <span className="text-gray-600 font-semibold">Equipos inscritos:</span>
                <div className="text-right">
                  <span className={`font-bold text-[#071F4A] text-lg ${registeredTeamsError || maxTeamsError ? 'text-red-500' : ''}`}>
                    {registeredTeamsLoading || maxTeamsLoading
                      ? 'Cargando...'
                      : registeredTeamsError || maxTeamsError
                        ? 'No se pudo cargar'
                        : registeredTeams !== null && maxTeams !== null
                          ? `${registeredTeams} / ${maxTeams}`
                          : 'No disponible'}
                  </span>
                  <div className="w-32 h-2.5 bg-gray-200 rounded-full mt-2">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width:
                          registeredTeamsLoading || maxTeamsLoading || registeredTeams === null || maxTeams === null || maxTeams === 0
                            ? '0%'
                            : `${Math.min((registeredTeams / maxTeams) * 100, 100)}%`,
                        background: 'linear-gradient(90deg, #39D17D 0%, #17A65B 50%, #144C9F 100%)',
                        transition: 'width 0.5s',
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between py-4">
                <span className="text-gray-600 font-semibold">Costo por equipo:</span>
                <span className={`font-black text-[#071F4A] text-2xl ${teamCostError ? 'text-red-500' : ''}`}>
                  {teamCostLoading
                    ? 'Cargando...'
                    : teamCostError
                      ? 'No se pudo cargar'
                      : teamCost !== null
                        ? teamCost.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })
                        : 'No disponible'}
                </span>
              </div>
            </div>
            <button
              className="w-full mt-8 bg-gradient-to-r from-[#39D17D] to-[#17A65B] text-white py-5 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-[#39D17D]/50 transition-all duration-300 hover:scale-105 transform"
              aria-label="Inscribir equipo al torneo"
              onClick={() => navigate("/auth")}
            >
              Inscribir mi Equipo Ahora
            </button>
          </div>
          {/* Important Dates Card */}
          <div className="bg-gradient-to-br from-white to-gray-50 p-10 rounded-3xl border-2 border-gray-100 shadow-xl">
            <h3 className="text-3xl font-black text-[#071F4A] mb-8 font-montserrat">
              Fechas Importantes
            </h3>
            <div className="space-y-6">
              {importantDatesLoading && (
                <div className="text-gray-500">Cargando fechas importantes...</div>
              )}
              {importantDatesError && (
                <div className="text-red-500">{importantDatesError}</div>
              )}
              {!importantDatesLoading && !importantDatesError && importantDates.length === 0 && (
                <div className="text-gray-500">No hay fechas importantes disponibles.</div>
              )}
              {!importantDatesLoading && !importantDatesError && importantDates.map((item, index) => {
                // Paleta de gradientes para las fechas importantes
                const gradients = [
                  'from-[#39D17D] to-[#17A65B]', // verde
                  'from-[#17A65B] to-[#144C9F]', // verde-azul
                  'from-[#144C9F] to-[#071F4A]', // azul oscuro
                  'from-gray-400 to-gray-600',   // gris
                  'from-[#39D17D] to-[#144C9F]'  // verde-azul oscuro
                ];
                const color = gradients[index % gradients.length];
                return (
                  <div key={index} className="flex gap-5 items-start group hover:translate-x-3 transition-transform duration-200">
                    <div className={`bg-gradient-to-br ${color} text-white px-4 py-3 rounded-xl text-xs font-black h-fit min-w-[70px] text-center shadow-lg`}>
                      {item.date}
                    </div>
                    <div className="flex-1 flex items-center min-h-[40px]">
                      <p className="font-bold text-[#071F4A] text-lg mb-1" style={{fontFamily: 'Montserrat, sans-serif'}}>{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TorneoActualSection;
