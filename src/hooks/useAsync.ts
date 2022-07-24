import { useState } from 'react';

/**
 * Хук useAsync выполняет обработку переданной в него callback фунции
 *
 * @params {Function} - callback функция
 *
 * @returns {Array} массив состоящий из:
 * - fetching - функция обработчик
 * - isLoading - статус выполнения
 * - error - ошибка запроса
 */
export function useAsync(callback: () => void): [fetching: () => Promise<void>, isLoading: boolean, error: string] {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetching = async () => {
    try {
      setError('');
      setIsLoading(true);
      await callback();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return [fetching, isLoading, error];
}
