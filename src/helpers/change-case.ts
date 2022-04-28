// TODO: If would be good if no matter what the type is, the output would always be the same
// e.g. 'my-component', 'MyComponent', 'My Component' or 'my_component' would all output as
// 'my-component if the type is kebab, but 'MyComponent' if the type is pascal, etc.

const changeCase = (input: string, type: string) => {
  const str = input
    .replace(/[,_]/g, ' ')
    .replace(/&/g, ' and ')
    .replace(/@/g, ' at ')
    .replace(/\s+/g, '-')
    .trim();
  let output = '';
  if (type === 'sentence') {
    // Output the component name however they provided it
    output = input;
  } else if (type === 'kebab') {
    output = str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  } else if (type === 'pascal') {
    output = str
      .split('-')
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join('');
  }

  return output;
};

export default changeCase;
