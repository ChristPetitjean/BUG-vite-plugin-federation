<template>
  <router-link :to="to" class="menu-item flex items-center" :class="{
    'menu-item-active': isActive,
    'menu-item-sm': sm,
  }">
    <span>{{ name }}</span>
  </router-link>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

// eslint-disable-next-line no-undef
const props = defineProps({
  name: { required: false, type: String, default: null },
  to: { required: false, type: String, default: '#' },
  sm: { required: false, type: Boolean, default: false },
  exact: { required: false, type: Boolean, default: false },
});
const router = useRouter();
const isActive = computed(() => {
  let active;
  if (props.exact) {
    active = props.to === router?.currentRoute?.value?.path;
  } else {
    active = router?.currentRoute?.value?.path?.startsWith(props.to);
  }
  return active;
});
</script>

<style lang="css" scoped>
.menu-item {
  @apply hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium;
}

.menu-item-sm {
  @apply block text-base;
}

.menu-item-active {
  @apply bg-gray-700;
}
</style>
