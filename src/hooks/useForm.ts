import { useState } from "react";

function useForm<T>(initialValues: T) {
  const [values, setValues] = useState(initialValues);

  const handleChange = <T extends { name: string; value: string }>(e: React.ChangeEvent<T>) => {
    e.persist();

    setValues((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const handleReset = () => setValues(initialValues);

  return [values, handleChange, handleReset];
}

export default useForm;
