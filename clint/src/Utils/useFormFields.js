import { useDebugValue, useState } from "react";

const useFormFields = (initialValues = {}) => {
  const [fields, setFields] = useState(initialValues);
  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };
  useDebugValue(fields);

  return [fields, handleChange];
};
export default useFormFields;
