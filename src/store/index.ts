import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import { mutations } from "./mutations";
import { actions } from "./actions";
import { getters } from "./getters";
import { state, State } from "./state";

// eslint-disable-next-line symbol-description
export const key: InjectionKey<Store<State>> = Symbol();

const store = createStore<State>({
  state,
  mutations,
  actions,
  getters,
});

export default store;
