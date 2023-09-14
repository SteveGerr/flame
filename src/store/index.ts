import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";

export interface State {
  count: number;
}

// eslint-disable-next-line symbol-description
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    count: 0,
  },
});
