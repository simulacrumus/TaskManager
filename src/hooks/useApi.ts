import { useState, useEffect } from 'react';

export const useApi = <T>(apiFunction: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setError(null);
        setData(await apiFunction());
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return { data, isLoading, error };
};