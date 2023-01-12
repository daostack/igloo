import { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";

export enum AsyncStatus {
  Idle,
  Pending,
  Success,
  Error
}

export const useAsync = <T, E = AxiosError>(asyncFunction: () => Promise<T>, immediate = true) => {
  const [status, setStatus] = useState<AsyncStatus>(AsyncStatus.Idle);
  const [value, setValue] = useState<T | null>(null);
  const [error, setError] = useState<E | null>(null);

  const execute = useCallback(() => {
    setStatus(AsyncStatus.Pending);
    setValue(null);
    setError(null);
    return asyncFunction()
      .then((response: any) => {
        setValue(response);
        setStatus(AsyncStatus.Success);
      })
      .catch((error: any) => {
        setError(error);
        setStatus(AsyncStatus.Error);
      });
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);
  return { execute, status, value, error };
};
