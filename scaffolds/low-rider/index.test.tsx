/* global it expect */
/* eslint-disable sonarjs/cognitive-complexity */
import React from 'react';
import {
  cleanup,
  render,
  RenderResult
} from '@testing-library/react';

import %PASCAL_CASE% from './index';


let renderResult: RenderResult;

describe('%PASCAL_CASE% component', () => {
  beforeEach(() => {
    renderResult = render(<%PASCAL_CASE% />);
  });

  afterEach(() => {
    cleanup();
  });

  it('should match the most recent snapshot', () => {
    expect(renderResult.baseElement).toMatchSnapshot();
  });
});
