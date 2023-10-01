// useLocalstorage hook

import { useState } from "react";

export const useLocalstorage = (key: string, initialValue: any) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
    setStoredValue(value);
  };

  const removeValue = () => {
    localStorage.removeItem(key);
    setStoredValue(null);
  };

  return [storedValue, setValue, removeValue];
};
