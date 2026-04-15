import apiClient, { ApiError } from './api';

export interface EntitySearchResult {
  id:   string;
  name: string;
}

export interface CreateSancionDTO {
  tipo:          'equipo' | 'jugador';
  entidadId:     string;
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

  crearSancion: async (data: CreateSancionDTO): Promise<{ id: string }> => {
    const res = await apiClient.post<{ id: string }>('/sanciones', data);
    return res.data;
  },
};

export default SancionService;
