import React from "react";


export const StandingsSection: React.FC = () => {
  return (
    <section id="standings" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-[#144C9F] to-[#071F4A] text-white px-6 py-2 rounded-full text-sm font-bold">
              EN VIVO
            </span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-black text-[#071F4A] mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Tabla de <span className="text-[#144C9F]">Posiciones</span>
          </h2>
        </div>

        <div className="rounded-3xl border-2 border-gray-100 shadow-2xl overflow-hidden" style={{background: "rgba(255,255,255,0.85)"}}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead style={{
                background: 'linear-gradient(135deg, #39D17D 0%, #17A65B 35%, #144C9F 70%, #071F4A 100%)'
              }} className="text-white">
                <tr>
                  <th className="px-6 py-6 text-left font-black text-sm">#</th>
                  <th className="px-6 py-6 text-left font-black text-sm">EQUIPO</th>
                  <th className="px-6 py-6 text-center font-black text-sm">PJ</th>
                  <th className="px-6 py-6 text-center font-black text-sm">PG</th>
                  <th className="px-6 py-6 text-center font-black text-sm">PE</th>
                  <th className="px-6 py-6 text-center font-black text-sm">PP</th>
                  <th className="px-6 py-6 text-center font-black text-sm">GF</th>
                  <th className="px-6 py-6 text-center font-black text-sm">GC</th>
                  <th className="px-6 py-6 text-center font-black text-sm">DG</th>
                  <th className="px-6 py-6 text-center font-black text-sm">PTS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { pos: 1, team: "Los Sistemas FC", pj: 4, pg: 3, pe: 1, pp: 0, gf: 12, gc: 3, dg: "+9", pts: 10, highlight: true },
                  { pos: 2, team: "AI United", pj: 4, pg: 3, pe: 0, pp: 1, gf: 10, gc: 5, dg: "+5", pts: 9, highlight: true },
                  { pos: 3, team: "Ciber Defenders", pj: 4, pg: 2, pe: 1, pp: 1, gf: 8, gc: 6, dg: "+2", pts: 7, highlight: true },
                  { pos: 4, team: "Estadística FC", pj: 4, pg: 1, pe: 2, pp: 1, gf: 6, gc: 7, dg: "-1", pts: 5, highlight: false }
                ].map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-5">
                      <div className={`w-10 h-10 ${row.highlight ? 'bg-gradient-to-br from-[#39D17D] to-[#17A65B]' : 'bg-gray-200'} rounded-xl flex items-center justify-center text-white font-black shadow-md`}>
                        {row.pos}
                      </div>
                    </td>
                    <td className="px-6 py-5 font-bold text-[#071F4A] text-lg">{row.team}</td>
                    <td className="px-6 py-5 text-center text-gray-600 font-medium">{row.pj}</td>
                    <td className="px-6 py-5 text-center text-gray-600 font-medium">{row.pg}</td>
                    <td className="px-6 py-5 text-center text-gray-600 font-medium">{row.pe}</td>
                    <td className="px-6 py-5 text-center text-gray-600 font-medium">{row.pp}</td>
                    <td className="px-6 py-5 text-center text-gray-600 font-medium">{row.gf}</td>
                    <td className="px-6 py-5 text-center text-gray-600 font-medium">{row.gc}</td>
                    <td className="px-6 py-5 text-center">
                      <span className={`${row.dg.includes('+') ? 'bg-[#39D17D]/20 text-[#17A65B]' : 'bg-red-100 text-red-600'} px-3 py-1.5 rounded-lg font-bold text-sm`}>
                        {row.dg}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className="text-[#071F4A] font-black text-xl">{row.pts}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-gray-50 px-8 py-6 border-t-2 border-gray-100">
            <div className="flex flex-wrap gap-x-8 gap-y-2 justify-center text-sm text-gray-600">
              <span><span className="font-bold text-[#071F4A]">PJ:</span> Partidos Jugados</span>
              <span><span className="font-bold text-[#071F4A]">PG:</span> Partidos Ganados</span>
              <span><span className="font-bold text-[#071F4A]">PE:</span> Empatados</span>
              <span><span className="font-bold text-[#071F4A]">PP:</span> Perdidos</span>
              <span><span className="font-bold text-[#071F4A]">GF:</span> Goles a Favor</span>
              <span><span className="font-bold text-[#071F4A]">GC:</span> Goles en Contra</span>
              <span><span className="font-bold text-[#071F4A]">DG:</span> Diferencia</span>
              <span><span className="font-bold text-[#071F4A]">PTS:</span> Puntos</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
