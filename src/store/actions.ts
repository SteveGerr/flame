/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
import api from "@/api/peopleApi";
import { ActionTree, ActionContext } from "vuex";
import { IPerson } from "@/interfaces/IPeople";
import { cutIdFromUrl } from "@/utils/cutIdFromUrl";
import { Mutations } from "./mutations";
import { MutationTypes } from "./mutation-types";
import { ActionTypes } from "./action-types";
import { State } from "./state";

interface ISearchData {
  data: {
    count: number;
    next: string;
    previous: null;
    results: IPerson[];
  };
}

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, "commit">;

export interface Actions {
  [ActionTypes.GET_ALL_PEOPLE]({ commit }: AugmentedActionContext): void;

  [ActionTypes.FIND_CHARACTERS]({ commit }: AugmentedActionContext, payload: string): void;
}

export const actions: ActionTree<State, State> & Actions = {
  /** GET_ALL_PEOPLE */
  [ActionTypes.GET_ALL_PEOPLE]({ commit }) {
    api.getAllPeople().then((d) => {
      try {
        const res: IPerson[] = d.data.results;
        const filtered = res.map((person: IPerson) => {
          const { name, height, hair_color, mass, url } = person;
          const id = cutIdFromUrl(url);
          const result = {
            id,
            name,
            height,
            hair_color,
            mass,
            url,
            favorite: false,
          };

          return result;
        });
        const filteredLs = JSON.stringify(filtered);
        localStorage.setItem("people", filteredLs);
        commit(MutationTypes.SET_PEOPLE, filtered);
      } catch (error) {
        console.log(error);
      }
    });
  },

  // Find characters
  [ActionTypes.FIND_CHARACTERS]({ commit }, payload) {
    api.findCharacters(payload).then((res: ISearchData) => {
      try {
        commit(MutationTypes.UPDATE_SEARCH, res.data.results);
      } catch (error) {
        console.log(error);
      }
    });
  },

  // Get character
  [ActionTypes.GET_CHARACTER]({ commit }, payload) {
    api.getCharacter(payload).then((res) => {
      try {
        console.log(res.data);

        commit(MutationTypes.SET_CHARACTER, res.data);
      } catch (error) {
        console.log(error);
      }
    });
  },
};
