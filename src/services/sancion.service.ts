import apiClient, { ApiError } from './api';
import type { UUID } from '../types/common';

export interface EntitySearchResult {
  id: UUID;
  name: string;
}

export interface CreateSancionDTO {
  tipo:          'equipo' | 'jugador';
  entidadId:     UUID;
  entidadNombre: string;
  motivo:        string;
  fecha:         string; // "YYYY-MM-DD"
}

const SancionService = {
  buscarEquipo: async (nombre: string): Promise<EntitySearchResult | null> => {
    try {
      const { data } = await apiClient.get<EntitySearchResult>('/teams/search', {
        params: { name: nombre },
      });
      return data;
    } catch (e) {
      if (e instanceof ApiError && e.statusCode === 404) return null;
      throw e;
    }
  },

  buscarJugador: async (nombre: string): Promise<EntitySearchResult | null> => {
    try {
      const { data } = await apiClient.get<EntitySearchResult>('/players/find', {
        params: { name: nombre },
      });
      return data;
    } catch (e) {
      if (e instanceof ApiError && e.statusCode === 404) return null;
      throw e;
    }
  },

  crearSancion: async (data: CreateSancionDTO): Promise<{ id: UUID }> => {
    const res = await apiClient.post<{ id: UUID }>('/sanciones', data);
    return res.data;
  },
};

export default SancionService;
