export const reduceTableItems = (obj: any, path: string[]): any[] =>
  path.reduce((prev: any, key: string) => prev?.[key], obj);
