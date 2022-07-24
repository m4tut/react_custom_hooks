import { ChangeEvent, useState } from 'react';

type StrOrNum = string | number;

/**
 * Хук useInput выполняет работу с input элементами
 *
 * @params {string | number} - начальное значение инпута
 *
 * @returns {Object} объект состоящий из:
 * - bind - объект содержащий значение value и функцию onChange для изменения значения value
 * - value - значение value
 * - onClear - функция для очистки value
 */
export function useInput(initialValue: StrOrNum): {
  bind: { value: StrOrNum; onChange: (event: ChangeEvent<HTMLInputElement>) => void };
  value: StrOrNum;
  onClear: () => void;
} {
  const [value, setValue] = useState<StrOrNum>(initialValue);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const onClear = () => setValue(typeof initialValue === 'string' ? '' : 0);

  return {
    bind: { value, onChange },
    value,
    onClear,
  };
}
