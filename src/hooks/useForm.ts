import { useState } from "react";

type FormStateWithCallbacks<T> = [
  T,
  (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  () => void
];

function useForm<T>(initialValues: T): FormStateWithCallbacks<T> {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
