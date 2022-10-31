import { useState, useEffect } from "react";

function useStorage<T = object>(
  key: string,
  defaultValue: T,
  root = window.localStorage
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    return JSON.parse(root.getItem(key)!) || defaultValue;
  });

  useEffect(() => {
    if (value === undefined) {
      root.removeItem(key);
    } else {
      root.setItem(key, JSON.stringify(value));
    }
  }, [key, value, root]);

  return [value, setValue];
}

export default useStorage;
