import { GetterTree } from "vuex";
import { IPerson } from "@/interfaces/IPeople";
import { State } from "./state";

export type Getters = {
  getSearchResults(state: State): IPerson[];
};

export const getters: GetterTree<State, State> & Getters = {
  getSearchResults: (state) => state.searchResults,
};
