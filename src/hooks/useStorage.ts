import { useState, useEffect } from "react";

function useStorage(key: string, defaultValue: object, root = window.localStorage) {
  const [value, setValue] = useState(() => {
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
