import { useCallback, useState } from 'react';

interface UseServiceConfig<TData> {
  onSuccess?: (data: TData) => void;
  onError?: (error: Error) => void;
}

export function useService<TData = unknown, TParams = unknown>(
  serviceFunction: (params: TParams) => Promise<TData>,
  config?: UseServiceConfig<TData>
) {
  const [data, setData] = useState<TData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(
    async (params: TParams) => {
      try {
        setIsLoading(true);
        setError(null);

        const result = await serviceFunction(params);
        setData(result);
        config?.onSuccess?.(result);

        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('An unknown error occurred');
        setError(error);
        config?.onError?.(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [serviceFunction, config]
  );

  return {
    execute,
    data,
    isLoading,
    error,
    reset: useCallback(() => {
      setData(null);
      setError(null);
      setIsLoading(false);
    }, []),
  };
}
