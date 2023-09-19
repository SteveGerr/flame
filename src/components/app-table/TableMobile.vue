<template>
  <div class="table-mobile">
    <ul v-if="data.length" class="table-mobile__list">
      <TableMobileItem
        v-for="item in data"
        :key="item.id"
        :headers="headers"
        :keys="keys"
        :item="item"
      >
        <template #button="{ item }">
          <FavoriteButton :active="item.favorite" @click="addFavorite(item)"></FavoriteButton>
        </template>
      </TableMobileItem>
    </ul>
    <Loader v-else />
  </div>
</template>

<script setup lang="ts">
import Loader from "@/components/loader/Loader.vue";
import FavoriteButton from "@/components/favorite/FavoriteButton.vue";
import { MutationTypes } from "@/store/mutation-types";
import { useStore } from "vuex";
import TableMobileItem from "./TableMobileItem.vue";

defineProps<{
  data: any;
  headers: string[];
  keys: string[];
}>();

const store = useStore();

const addFavorite = (item: any) => {
  if (item.favorite) {
    store.commit(MutationTypes.REMOVE_FAVORITE, item.id);
  } else {
    store.commit(MutationTypes.SET_FAVORITE, item.id);
  }
};
</script>

<style lang="scss" scoped>
.table-mobile {
  display: none;
  flex-direction: column;

  @media screen and (max-width: 768px) {
    display: flex;
  }

  &__item {
    display: flex;
    flex-direction: row;
    align-items: start;
    padding: 5px;
    gap: 10px;
    @include text(15px, 28px, 400);
    text-transform: lowercase;
    color: $lilac;
    border: 1px solid $lilac;
    border-radius: 3px;
    position: relative;
  }

  &__list {
    display: flex;
    flex-direction: column;
    padding: 0;
    gap: 10px;
  }
}
</style>
