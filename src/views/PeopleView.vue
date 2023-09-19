<template>
  <div class="people">
    <h1>People</h1>
    <div class="people__search-wrap">
      <input
        class="people__search"
        v-model="search"
        @input="updateSearch"
        @blur="clearSearch"
        placeholder="Find characters"
      />
      <SearchList :items="searchResults" />
    </div>
    <AppTable :data="people" :headers="headers" :keys="keyValues">
      <template #td="{ item }">
        <FavoriteButton :active="item.favorite" @click="addFavorite(item)"></FavoriteButton>
      </template>
    </AppTable>
  </div>
</template>

<script setup lang="ts">
import AppTable from "@/components/app-table/AppTable.vue";
import { ActionTypes } from "@/store/action-types";
import { MutationTypes } from "@/store/mutation-types";
import { useStore } from "vuex";
import { computed, ref } from "vue";
import { IPersonFiltered } from "@/interfaces/IPeople";
import FavoriteButton from "@/components/favorite/FavoriteButton.vue";
import SearchList from "@/components/search/SearchList.vue";
import { debounce } from "lodash";

const store = useStore();

const people = computed(() => store.state.people);
const search = ref();

const headers = ["name", "height", "mass", "hair color", "favorite"];
const keyValues = ["name", "height", "mass", "hair_color"];
const searchResults = computed(() => store.getters.getSearchResults);

const getPeople = async () => {
  if (localStorage.getItem("people") !== null) {
    const dataPeople = JSON.parse(localStorage.getItem("people") || "");
    store.commit(MutationTypes.SET_PEOPLE, dataPeople);
    if (localStorage.getItem("favorites") !== null) {
      const dataFavorites = JSON.parse(localStorage.getItem("favorites") || "");
      store.commit(MutationTypes.SET_FAVORITES_DATA, dataFavorites);
    }
  } else {
    await store.dispatch(ActionTypes.GET_ALL_PEOPLE);
  }
};
getPeople();

const addFavorite = (e: IPersonFiltered) => {
  const { id } = e;
  if (e.favorite) {
    store.commit(MutationTypes.REMOVE_FAVORITE, id);
  } else {
    store.commit(MutationTypes.SET_FAVORITE, id);
  }
};

const updateSearch = debounce(() => {
  if (people.value.length) {
    store.commit(MutationTypes.SET_SEARCH, search.value);

    store.dispatch(ActionTypes.FIND_CHARACTERS, search.value);
  } else {
    search.value = "";
  }
}, 900);

const clearSearch = () => {
  search.value = "";
  store.commit(MutationTypes.SET_SEARCH, null);
  store.dispatch(ActionTypes.FIND_CHARACTERS, null);
};
</script>

<style lang="scss" scoped>
.people__search {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  outline: none;

  &-wrap {
    position: relative;
  }
}
</style>
