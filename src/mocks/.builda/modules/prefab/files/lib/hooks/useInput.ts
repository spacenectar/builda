import { useState } from 'react';

type Input = string | number | readonly string[] | undefined;

const useInput = (initialValue: Input) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event: { target: { value: Input } }) => {
    setValue(event.target.value);
  };

  return {
    value,
    onChange: handleChange
  };
};

export default useInput;
