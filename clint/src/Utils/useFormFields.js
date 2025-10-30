import { useDebugValue, useState } from "react";

const useFormFields = (initialValues = {}) => {
  const [fields, setFields] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  useDebugValue(fields);

  return [fields, handleChange, setFields];
};

export default useFormFields;
