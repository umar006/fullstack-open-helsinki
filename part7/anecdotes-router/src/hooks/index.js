import { useState } from "react";

export const useField = (type) => {
  const [value, setState] = useState("");

  const onChange = (e) => {
    setState(e.target.value);
  };

  const onReset = () => {
    setState("");
  };

  return {
    value,
    type,
    onChange,
    onReset,
  };
};
