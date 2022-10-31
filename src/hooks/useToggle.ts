import { useState } from "react";

export type ToggleStateWithCallbacks = [boolean, (value?: unknown) => void];

function useToggle(defaultValue = false): ToggleStateWithCallbacks {
  const [value, setValue] = useState(defaultValue);

  const toggleValue = (value?: unknown) => {
    setValue((state) => {
      return typeof value === "boolean" ? value : !state;
    });
  };

  return [value, toggleValue];
}

export default useToggle;
