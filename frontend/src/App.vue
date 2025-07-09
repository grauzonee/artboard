<script setup lang="ts">
import { RouterView } from "vue-router";
import { useRoute } from "vue-router";
import { computed, defineAsyncComponent } from "vue";

const route = useRoute();
const layout = computed(() => {
  const layoutName = route.meta.layout || "DefaultLayout";

  return defineAsyncComponent(() =>
    import(`./layouts/${layoutName}.vue`).catch(
      () => import("./layouts/DefaultLayout.vue"),
    ),
  );
});
</script>

<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>
