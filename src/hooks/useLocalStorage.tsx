import { useEffect, useState } from "react";

const useLocalStorage = <T,>(key: string, initialValue: T | (() => T)) => {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue) return JSON.parse(jsonValue);
    if (typeof initialValue !== "function") return initialValue;
    return (initialValue as () => T)();
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
};

export default useLocalStorage;
