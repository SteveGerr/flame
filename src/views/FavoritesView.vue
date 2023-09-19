<template>
  <div class="favorites">
    <h1>Favorites</h1>
    <AppTable v-if="favorites.length" :data="favorites" :headers="headers" :keys="keyValues">
      <template #td="{ item }">
        <FavoriteButton :active="item.favorite" @click="addFavorite(item)"></FavoriteButton>
      </template>
    </AppTable>
    <p v-else class="favorites__warning">
      Please select your favorite characters <RouterLink to="/people">here</RouterLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import AppTable from "@/components/app-table/AppTable.vue";
import { MutationTypes } from "@/store/mutation-types";
import { useStore } from "vuex";
import { computed } from "vue";
import { IPersonFiltered } from "@/interfaces/IPeople";
import FavoriteButton from "@/components/favorite/FavoriteButton.vue";

const store = useStore();

const favorites = computed(() => store.state.favorites);

const headers = ["name", "height", "mass", "hair color", "Remove"];
const keyValues = ["name", "height", "mass", "hair_color"];

const addFavorite = (e: IPersonFiltered) => {
  const { id } = e;
  if (e.favorite) {
    store.commit(MutationTypes.REMOVE_FAVORITE, id);
  } else {
    store.commit(MutationTypes.SET_FAVORITE, id);
  }
};
</script>

<style scoped></style>
