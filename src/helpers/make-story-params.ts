const makeStoryParams = (mdx: boolean, readme: boolean, params: string[]) => {
  const storyParamsString = params ? params.join(', ') : '';

  if (storyParamsString) {
    if (mdx) {
      return `parameters={{ ${storyParamsString} }}`;
    }

    return `parameters: {
          ${storyParamsString},
          ${
            readme &&
            `readme: {
            // Show readme before story
            content: docs
          }`
          }
        }`;
  }

  return '';
};

export default makeStoryParams;
