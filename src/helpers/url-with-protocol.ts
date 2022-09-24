export const urlWithProtocol = (url: string) => {
  // If a url starts with http or https, return the url unchanged
  if (url.startsWith('http') || url.startsWith('https')) {
    return url;
  }
  return `https://${url}`;
};

export default urlWithProtocol;
