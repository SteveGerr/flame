<template>
  <div class="character">
    <div v-if="character !== null" class="character__wrapper">
      <header>
        <h1>{{ character.name }}</h1>
        <FavoriteButton
          v-if="!character.favorite"
          :active="character.favorite"
          @click="addFavorite()"
        />
      </header>
      <div class="character__info">
        <p>Hair color: {{ character.hair_color }}</p>
        <p>Height: {{ character.height }}</p>
        <p>Mass: {{ character.mass }}</p>
      </div>
    </div>
    <Loader v-else />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ActionTypes } from "@/store/action-types";
import { IPersonFiltered } from "@/interfaces/IPeople";
import FavoriteButton from "@/components/favorite/FavoriteButton.vue";
import Loader from "@/components/loader/Loader.vue";
import { MutationTypes } from "@/store/mutation-types";

const router = useRouter();
const store = useStore();
const id = ref();
id.value = Number(router.currentRoute.value.params.id);

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

const character = computed(
  () => store.state.people.filter((ch: IPersonFiltered) => ch.id === id.value)[0],
  // eslint-disable-next-line
);

const addFavorite = () => {
  if (character.value.favorite) {
    store.commit(MutationTypes.REMOVE_FAVORITE, character.value.id);
  } else {
    store.commit(MutationTypes.SET_FAVORITE, character.value.id);
  }
};
</script>

<style lang="scss" scoped>
.character {
  header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }

  &__info {
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
      width: 25%;
      text-align: left;
    }
  }
}
</style>
