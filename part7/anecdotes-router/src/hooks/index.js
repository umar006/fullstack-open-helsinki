import { useState } from "react";

export const useField = (type) => {
  const [value, setState] = useState("");

  const onChange = (e) => {
    setState(e.target.value);
  };

  return {
    value,
    type,
    onChange,
  };
};
