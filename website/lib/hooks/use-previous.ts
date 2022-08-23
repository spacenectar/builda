import { useRef, useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- any is fine here, the value could be anything
export const usePrevious = (value: any) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value; //assign the value of ref to the argument
  }, [value]); //this code will run when the value of 'value' changes
  return ref.current; //in the end, return the current ref value.
};
export default usePrevious;
