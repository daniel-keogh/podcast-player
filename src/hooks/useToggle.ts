import { useState } from "react";

function useToggle(defaultValue = false) {
  const [value, setValue] = useState(defaultValue);

  const toggleValue = (value?: boolean) => {
    setValue((state) => {
      return typeof value === "boolean" ? value : !state;
    });
  };

  return [value, toggleValue];
}

export default useToggle;
