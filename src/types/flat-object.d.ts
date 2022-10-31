export type TFlatObject = {
  [key: string]:
    | string
    | number
    | boolean
    | TFlatObject
    | string[]
    | number[]
    | boolean[]
    | TFlatObject[];
};
