import { useState } from "react";

const useToggle = (defaultValue = false) => {
  const [value, setValue] = useState(defaultValue);

  const toggle = () => setValue((value) => !value);

  return [value, toggle];
};

export default useToggle;
