import { useEffect } from "react";
import { useState } from "react";
import countryServices from "../services/countryServices";

export const useCountry = (query) => {
  const [value, setValue] = useState(null);

  useEffect(() => {
    countryServices
      .getOne(query)
      .then((res) => {
        setValue(res);
      })
      .catch(() => setValue(null));
  }, [query]);

  return { value, setValue };
};
