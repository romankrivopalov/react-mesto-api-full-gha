import { useState, useCallback, useEffect, useRef } from "react";

export function useFormValidation(initialValues ={}) {
  const [values, setValues] = useState(initialValues),
        [errors, setErrors] = useState({}),
        [isValid, setIsValid] = useState(false),
        formRef = useRef(null);

  useEffect(() => {
    setIsValid(formRef.current.checkValidity());
  }, [values])

  const handleChange = ({ target }) => {
    const { name, value, validationMessage } = target;

    setValues((oldValues) =>({ ...oldValues, [name]: value }));
    setErrors((oldErrors) =>({ ...oldErrors, [name]: validationMessage }));
  }

  const resetValues = (initialValues = {}) => {
    setValues(initialValues);
    setErrors({});
  }

  const setValue = useCallback((name, value) => {
    setValues((oldValues) =>({ ...oldValues, [name]: value }));
    setIsValid(formRef.current.checkValidity());
  }, [])

  const errorClassName = (name) => `popup__input-error ${errors[name] ? 'popup__input-error_active' : ''}`

  return {
    values,
    errors,
    isValid,
    handleChange,
    resetValues,
    setValue,
    formRef,
    errorClassName }
}
