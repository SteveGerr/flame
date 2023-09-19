export const cutIdFromUrl = (url: string) =>
  Number(url.replace("https://swapi.dev/api/people/", "").replace("/", ""));
