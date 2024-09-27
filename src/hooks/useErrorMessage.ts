import { useState, useCallback } from 'react';

interface ErrorMessage {
  message: string;
  type: 'error' | 'warning' | 'info';
}

const useErrorMessage = () => {
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | null>(null);

  const setError = useCallback((message: string, type: ErrorMessage['type'] = 'error') => {
    setErrorMessage({ message, type });
  }, []);

  const clearErrorMessage = useCallback(() => {
    setErrorMessage(null);
  }, []);

  return {
    errorMessage,
    setErrorMessage: setError,
    clearErrorMessage,
  };
};

export default useErrorMessage;