import { useState } from 'react';

const useForm = (initialValues) => {
    const [values, setValues] = useState(initialValues);

    const handleChange = (e) => {
        e.persist();

        setValues((state) => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    };

    return [values, handleChange];
};

export default useForm;
