export default (value: unknown) => {
  return {
    target: {
      value
    }
  } as React.ChangeEvent<HTMLInputElement>;
};
