import { useState, useCallback } from 'react';
import type { AsyncState, AppError } from '../types/api.types';

// ─── Generic hook for any async API call ──────────────────────────────────────
// Usage:
//   const { data, status, error, execute } = useApi(AuthService.login);
//   await execute({ email, password });

export function useApi<TArgs, TData>(
  apiFn: (args: TArgs) => Promise<TData>,
) {
  const [state, setState] = useState<AsyncState<TData>>({
    data: null,
    status: 'idle',
    error: null,
  });

  const execute = useCallback(
    async (args: TArgs): Promise<TData | null> => {
      setState({ data: null, status: 'loading', error: null });
      try {
        const data = await apiFn(args);
        setState({ data, status: 'success', error: null });
        return data;
      } catch (err) {
        const appError = err as AppError;
        setState({ data: null, status: 'error', error: appError });
        return null;
      }
    },
    [apiFn],
  );

  const reset = useCallback(() => {
    setState({ data: null, status: 'idle', error: null });
  }, []);

  return {
    ...state,
    execute,
    reset,
    isLoading: state.status === 'loading',
    isSuccess: state.status === 'success',
    isError: state.status === 'error',
    isIdle: state.status === 'idle',
  };
}
