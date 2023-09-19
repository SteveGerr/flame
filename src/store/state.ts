import { IPersonFiltered, IPerson } from "@/interfaces/IPeople";

interface IState {
  people: IPersonFiltered[];
  favorites: IPersonFiltered[];
  searchValue: string;
  searchResults: IPerson[];
  character: IPerson | null;
}

export const state: IState = {
  people: [],
  favorites: [],
  searchValue: "",
  searchResults: [],
  character: null,
};

export type State = typeof state;
