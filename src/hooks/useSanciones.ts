import { useState } from 'react';
import SancionService from '../services/sancion.service';
import type { UUID } from '../types/common';

export type TipoSancion = 'equipo' | 'jugador';

export interface EntidadSancionada {
  id:     UUID;
  tipo:   TipoSancion;
  nombre: string;
}

/**
 * Función de búsqueda inyectable — facilita los tests y el reemplazo por el backend real.
 * Recibe el tipo y nombre, devuelve { id, nombre } si existe, null si no.
 */
export type BuscarFn = (
  tipo:   TipoSancion,
  nombre: string,
) => Promise<{ id: UUID; nombre: string } | null>;

const buscarEnBackend: BuscarFn = async (tipo, nombre) => {
  const resultado =
    tipo === 'equipo'
      ? await SancionService.buscarEquipo(nombre)
      : await SancionService.buscarJugador(nombre);

  if (!resultado) return null;
  return { id: resultado.id, nombre: resultado.name };
};

// ─────────────────────────────────────────────────────────────────────────────

export function useSanciones(buscarFn: BuscarFn = buscarEnBackend) {
  const [tabActivo,     setTabActivo]     = useState<TipoSancion>('equipo');
  const [query,         setQueryState]    = useState('');
  const [buscando,      setBuscando]      = useState(false);
  const [noEncontrado,  setNoEncontrado]  = useState(false);
  const [seleccionado,  setSeleccionado]  = useState<EntidadSancionada | null>(null);
  const [motivo,        setMotivo]        = useState('');
  const [fecha,         setFecha]         = useState('');
  const [enviando,      setEnviando]      = useState(false);
  const [exito,         setExito]         = useState(false);

  const puedeAceptar =
    !!seleccionado && motivo.trim().length > 0 && fecha.trim().length > 0;

  const limpiar = () => {
    setQueryState('');
    setSeleccionado(null);
    setNoEncontrado(false);
    setMotivo('');
    setFecha('');
    setExito(false);
  };

  const cambiarTab = (tab: TipoSancion) => {
    setTabActivo(tab);
    limpiar();
  };

  const buscar = async () => {
    if (!query.trim()) return;
    setBuscando(true);
    setNoEncontrado(false);
    setSeleccionado(null);
    setExito(false);

    try {
      const resultado = await buscarFn(tabActivo, query.trim());
      if (resultado) {
        setSeleccionado({ id: resultado.id, tipo: tabActivo, nombre: resultado.nombre });
      } else {
        setNoEncontrado(true);
      }
    } finally {
      setBuscando(false);
    }
  };

  const aceptar = async () => {
    if (!puedeAceptar || !seleccionado) return;
    setEnviando(true);
    try {
      await SancionService.crearSancion({
        tipo:          seleccionado.tipo,
        entidadId:     seleccionado.id,
        entidadNombre: seleccionado.nombre,
        motivo,
        fecha,
      });
      setExito(true);
      setTimeout(() => limpiar(), 2000);
    } finally {
      setEnviando(false);
    }
  };

  return {
    // Estado
    tabActivo, buscando, noEncontrado,
    seleccionado, motivo, fecha, enviando, exito,
    query,
    // Derivado
    puedeAceptar,
    // Acciones
    cambiarTab,
    setQuery: (v: string) => {
      setQueryState(v);
      setSeleccionado(null);
      setNoEncontrado(false);
      setExito(false);
    },
    setMotivo,
    setFecha,
    buscar,
    limpiar,
    aceptar,
  };
}
