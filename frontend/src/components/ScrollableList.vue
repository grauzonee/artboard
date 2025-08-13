<script setup lang="ts">
import { ref, inject } from "vue";

const scrolledToEnd = ref(false);
const hasNext = ref(true);
const page = ref(1);
const loadMoreCallback = inject("loadMoreCallback");

function handleScroll(event) {
  const { scrollTop, clientHeight, scrollHeight } = event.target;

  if (scrollTop + clientHeight === scrollHeight) {
    scrolledToEnd.value = true;
  }
}

async function onLoadMoreClick() {
  page.value++;
  const hasNext = await loadMoreCallback?.(page.value);
  setHasNext(hasNext);
  scrolledToEnd.value = false;
}

function setHasNext(newValue: bool) {
  hasNext.value = newValue;
}

function setPage(newPage: number) {
  console.log("newPage", newPage);
  page.value = newPage ?? 1;
}

function getPage() {
  return page.value;
}
defineExpose({ setHasNext, getPage, setPage });
</script>
<template>
  <div
    class="flex-1 h-full overflow-scroll flex flex-col gap-5 no-scrollbar"
    @scroll="handleScroll"
  >
    <slot />

    <font-awesome-icon
      v-if="scrolledToEnd && hasNext"
      icon="arrow-down-long"
      class="cursor-pointer h-2 text-bold pointer text-gray-500 bg-primary-orange text-white rounded-full p-1"
      @click="onLoadMoreClick"
    />
  </div>
</template>
