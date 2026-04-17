import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../store/AuthContext';
import TeamService from '../services/team.service';

/** Lee el claim `sub` (o `id`) del JWT almacenado en localStorage. */
function getUserIdFromToken(): string | null {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1])) as Record<string, unknown>;
    return (payload.sub ?? payload.id ?? null) as string | null;
  } catch {
    return null;
  }
}

export type StepNum = 1 | 2 | 3;

interface UseCapitanesReturn {
  // State
  step: StepNum;
  teamName: string;
  shield: File | null;
  shieldPreview: string | null;
  mainColor: string;
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
  // Derived
  isNameValid: boolean;
  canGoNext: boolean;
  canGoBack: boolean;
  fileRef: React.RefObject<HTMLInputElement | null>;
  // Actions
  setTeamName: (v: string) => void;
  setMainColor: (v: string) => void;
  handleNext: () => void;
  handleStepBack: () => void;
  handleShieldChange: (file: File) => void;
  handleSubmit: () => Promise<void>;
  resetError: () => void;
}

export function useCapitanes(): UseCapitanesReturn {
  const { user, refreshSession } = useAuth();

  const [step,          setStep]          = useState<StepNum>(1);
  const [teamName,      setTeamName]      = useState('');
  const [shield,        setShield]        = useState<File | null>(null);
  const [shieldPreview, setShieldPreview] = useState<string | null>(null);
  const [mainColor,     setMainColor]     = useState('#04156B');
  const [isLoading,     setIsLoading]     = useState(false);
  const [error,         setError]         = useState<string | null>(null);
  const [isSuccess,     setIsSuccess]     = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);

  // Si ya tiene equipo guardado, saltar directo a jugadores
  useEffect(() => {
    const savedTeamId = localStorage.getItem('teamId');
    if (savedTeamId) {
      setIsSuccess(true);
    }
  }, []);

  const isNameValid = teamName.trim().length >= 5;
  const canGoNext   = step === 1 ? isNameValid : step < 3;
  const canGoBack   = step > 1;

  const handleNext = () => {
    if (step < 3) setStep((s) => (s + 1) as StepNum);
  };

  const handleStepBack = () => {
    if (step > 1) setStep((s) => (s - 1) as StepNum);
  };

  const handleShieldChange = (file: File) => {
    setShield(file);
    if (shieldPreview) URL.revokeObjectURL(shieldPreview);
    setShieldPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    // Leer captainUserId del claim `sub` del JWT (fuente de verdad del backend)
    const captainUserId = getUserIdFromToken() ?? user?.id ?? null;
    if (!captainUserId) {
      setError('Sesión no válida. Por favor inicia sesión de nuevo.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const team = await TeamService.createTeam(
        teamName,
        mainColor,       // uniformColors → hex del color elegido
        captainUserId,
        shield ?? null,
      );

      // Guardar el teamId para que SeleccionJugadoresPage lo use en las invitaciones
      localStorage.setItem('teamId', team.id);

      // Refrescar el token para incluir el rol CAPTAIN asignado por el backend.
      // Si falla, navegamos igual — la selección de jugadores seguirá funcionando.
      try {
        await refreshSession();
      } catch {
        // refresh no crítico: el equipo ya fue creado
      }

      setIsSuccess(true);
    } catch (err: unknown) {
      let message = 'No se pudo crear el equipo. Inténtalo de nuevo.';
      if (err instanceof Error) {
        if (err.message.toLowerCase().includes('500') || err.message.toLowerCase().includes('internal')) {
          message = 'Error del servidor. Asegúrate de tener tu perfil deportivo creado antes de crear un equipo.';
        } else {
          message = err.message;
        }
      }
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const resetError = () => setError(null);

  return {
    step, teamName, shield, shieldPreview, mainColor,
    isLoading, error, isSuccess,
    isNameValid, canGoNext, canGoBack, fileRef,
    setTeamName, setMainColor,
    handleNext, handleStepBack, handleShieldChange, handleSubmit, resetError,
  };
}
