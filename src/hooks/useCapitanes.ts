import { useState, useRef } from 'react';

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
  const [step, setStep] = useState<StepNum>(1);
  const [teamName, setTeamName] = useState('');
  const [shield, setShield] = useState<File | null>(null);
  const [shieldPreview, setShieldPreview] = useState<string | null>(null);
  const [mainColor, setMainColor] = useState('#04156B');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);

  const isNameValid = teamName.trim().length >= 5;
  const canGoNext = step === 1 ? isNameValid : step < 3;
  const canGoBack = step > 1;

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

  /**
   * Simula el POST al backend para crear el equipo.
   * Reemplazar el setTimeout por la llamada real a la API.
   */
  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // TODO: reemplazar con AuthService / TeamService real
      await new Promise<void>((res) => setTimeout(res, 1000));
      setIsSuccess(true);
    } catch {
      setError('No se pudo crear el equipo. Inténtalo de nuevo.');
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
