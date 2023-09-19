import { MutationTree } from "vuex";
import { IPersonFiltered, IPerson } from "@/interfaces/IPeople";
import { MutationTypes } from "./mutation-types";
import { State } from "./state";

export type Mutations<S = State> = {
  [MutationTypes.SET_PEOPLE](state: S, payload: IPersonFiltered[]): void;
  [MutationTypes.SET_FAVORITES_DATA](state: S, payload: IPersonFiltered[]): void;
  [MutationTypes.UPDATE_SEARCH](state: S, payload: IPerson[]): void;
};

export const mutations: MutationTree<State> & Mutations = {
  // Set people
  [MutationTypes.SET_PEOPLE](state, payload: IPersonFiltered[]) {
    state.people = payload;
  },

  // Set character
  [MutationTypes.SET_CHARACTER](state, payload: IPerson) {
    state.character = payload;
  },

  // Set favorites data
  [MutationTypes.SET_FAVORITES_DATA](state, payload: IPersonFiltered[]) {
    state.favorites = payload;
  },

  // Update search
  [MutationTypes.UPDATE_SEARCH](state, results) {
    state.searchResults = results;
  },

  // Set favorites
  [MutationTypes.SET_FAVORITE](state, payload: number) {
    console.log("SET_FAVORITE", payload);

    state.people.filter((item: IPersonFiltered) => item.id === payload)[0].favorite = true;
    const selectedPerson = state.people.filter((item: IPersonFiltered) => item.id === payload)[0];
    state.favorites.push(selectedPerson);
    localStorage.setItem("people", JSON.stringify(state.people));
    localStorage.setItem("favorites", JSON.stringify(state.favorites));
  },

  // Remove favorites
  [MutationTypes.REMOVE_FAVORITE](state, payload: number) {
    state.people.filter((item: IPersonFiltered) => item.id === payload)[0].favorite = false;
    state.favorites = state.favorites.filter((person: IPersonFiltered) => person.id !== payload);
    localStorage.setItem("people", JSON.stringify(state.people));
    localStorage.setItem("favorites", JSON.stringify(state.favorites));
  },
};
