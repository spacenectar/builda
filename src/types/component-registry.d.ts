export interface ComponentRegistry {
  name: string;
  version: string;
  author: string;
  scaffold: {
    name: string;
    version: string;
    path: string;
  };
}

export default ComponentRegistry;
