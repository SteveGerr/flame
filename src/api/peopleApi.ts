import API from "./API";

const url = "https://swapi.dev/api/";

export default {
  getAllPeople() {
    return API(url).get("people");
  },
};
