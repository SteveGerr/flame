<template>
  <button
    :class="['favorite-button', { 'favorite-button_active': active }]"
    @click="$emit('click')"
  >
    <FavoriteIcon />
  </button>
</template>

<script setup lang="ts">
import { toRefs } from "vue";
import FavoriteIcon from "./FavoriteIcon.vue";

defineEmits(["click"]);

const props = defineProps<{
  active: boolean;
}>();

const { active } = toRefs(props);
</script>

<style lang="scss" scoped>
.favorite-button {
  width: 30px;
  height: 30px;
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
  outline: none;
  cursor: pointer;

  &:hover {
    svg {
      fill: red;
    }
  }

  svg {
    width: 30px;
    height: 30px;
    fill: $lilac-back;
  }

  &_active {
    svg {
      fill: red;
    }
  }
}
</style>
