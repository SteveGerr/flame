<template>
  <li class="table-mobile__item">
    <div class="table-mobile__headers">
      <span v-for="(header, i) in headers" :key="i">{{ header }}:</span>
    </div>
    <div>
      <div v-for="(key, i) in keys" :key="i" class="table-mobile__row">
        <div>
          <span v-if="typeof key === 'object'">
            {{ key }}
            {{ reduceTableItems(item, key) }}
          </span>
          <span v-else>{{ item[key] }}</span>
        </div>
      </div>
    </div>
    <div class="table-mobile__favorite">
      <slot name="button" :item="item"></slot>
    </div>
  </li>
</template>

<script setup lang="ts">
import { IPersonFiltered } from "@/interfaces/IPeople";
import { reduceTableItems } from "@/utils/reduceTableItems";

defineProps<{
  headers: string[];
  item: IPersonFiltered;
  keys: string[];
}>();
</script>

<style lang="scss" scoped>
.table-mobile {
  &__headers {
    display: flex;
    flex-direction: column;
    align-items: start;
    font-weight: 600;

    span:last-child {
      display: none;
    }
  }

  &__row {
    display: flex;
  }

  &__favorite {
    display: flex;
    position: absolute;
    right: 10px;
    bottom: 7px;
  }
}
</style>
