export interface ComponentRegistry {
  name: string;
  version: string;
  author: string;
  scaffold: {
    name: any;
    version: any;
    path: string;
  };
}

export default ComponentRegistry;
