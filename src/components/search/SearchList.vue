<template>
  <ul v-if="items.length > 0" class="search__results">
    <SearchItem v-for="(item, i) in items" :item="item" :key="i" />
  </ul>
</template>

<script setup lang="ts">
import SearchItem from "@/components/search/SearchItem.vue";

defineProps<{
  items: [];
}>();
</script>

<style lang="scss" scoped>
.search {
  &__results {
    position: absolute;
    top: 55px;
    right: 0;
    left: 0;
    z-index: 100;
    background-color: $white;
    border-radius: 3px;
    box-shadow: 0px 0px 8px 0px rgba(34, 60, 80, 0.5);
  }
}
</style>
