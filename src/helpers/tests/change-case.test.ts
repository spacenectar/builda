import { changeCase } from 'helpers/string-functions';

describe('changeCase() convert from kebab case', () => {
  test('Kebabcase text renders in sentence case', () => {
    const string = changeCase('my-component', 'sentenceCase');
    expect(string).toEqual('My component');
  });
  test('Kebabcase text renders in kebab case', () => {
    const string = changeCase('my-component', 'kebabCase');
    expect(string).toEqual('my-component');
  });
  test('Kebabcase text renders in pascal case', () => {
    const string = changeCase('my-component', 'pascalCase');
    expect(string).toEqual('MyComponent');
  });
  test('Kebabcase text renders in camel case', () => {
    const string = changeCase('my-component', 'camelCase');
    expect(string).toEqual('myComponent');
  });
  test('Kebabcase text renders in snake case', () => {
    const string = changeCase('my-component', 'snakeCase');
    expect(string).toEqual('my_component');
  });
  test('Kebabcase text can handle numbers', () => {
    const string = changeCase('my-1-component', 'sentenceCase');
    expect(string).toEqual('My one component');
  });
  test('Kebabcase text can handle symbols', () => {
    const string = changeCase('my-component-with-&-@', 'sentenceCase');
    expect(string).toEqual('My component with and at');
  });
  test('Kebabcase text can handle more than 2 words', () => {
    const string = changeCase('my-component-with-five-words', 'sentenceCase');
    expect(string).toEqual('My component with five words');
  });
  test('Kebabcase text can handle capital letters', () => {
    const string = changeCase('my-component-With-Five-Words', 'sentenceCase');
    expect(string).toEqual('My component with five words');
  });
});

describe('changeCase() convert from pascal case', () => {
  test('Pascalcase text renders in sentence case', () => {
    const string = changeCase('MyComponent', 'sentenceCase');
    expect(string).toEqual('My component');
  });
  test('Pascalcase text renders in kebab case', () => {
    const string = changeCase('MyComponent', 'kebabCase');
    expect(string).toEqual('my-component');
  });
  test('Pascalcase text renders in pascal case', () => {
    const string = changeCase('MyComponent', 'pascalCase');
    expect(string).toEqual('MyComponent');
  });
  test('Pascalcase text renders in camel case', () => {
    const string = changeCase('MyComponent', 'camelCase');
    expect(string).toEqual('myComponent');
  });
  test('Pascalcase text renders in snake case', () => {
    const string = changeCase('MyComponent', 'snakeCase');
    expect(string).toEqual('my_component');
  });
  test('Pascalcase text can handle numbers', () => {
    const string = changeCase('My1Component', 'sentenceCase');
    expect(string).toEqual('My one component');
  });
  test('Pascalcase text can handle symbols', () => {
    const string = changeCase('MyComponentWith&@', 'sentenceCase');
    expect(string).toEqual('My component with and at');
  });
  test('Pascalcase text can handle more than 2 words', () => {
    const string = changeCase('MyComponentWithFiveWords', 'sentenceCase');
    expect(string).toEqual('My component with five words');
  });
});

describe('changeCase() convert from camel case', () => {
  test('Camelcase text renders in sentence case', () => {
    const string = changeCase('myComponent', 'sentenceCase');
    expect(string).toEqual('My component');
  });
  test('Camelcase text renders in kebab case', () => {
    const string = changeCase('myComponent', 'kebabCase');
    expect(string).toEqual('my-component');
  });
  test('Camelcase text renders in pascal case', () => {
    const string = changeCase('myComponent', 'pascalCase');
    expect(string).toEqual('MyComponent');
  });
  test('Camelcase text renders in camel case', () => {
    const string = changeCase('myComponent', 'camelCase');
    expect(string).toEqual('myComponent');
  });
  test('Camelcase text renders in snake case', () => {
    const string = changeCase('myComponent', 'snakeCase');
    expect(string).toEqual('my_component');
  });
  test('Camelcase text can handle numbers', () => {
    const string = changeCase('my1Component', 'sentenceCase');
    expect(string).toEqual('My one component');
  });
  test('Camelcase text can handle symbols', () => {
    const string = changeCase('myComponentWith&@', 'sentenceCase');
    expect(string).toEqual('My component with and at');
  });
  test('Camelcase text can handle more than 2 words', () => {
    const string = changeCase('myComponentWithFiveWords', 'sentenceCase');
    expect(string).toEqual('My component with five words');
  });
});

describe('changeCase() convert from snake case', () => {
  test('Snakecase text renders in sentence case', () => {
    const string = changeCase('my_component', 'sentenceCase');
    expect(string).toEqual('My component');
  });
  test('Snakecase text renders in kebab case', () => {
    const string = changeCase('my_component', 'kebabCase');
    expect(string).toEqual('my-component');
  });
  test('Snakecase text renders in pascal case', () => {
    const string = changeCase('my_component', 'pascalCase');
    expect(string).toEqual('MyComponent');
  });
  test('Snakecase text renders in camel case', () => {
    const string = changeCase('my_component', 'camelCase');
    expect(string).toEqual('myComponent');
  });
  test('Snakecase text renders in snake case', () => {
    const string = changeCase('my_component', 'snakeCase');
    expect(string).toEqual('my_component');
  });
  test('Snakecase text can handle numbers', () => {
    const string = changeCase('my_1_component', 'sentenceCase');
    expect(string).toEqual('My one component');
  });
  test('Snakecase text can handle symbols', () => {
    const string = changeCase('my_component_with_&_@', 'sentenceCase');
    expect(string).toEqual('My component with and at');
  });
  test('Snakecase text can handle more than 2 words', () => {
    const string = changeCase('my_component_with_five_words', 'sentenceCase');
    expect(string).toEqual('My component with five words');
  });
  test('Snakecase text can handle capital letters', () => {
    const string = changeCase('my_component_With_Five_words', 'sentenceCase');
    expect(string).toEqual('My component with five words');
  });
});

describe('changeCase() convert from sentence case', () => {
  test('Sentencecase text renders in sentence case', () => {
    const string = changeCase('My component', 'sentenceCase');
    expect(string).toEqual('My component');
  });
  test('Sentencecase text renders in kebab case', () => {
    const string = changeCase('My component', 'kebabCase');
    expect(string).toEqual('my-component');
  });
  test('Sentencecase text renders in pascal case', () => {
    const string = changeCase('My component', 'pascalCase');
    expect(string).toEqual('MyComponent');
  });
  test('Sentencecase text renders in camel case', () => {
    const string = changeCase('My component', 'camelCase');
    expect(string).toEqual('myComponent');
  });
  test('Sentencecase text renders in snake case', () => {
    const string = changeCase('My component', 'snakeCase');
    expect(string).toEqual('my_component');
  });
  test('Sentencecase text can handle numbers', () => {
    const string = changeCase('My one component', 'sentenceCase');
    expect(string).toEqual('My one component');
  });
  test('Sentencecase text can handle symbols', () => {
    const string = changeCase('My component with and at', 'sentenceCase');
    expect(string).toEqual('My component with and at');
  });
  test('Sentencecase text can handle more than 2 words', () => {
    const string = changeCase('My component with five words', 'sentenceCase');
    expect(string).toEqual('My component with five words');
  });
  test('Sentencecase text can handle more than 2 words with capitals', () => {
    const string = changeCase('My component With Five words', 'sentenceCase');
    expect(string).toEqual('My component with five words');
  });
});
