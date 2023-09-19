import API from "./API";

const url = "https://swapi.dev/api/";

export default {
  getAllPeople() {
    return API(url).get("people");
  },

  getCharacter(id: string) {
    return API(url).get(`people/${id}`);
  },

  findCharacters(value: string) {
    return API(url).get(`people/?search=${value || null}`);
  },
};
