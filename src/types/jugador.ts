import type { UUID } from './common';

export type Posicion = 'DL' | 'DF' | 'MD' | 'AR';
export type Genero = 'M' | 'F';

export interface Jugador {
  id: UUID;
  nombre: string;
  carrera: string;
  posicion: Posicion;
  semestre: number;
  edad: number;
  genero: Genero;
  identificacion: string;
  foto: string;
}

export interface FiltrosJugador {
  posicion: Posicion | '';
  semestre: string;
  edad: string;
  genero: Genero | '';
  nombre: string;
  identificacion: string;
}

export const POSICIONES: { value: Posicion | ''; label: string }[] = [
  { value: '', label: 'Todas las posiciones' },
  { value: 'DL', label: 'Delantero (DL)' },
  { value: 'DF', label: 'Defensa (DF)' },
  { value: 'MD', label: 'Mediocampo (MD)' },
  { value: 'AR', label: 'Arquero (AR)' },
];

export const FILTROS_INICIAL: FiltrosJugador = {
  posicion: '',
  semestre: '',
  edad: '',
  genero: '',
  nombre: '',
  identificacion: '',
};
