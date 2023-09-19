<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
  <li class="search-item">
    <RouterLink :to="cutUrl(item.url)">
      <p class="search-item__name">
        {{ item.name }}
      </p>
    </RouterLink>
  </li>
</template>

<script setup lang="ts">
import { IPerson } from "@/interfaces/IPeople";

defineProps<{
  item: IPerson;
}>();

const cutUrl = (url: string) => url.replace("https://swapi.dev/api/", "");
</script>

<style lang="scss" scoped>
.search-item {
  padding: 3px;
}
</style>
