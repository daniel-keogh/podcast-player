import { useState } from "react";

function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
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
