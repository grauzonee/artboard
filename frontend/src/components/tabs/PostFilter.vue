<script setup lang="ts">
import MaterialsForm from "@/components/MaterialsForm.vue";
import BaseButton from "@/components/BaseButton.vue";
import ContentPanel from "@/components/ContentPanel.vue";
import { PostFilterData, PostFilter } from "@/types/PostFilter.ts";
import { getPosts } from "@/helpers/posts.ts";

import { ref } from "vue";
import { inputs } from "@/components/inputs/PostFilter.ts";
const showFilters = ref(false);
const formRef = ref(null);

function toggleShowFilters() {
  showFilters.value = !showFilters.value;
}

async function search() {
  const formData = await formRef.value?.getFormData();
  const postFilter = new PostFilter(formData as PostFilterData);

  await getPosts(1, postFilter);
  console.log("formData", formData);
  toggleShowFilters();
}
defineExpose({ showFilters, toggleShowFilters });
</script>
<template>
  <span
    class="cursor-pointer p-4 block test-xl"
    @click="toggleShowFilters"
  >
    <font-awesome-icon
      icon="filter"
      class="h-4 pointer hover:text-emerald-500"
    />
  </span>
  <transition name="filtersForm">
    <div
      v-if="showFilters"
      class="absolute top-0 left-0 right-0 bottom-0 bg-gray-700/60 flex justify-left p-10"
    >
      <ContentPanel
        class="lg:w-1/4 w-full p-3 z-100 overflow-scroll no-scrollbar"
      >
        <font-awesome-icon
          icon="arrow-left"
          class="h-8 lg:h-4 pointer hover:text-emerald-500"
          @click="toggleShowFilters"
        />
        <MaterialsForm
          ref="formRef"
          :inputs="inputs"
          inputs-classes="h-18"
        />
        <BaseButton
          label="Search"
          @click="search"
        />
      </ContentPanel>
    </div>
  </transition>
</template>

<style scoped>
.filtersForm-enter-active {
  transition: opacity 2s ease-out;
}
</style>
