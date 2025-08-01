<script setup lang="ts">
import BaseForm from "@/components/BaseForm.vue";
import { ref } from "vue";
import { inputs } from "@/components/inputs/PostFilter.ts";
const showFilters = ref(false);

function toggleShowFilters() {
  showFilters.value = !showFilters.value;
}

defineExpose({ showFilters, toggleShowFilters });
</script>
<template>
  <MqResponsive :target="['sm', 'md']">
    <span
      class="cursor-pointer p-4 block test-xl"
      @click="toggleShowFilters"
    >
      <font-awesome-icon
        icon="filter"
        class="h-4 pointer text-emerald-500"
      />
    </span>
    <transition name="filtersForm">
      <BaseForm
        v-if="showFilters"
        :inputs="inputs"
        inputs-classes="h-18"
      />
    </transition>
  </MqResponsive>
  <MqResponsive target="lg+">
    <BaseForm
      :inputs="inputs"
      inputs-classes="h-20"
    />
  </MqResponsive>
</template>

<style scoped>
.filtersForm-enter-active {
  transition: opacity 2s ease-out;
}
</style>
