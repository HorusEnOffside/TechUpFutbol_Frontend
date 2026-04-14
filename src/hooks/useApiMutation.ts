import { useState, useCallback, useRef } from 'react';

interface UseApiMutationResult<TData, TVariables> {
  mutate: (variables: TVariables) => Promise<TData | null>;
  data: TData | null;
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
  reset: () => void;
}

/**
 * Generic hook for POST / PUT / PATCH / DELETE requests.
 *
 * @example
 * const { mutate, isLoading, error, isSuccess } = useApiMutation(
 *   (creds: LoginRequest) => AuthService.login(creds)
 * );
 *
 * const result = await mutate({ email, password });
 */
export function useApiMutation<TData, TVariables = void>(
  mutationFn: (variables: TVariables) => Promise<TData>,
): UseApiMutationResult<TData, TVariables> {
  const [data, setData] = useState<TData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // Stable ref so the mutationFn can change without recreating mutate
  const mutationFnRef = useRef(mutationFn);
  mutationFnRef.current = mutationFn;

  const mutate = useCallback(async (variables: TVariables): Promise<TData | null> => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);
    try {
      const result = await mutationFnRef.current(variables);
      setData(result);
      setIsSuccess(true);
      return result;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al procesar la solicitud');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setIsSuccess(false);
  }, []);

  return { mutate, data, isLoading, error, isSuccess, reset };
}
