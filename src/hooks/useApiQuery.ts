import { useState, useEffect, useCallback, useRef } from 'react';

interface UseApiQueryResult<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
  refetch: () => void;
}

/**
 * Generic hook for GET requests.
 *
 * @example
 * const { data, isLoading, error, refetch } = useApiQuery(
 *   () => UserService.getAllUsers()
 * );
 */
export function useApiQuery<T>(
  queryFn: () => Promise<T>,
  options: { immediate?: boolean } = {},
): UseApiQueryResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // Stable ref so the queryFn can change without recreating execute
  const queryFnRef = useRef(queryFn);
  queryFnRef.current = queryFn;

  const execute = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);
    try {
      const result = await queryFnRef.current();
      setData(result);
      setIsSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al obtener datos');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const { immediate = true } = options;

  useEffect(() => {
    if (immediate) {
      void execute();
    }
  }, [execute, immediate]);

  return { data, isLoading, error, isSuccess, refetch: execute };
}
