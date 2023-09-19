import { IPersonFiltered, IPerson } from "@/interfaces/IPeople";

interface IState {
  people: IPersonFiltered[];
  favorites: IPersonFiltered[];
  searchResults: IPerson[];
  character: IPerson | null;
}

export const state: IState = {
  people: [],
  favorites: [],
  searchResults: [],
  character: null,
};

export type State = typeof state;
